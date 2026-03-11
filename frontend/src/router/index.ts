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
              path: '/:id/players',
              name: 'PlantillaEquipo',
              component: () => import('@/views/teams/TeamPlayerSquad.vue'),
              props: true
            },
            {
              path: 'create-team',
              name: 'CrearEquipo',
              component: () => import('@/views/teams/TeamsCreate.vue')
            },
            {
              path: 'edit-team/:id',
              name: 'EditarEquipo',
              component: () => import('@/views/teams/TeamsEdit.vue'),
              props: true
            },
            {
              path: '/team/:name/create-player',
              name: 'AgregarJugador',
              component: () => import('@/views/players/CreatePlayerView.vue'),
              props: true
            },            
          ]
        }
      ]
    }
  ]
})

export default router
