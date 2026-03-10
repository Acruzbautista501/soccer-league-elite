// src/composables/useThemedSwal.ts
import Swal from 'sweetalert2'
import type { SweetAlertOptions } from 'sweetalert2'

export function useThemedSwal() {

  const fire = (options: SweetAlertOptions) => {

    return Swal.fire({
      ...options,

      customClass: {
        popup: `
          rounded shadow-lg
          bg-white text-slate-800
          dark:bg-slate-800 dark:text-slate-100
        `,

        title: 'font-bold text-lg',

        actions: 'flex gap-2',   // 👈 espacio entre botones

        confirmButton: `
          px-4 py-2 rounded font-semibold
          bg-blue-600 hover:bg-blue-700 text-white
        `,

        cancelButton: `
          px-4 py-2 rounded font-semibold
          bg-slate-200 hover:bg-slate-300 text-slate-700
          dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200
        `
      },

      buttonsStyling: false
    })
  }

  return { fire }
}