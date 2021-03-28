export default async function getMenuData () {
  return [
    // VB:REPLACE-START:MENU-CONFIG
    {
      title: 'Trang chủ',
      key: '__dashboard',
      url: '/dashboard',
      icon: 'fe fe-home'
    },
    {
      title: 'Khách hàng',
      key: '__user',
      url: '/accounts',
      icon: 'fe fe-user'
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
    }

    // VB:REPLACE-END:MENU-CONFIG
  ]
}
