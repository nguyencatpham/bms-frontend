import { Upload, Button, Form } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './detailForm.scss'
import { useHistory, useParams } from 'react-router'
import { Helmet } from 'react-helmet'
import TextArea from 'rc-textarea'
import ReactJson from 'react-json-view'
import './editor.scss'
const { Item } = Form

const mapStateToProps = ({ device, authDevice, user, dispatch }) => {
  const { detail = {} } = device
  return { detail, dispatch }
}

const UploadConfigPage = ({ detail, dispatch }) => {
  const history = useHistory()
  const { id } = useParams()
  const [form] = Form.useForm()
  const [files, setFiles] = useState([])
  const [content, setContent] = useState(detail.config)
  const onFinish = values => {
    dispatch({
      type: 'device/UPLOAD_CONFIG',
      payload: {
        id,
        body: {
          config: content
        }
      }
    })
  }

  const uploadFile = async (info) => {
    const { file } = info
    setFiles([file])

    const encoded = await new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(file.originFileObj)
      reader.onload = () => resolve(reader.result)
    })
    const json = atob(encoded.substring(29))
    const result = JSON.parse(json)
    setContent(result)
  }
  useEffect(() => {
    dispatch({
      type: 'device/DETAIL',
      payload: {
        id
      }
    })
  }, [id, dispatch])
  useEffect(() => {
    setContent(detail.config)
  }, [detail.config])
  return (
    <>
      <div className='detail-page device-create-page'>
        <Helmet title='Thiết bị | Load config' />
        {/* <h3 className='form-title'><i className='i_user_8 ico30' />QUẢN LÝ THIẾT BỊ</h3> */}
        <div className='card-content'>
          <div className='card-bg detail-form-wrap'>
            {/* <Card title='Thêm thiết bị'> */}
            <Form className='detail-form' onFinish={onFinish} form={form}>
              {/* <div className='row'>
          <div className='col-lg-8 col-md-8 offset-md-2'> */}
              <Item
                className='display-grid grid-row'
                name='file'
                label='Chọn file config để upload file config.json'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng upload file config.json!'
                  }
                ]}
              >
                <Upload
                  action={null}
                  onChange={uploadFile}
                  fileList={files}
                  accept='application/JSON'
                  multiple={false}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Item>
              <Item
                className='display-grid grid-row'
                name='content'
              >
                <ReactJson src={content} />
              </Item>
              <div className='text-right fl-right btn-footer btn-group-footer'>
                <Button type='dashed' onClick={() => history.push('/devices')}>
                  <i className='i_cancel ico25' />
                  <strong>Hủy</strong>
                </Button>
                <Button type='primary' style={{ marginLeft: 10 }} htmlType='submit'>
                  <i className='i_save_36 ico25' />
                  <strong>Lưu</strong>
                </Button>
              </div>
              {/* </div>
        </div> */}
            </Form>
            {/* </Card> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(connect(mapStateToProps)(UploadConfigPage))
