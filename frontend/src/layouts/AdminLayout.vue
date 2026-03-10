<script setup lang="ts">
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { auth } from '../api/api'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  initFlowbite()
})

const handleLogout = async () => {
  await signOut(auth)
  router.push('/login')
}
</script>

<template>
  <div class="antialiased bg-gray-50 dark:bg-gray-900">
    <nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
          <button
            data-drawer-target="drawer-navigation"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
          </button>
          
          <a href="#" class="flex items-center justify-between mr-4">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">VolleyStats <span class="text-blue-600 text-sm">Admin</span></span>
          </a>
        </div>
        
        <div class="flex items-center lg:order-2">
          <button @click="handleLogout" class="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-500 dark:hover:bg-red-600">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>

    <aside
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <ul class="space-y-2">
          <li>
            <router-link to="/admin/dashboard" class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span class="ml-3">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/equipos" class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span class="ml-3">Equipos</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/partidos" class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span class="ml-3">Partidos en Vivo</span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>

    <main class="p-4 md:ml-64 h-auto pt-20">
       <router-view /> </main>
  </div>
</template>