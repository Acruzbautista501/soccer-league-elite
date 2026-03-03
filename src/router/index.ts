import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          redirect: '/dashboard'
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: DashboardView
        },

        // 👇 RUTA PADRE
        {
          path: 'teams',
          component: () => import('@/views/teams/TeamsLayout.vue'),
          children: [
            {
              path: '',
              name: 'Equipos',
              component: () => import('@/views/teams/TeamsList.vue')
            },
            {
              path: 'create',
              name: 'CrearEquipo',
              component: () => import('@/views/teams/TeamsCreate.vue')
            },
            // {
            //   path: ':id',
            //   name: 'DetalleEquipo',
            //   component: () => import('@/views/teams/TeamsDetail.vue'),
            //   props: true
            // },
            // {
            //   path: ':id/edit',
            //   name: 'EditarEquipo',
            //   component: () => import('@/views/teams/TeamsEdit.vue'),
            //   props: true
            // }
          ]
        }
      ]
    }
  ]
})

export default router
