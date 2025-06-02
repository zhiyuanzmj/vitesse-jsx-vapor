declare const defineVaporComponent = defineComponent

declare module 'vue' {
  interface HTMLAttributes {
  }
  interface ReservedProps {
  }
}

declare module 'vue-router' {
  interface RouterLinkProps {
    title?: unknown
  }
}

export {}
