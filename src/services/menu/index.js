import store from 'store'

export default async function getMenuData () {
  const role = store.get('user.role')
  const menu = [
    // VB:REPLACE-START:MENU-CONFIG
    {
      title: 'Tổng quan',
      key: '__dashboard',
      url: '/dashboard',
      icon: 'fe fe-home'
    },
    {
      title: 'Thiết bị',
      key: '__device',
      url: '/devices',
      icon: 'fe fe-airplay'
    },
    {
      title: 'Thông báo',
      key: '__event',
      url: '/events',
      icon: 'fe fe-alert-circle'
    },
    {
      title: 'Quản trị viên',
        key: '__user',
        url: '/accounts',
        icon: 'fe fe-user'
    }
  ]
  // switch (role) {
  //   case 'admin':
  //     menu.push({
  //       title: 'Khách hàng',
  //       key: '__user',
  //       url: '/accounts',
  //       icon: 'fe fe-user'
  //     })
  //     break
  //   case 'client':
  //     menu.push({
  //       title: 'Nhân viên',
  //       key: '__user',
  //       url: '/accounts',
  //       icon: 'fe fe-user'
  //     })
  //     break
  //   default:
  //     break
  // }
  // menu.push({
  //   title: 'Đăng xuất',
  //   key: '__logout',
  //   url: '/logout',
  //   icon: 'fe fe-alert-circle'
  // })
  return menu
}
