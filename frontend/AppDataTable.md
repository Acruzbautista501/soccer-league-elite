# AppDataTable

Componente genérico de tabla con búsqueda, ordenamiento y paginación.

---

## Props

| Prop                | Tipo               | Default        | Descripción                                      |
|---------------------|--------------------|----------------|--------------------------------------------------|
| `data`              | `T[]`              | —              | Array de objetos a mostrar                       |
| `columns`           | `DataTableColumn[]`| —              | Definición de columnas                           |
| `searchPlaceholder` | `string`           | `'Buscar...'`  | Placeholder del campo de búsqueda                |
| `searchFields`      | `string[]`         | `[]` (todas)   | Campos del objeto donde se aplica la búsqueda    |
| `emptyMessage`      | `string`           | `'No se encontraron registros.'` | Mensaje cuando no hay resultados |
| `itemLabel`         | `string`           | `'registros'`  | Etiqueta usada en "Mostrando X de Y {itemLabel}" |

### DataTableColumn

```ts
interface DataTableColumn {
  key: string
  label: string
  sortable?: boolean   // activa el ordenamiento en esa columna
  numeric?: boolean    // ordena como número en vez de string
  align?: 'left' | 'right'
}
```

---

## Slots

### `#body` — filas de la tabla

Recibe `{ items }` con los datos ya **filtrados, ordenados y paginados**.

```vue
<template #body="{ items }">
  <tr v-for="item in items" :key="item._id">
    <td>{{ item.name }}</td>
  </tr>
</template>
```

### `#toolbar-actions` — acciones extra en el toolbar

Se renderiza a la derecha del buscador, antes del selector de página.

```vue
<template #toolbar-actions>
  <button>Exportar</button>
</template>
```

### `#empty` — estado vacío personalizado

Reemplaza el mensaje por defecto cuando no hay resultados.

```vue
<template #empty>
  <span>Sin jugadores registrados.</span>
</template>
```

---

## Ejemplo de uso — Equipos

```vue
<AppDataTable
  :data="teams"
  :columns="[
    { key: 'name',   label: 'Equipo',  sortable: true },
    { key: 'region', label: 'Región',  sortable: true },
  ]"
  item-label="equipos"
>
  <template #body="{ items }">
    <tr v-for="team in items" :key="team._id">
      <td class="px-6 py-4">{{ team.name }}</td>
      <td class="px-6 py-4">{{ team.region }}</td>
    </tr>
  </template>
</AppDataTable>
```

## Ejemplo de uso — Jugadores

```vue
<AppDataTable
  :data="teamPlayer"
  :columns="[
    { key: 'fullName',  label: 'Jugador',  sortable: true },
    { key: 'number',   label: 'Dorsal',   sortable: true, numeric: true },
    { key: 'position', label: 'Posición', sortable: true },
    { key: 'status',   label: 'Estado',   sortable: true },
    { key: '_actions', label: 'Acciones', align: 'right' },
  ]"
  search-placeholder="Buscar jugador, dorsal, posición..."
  :search-fields="['fullName', 'number', 'position', 'status']"
  item-label="jugadores"
>
  <template #body="{ items }">
    <tr v-for="player in items" :key="player._id">
      <!-- celdas -->
    </tr>
  </template>
</AppDataTable>
```
