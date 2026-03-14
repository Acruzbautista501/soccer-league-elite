import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import DashboardView from '@/views/DashboardView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumbs?: Array<{
      label: string | ((route: RouteLocationNormalizedLoaded) => string)
      to?: string
    }>
  }
}

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
          component: DashboardView,
          meta: {
            breadcrumbs: [
              { label: 'Dashboard' },
            ]
          }
        },

        // 👇 RUTA PADRE
        {
          path: 'teams',
          component: () => import('@/views/teams/TeamsLayout.vue'),
          children: [
            {
              path: '',
              name: 'Equipos',
              component: () => import('@/views/teams/TeamsList.vue'),
              meta: {
                breadcrumbs: [
                  { label: 'Equipos' },
                ]
              }
            },
            {
              path: 'create-team',
              name: 'CrearEquipo',
              component: () => import('@/views/teams/TeamsCreate.vue'),
              meta: {
                breadcrumbs: [
                  { label: 'Equipos', to: '/teams' },
                  { label: 'Registrar Equipo' },
                ]
              }
            },
            {
              path: 'edit-team/:id',
              name: 'EditarEquipo',
              component: () => import('@/views/teams/TeamsEdit.vue'),
              props: true,
              meta: {
                breadcrumbs: [
                  { label: 'Equipos', to: '/teams' },
                  { label: 'Editar Equipo' },
                ]
              }
            },
            {
              path: ':id/players',
              name: 'PlantillaEquipo',
              component: () => import('@/views/teams/TeamPlayerSquad.vue'),
              props: true,
              meta: {
                breadcrumbs: [
                  { label: 'Equipos', to: '/teams' },
                  { label: 'Plantilla' },
                ]
              }
            },
            {
              path: ':id/edit-players',
              name: 'EditarPlantilla',
              component: () => import('@/views/players/PlayerListView.vue'),
              props: true,
              meta: {
                breadcrumbs: [
                  { label: 'Equipos', to: '/teams' },
                  { label: 'Gestionar Jugadores' },
                ]
              }
            },
            {
              path: 'team/:name/create-player',
              name: 'AgregarJugador',
              component: () => import('@/views/players/CreatePlayerView.vue'),
              props: true,
              meta: {
                breadcrumbs: [
                  { label: 'Equipos', to: '/teams' },
                  { label: (route: RouteLocationNormalizedLoaded) => route.params.name as string },
                  { label: 'Añadir Jugador' },
                ]
              }
            },
            {
              path: 'team/:name/edit-player',
              name: 'EditarJugador',
              component: () => import('@/views/players/EditPlayerView.vue'),
              props: true,
              meta: {
                breadcrumbs: [
                  { label: 'Equipos', to: '/teams' },
                  { label: (route: RouteLocationNormalizedLoaded) => route.params.name as string },
                  { label: 'Editar Jugador' },
                ]
              }
            },
          ]
        }
      ]
    }
  ]
})

export default router
