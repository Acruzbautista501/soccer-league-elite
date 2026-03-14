<script setup lang="ts">
import OverviewCardComponent from '@/components/dashboard/OverviewCardComponent.vue';
import PendingResultsComponent from '@/components/dashboard/PendingResultsComponent.vue';
import QuickActionsComponent from '@/components/dashboard/QuickActionsComponent.vue';
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue';

</script>

<template>
  <div class="p-8 space-y-8">
    <AppBreadcrumb />
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Resumen General de la Liga-->
      <OverviewCardComponent />
      <!-- Acciones Rápidas -->
      <QuickActionsComponent />
    </div>
    <!-- Resultados Pendientes -->
    <PendingResultsComponent />
  </div>
</template>
