const fs = require('fs')
const http = require('http')
const path = require('path')

const jsonURL = process.env.REACT_APP_API_URL || 'http://localhost/explorer/swagger.json'
const apiPath = path.join(__dirname, 'index.js')
const jsonPath = path.join(__dirname, 'apis.json')

const makeApiName = (method, slug) => {
  const arr = slug.split('/').slice(1)
  return `${arr.map(s => {
    if (arr[0] === s) {
      s += `_${method.toUpperCase()}`
    }
    s = s.toUpperCase()
    s = s.split('{').join('')
    s = s.split('}').join('')
    s = s.split('-').join('_')
    return s
  }).join('_')}`
}

const makeParams = (params) => (params.length ? `{ ${params.map(p => p.name).join(', ')} }` : '')

const convertSlugToSlugTemplateString = (slug) => slug.split('{').join('${')

const apiEndpointStr = (p, basePath, queryStr) => (`\`\${apiEndpoint}${basePath}${convertSlugToSlugTemplateString(p)}${queryStr}\``)

const makeTypes = (name) => `
  ${name}: '${name}',`

const makeApis = ({
  method,
  apiData,
  summary,
  APIName,
  paramsStr,
  slug,
  basePath
}) => {
  let bodyStr = ''
  let queryStr = ''
  if (apiData[method].parameters.length) {
    if (['post', 'put', 'patch'].includes(method)) {
      const bodyParams = apiData[method].parameters.filter(x => x.in === 'formData')
      if (bodyParams.length) {
        bodyStr = `${bodyStr},
    body: { ${bodyParams.map(p => p.name).join(', ')} }`
      }
    }
    const queryParams = apiData[method].parameters.filter(x => x.in === 'query')
    if (queryParams.length) {
      queryStr = `?${queryParams.map((p, i) => `\${${p.name} ? \`${p.name}=\${encodeURIComponent(typeof ${p.name} === 'object' ? JSON.stringify(${p.name}) : ${p.name})}${i === queryParams.length - 1 ? '' : '&'}\` : ''}`).join('')}`
    }
    const bodyInBody = apiData[method].parameters.filter(x => x.in === 'body' && x.name === 'body')
    if (bodyInBody.length) {
      bodyStr = `${bodyStr},
    body`
    }
    const dataInBody = apiData[method].parameters.filter(x => x.in === 'body' && x.name === 'data')
    if (dataInBody.length) {
      bodyStr = `${bodyStr},
    body: data`
    }
    const argInBody = apiData[method].parameters.filter(x => x.in === 'body' && x.name === 'arg')
    if (argInBody.length) {
      bodyStr = `${bodyStr},
    body: arg`
    }
  }
  const apiString = `
  // ${apiData[method].summary}${summary || ''}
  ${APIName}: (${paramsStr}) => ({
    method: '${method.toUpperCase()}',
    url: ${apiEndpointStr(slug, basePath, queryStr)}${bodyStr}
  }),`
  return {
    apiString,
    apiType: makeTypes(APIName)
  }
}

const GenMakeFetchActionHOC = ({
  APIName,
  ...props
}) => {
  const { apiString, apiType } = makeApis({ APIName, ...props })

  return { apiString, apiType }
}

const GenAllAPIs = ({ apis }) => {
  let total = 0
  let typesStr = 'export const types = {'
  let apiStr = `export const apis = {
`
  const { paths } = apis
  const { basePath } = apis
  Object.keys(paths).map(
    slug => {
      const apiData = paths[slug]
      const methods = Object.keys(apiData)
      methods.map(method => {
        total += 1
        const APIName = makeApiName(method, slug)
        const paramsStr = makeParams(apiData[method].parameters)
        const summary = ''
        const { apiString, apiType } = GenMakeFetchActionHOC(
          {
            method,
            apiData,
            summary,
            APIName,
            paramsStr,
            slug,
            basePath
          }
        )
        typesStr = `${typesStr}${apiType}`
        apiStr = `${apiStr}${apiString}`
        return method
      })
      return slug
    }
  )

  const strFile = `/* eslint camelcase: 0 */
/*
    Total: ${total} APIs
    version: "${apis.info.version}",
    title: "${apis.info.title}",
    description: "${apis.info.description}"
*/
import config from 'config/config'

const apiEndpoint = config.API_URL

${typesStr}
}
${apiStr}
}
`

  fs.writeFileSync(apiPath, strFile)
}

http.get(jsonURL, (res) => {
  console.log('GET:', jsonURL)
  let body = ''
  res.setEncoding('utf8')
  res.on('data', (chunk) => {
    body += chunk
  })
  res.on('end', () => {
    if (res.statusCode !== 200) {
      throw Error(`Api call failed with response code ${res.statusCode}`)
    }
    const apiData = JSON.parse(body)
    fs.writeFileSync(jsonPath, JSON.stringify(apiData, null, 2))
    GenAllAPIs({ apis: apiData })
    console.log(`
Get APIs data from ${jsonURL} succesful.
JSON data API saved at: ${jsonPath}
API Client generated at: ${apiPath}
`)
  })
})
