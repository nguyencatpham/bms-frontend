import { Upload, Button, Form, Input } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import './detailForm.scss'
import { useHistory } from 'react-router'
import { Helmet } from 'react-helmet'
const { Item } = Form

const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'http://www.baidu.com/xxx.png',
  },
]

function Config() {
  const history = useHistory()
  const [form] = Form.useForm()
  const [files, setFiles] = useState(fileList)
  const onFinish = values => {
    // delete values.role
    // delete values.confirm
    // dispatch({
    //   type: 'authDevice/CREATE',
    //   payload: { body: [{ ...values }] }
    // })
  }

  const handleChange = (info) => {
    let fileList = [...info.fileList]

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2)

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url
      }
      return file
    })

    this.setState({ fileList })
  }

  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: handleChange,
    multiple: false,
  }

  return (
    <>
      <div className="detail-page device-create-page">
        <Helmet title="Thiết bị | Load config" />
        {/* <h3 className='form-title'><i className='i_user_8 ico30' />QUẢN LÝ THIẾT BỊ</h3> */}
        <div className="card-content">
          <div className="card-bg detail-form-wrap">
            {/* <Card title='Thêm thiết bị'> */}
            <Form className="detail-form" onFinish={onFinish} form={form}>
              {/* <div className='row'>
          <div className='col-lg-8 col-md-8 offset-md-2'> */}
              <Item
                className="display-grid grid-row"
                name="uuid"
                label="Chọn file config để upload"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập UUID!',
                  },
                  {
                    max: 256,
                    message: 'UUID quá dài!',
                  },
                ]}
              >
                
              <Upload {...props} fileList={files}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
              </Item>
              
              <div className="text-right fl-right btn-footer btn-group-footer">
                <Button type="dashed" onClick={() => history.push('/devices')}>
                  <i className="i_cancel ico25" />
                  <strong>Hủy</strong>
                </Button>
                <Button type="primary" style={{ marginLeft: 10 }} htmlType="submit">
                  <i className="i_save_36 ico25" />
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

export default Config
