import type { MouseEvent } from 'vue-jsx-vapor'

declare module 'vue-jsx-vapor' {
  interface HTMLAttributes {
  }
  interface ReservedProps {
    onClick?: (event: MouseEvent) => void
  }
}

declare module 'vue-router' {
  interface RouterLinkProps {
    title?: unknown
  }
  interface RouteMeta {
    title?: string
  }
}

export {}
