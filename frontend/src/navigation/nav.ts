export interface NavItem {
  name: string
  to?: string
  icon?: string
  roles?: string[]
  children?: NavItem[]
}

const nav: NavItem[] = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'fa-solid fa-tachograph-digital'
  },
  {
    name: 'Competencia',
    icon: 'fa-solid fa-trophy',
    children: [
      {
        name: 'Equipos',
        to: '/teams',
        icon: 'fa-solid fa-users'
      },
      // {
      //   name: 'Partidos',
      //   to: '/matches',
      //   icon: 'fa-solid fa-futbol'
      // },
      // {
      //   name: 'Estadísticas',
      //   to: '/stats',
      //   icon: 'fa-solid fa-chart-simple'
      // }
    ]
  },
  {
    name: 'Administración',
    icon: 'fa-solid fa-gear',
    children: [
      // { name: 'Usuarios', to: '/users', icon: 'fa-solid fa-users' },
      // { name: 'Configuración', to: '/settings', icon: 'fa-solid fa-gear' }
    ]
  }
]

export default nav