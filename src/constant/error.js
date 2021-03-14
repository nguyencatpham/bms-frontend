
module.exports = {
  USER_CREATE_UNAUTHORIZED: {
    message: 'Không cho phép tạo tài khoản chưa được chứng thực',
    statusCode: 422
  },
  USER_CREATE_PASSWORD_TOO_LONG: {
    message: 'Mật khẩu quá 72 kí tự!',
    statusCode: 422
  },
  USER_ADMIN_WEAK_PASSWORD: {
    message: 'Mật khẩu cho quản trị viên yêu cầu trên 8 kí tự!',
    statusCode: 422
  },
  USER_NORMAL_WEAK_PASSWORD: {
    message: 'Mật khẩu tối thiểu phải từ 4 kí tự!',
    statusCode: 422
  },
  USER_REGISTERED_ALREADY: {
    message: 'email này đã được đăng ký, vui lòng chọn email khác!',
    statusCode: 422
  },
  USER_CONFIRMED_ALREADY: {
    message: 'Bạn đã xác thực rồi!',
    statusCode: 422
  },
  USER_UNCONFIRMED: {
    message: 'Yêu cầu xác thực tài khoản trước.',
    statusCode: 422
  },
  UNCONFIRMED_USER_NOT_FOUND: {
    message: 'Tài khoản không tồn tại',
    statusCode: 404
  },
  USER_UPDATE_PASSWORD_ATTRS_AFTER_VERIFIED: {
    message: 'Không thể thay đổi mật khẩu đối với tài khoản chưa được xác thực',
    statusCode: 422
  },
  USER_CHANGE_PASSWORD_WITH_OLD_PASSWORD_NOT_MATCH: {
    message: 'Mật khẩu hiện tại không đúng',
    statusCode: 422
  },
  LOGIN_FAILED: {
    message: 'Đăng nhập thất bại',
    statusCode: 401
  },
  LOGIN_FAILED_EMAIL_NOT_VERIFIED: {
    message: 'Tài khoản chưa được xác thực!',
    statusCode: 401
  },
  USER_BLOCKED: {
    message: 'Tài khoản đã bị khóa',
    statusCode: 401
  },
  USER_SUSPENDED: {
    message: 'Tài khoản bị cấm',
    statusCode: 401
  },
  USER_NOT_FOUND: {
    message: 'Tài khoản không tồn tại',
    statusCode: 404
  },
  EMAIL_NOT_FOUND: {
    message: 'Email không tồn tại',
    statusCode: 404
  },
  RESET_FAILED_EMAIL_NOT_VERIFIED: {
    message: 'Email chưa được chứng thực',
    statusCode: 401
  },
  USER_USERNAME_EXIST: {
    message: 'Tài khoản đã tồn tại',
    statusCode: 422
  },
  USER_EMAIL_EXIST: {
    message: 'email đã tồn tại',
    statusCode: 422
  },
  USER_OPERATING_CABINET: {
    message: 'Tài khoản này đang vận hành trạm biến áp. Vui lòng xóa trạm biến áp trước!',
    statusCode: 422
  },
  DEVICE_UNAUTHORIZED: {
    message: 'Thiết bị chưa được chứng thực',
    statusCode: 422
  },
  DEVICE_IS_OCCUPIED: {
    message: 'Thiết bị đã được gắn trước đó rồi',
    statusCode: 422
  },
  DEVICE_NOT_ALLOW_REMOTE_CONFIG: {
    message: 'Thiết bị không cho phép cấu hình từ xa',
    statusCode: 422
  },
  DEVICE_NOT_ALLOW_REMOTE_CONTROL: {
    message: 'Thiết bị không cho phép điều khiển từ xa',
    statusCode: 422
  },
  INVALID_REQUEST_DATA: {
    message: 'Thông tin nhập không đúng',
    statusCode: 422
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Hệ thống đang bận',
    statusCode: 500
  },
  MODEL_NOT_FOUND: {
    message: 'Dữ liệu không tồn tại',
    statusCode: 404
  },
  ACCESS_DENIED: {
    message: 'Bạn không có quyền',
    statusCode: 403
  },
  AUTHORIZATION_REQUIRED: {
    message: 'Yêu cầu xác thực',
    statusCode: 401
  }
}
