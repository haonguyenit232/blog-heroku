export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    className: 'dashboard',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Setting',
    to: '/setting',
    className: 'setting',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Blog Registration List',
        to: '/setting/blog-registration-list',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Logout',
    to: '/login',
    className: 'logout',
  },
]

