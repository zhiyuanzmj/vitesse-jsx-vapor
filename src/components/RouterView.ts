import type {
  AllowedComponentProps,
  ComponentCustomProps,
  ComponentPublicInstance,
  PropType,
  Slot,
  VNode,
  VNodeProps,
} from 'vue'
import type {
  RouteLocationMatched,
  RouteLocationNormalizedLoaded,
  RouteRecord,
  RouterViewProps,
} from 'vue-router'
import {
  computed,
  createComponent,
  createTemplateRefSetter,
  defineComponent,
  inject,
  provide,
  ref,
  unref,
  watch,
} from 'vue'
import { createNodes } from 'vue-jsx-vapor'
import {
  matchedRouteKey,
  routerViewLocationKey,
  viewDepthKey,
} from 'vue-router'

function isSameRouteRecord(a: RouteRecord, b: RouteRecord): boolean {
  // since the original record has an undefined value for aliasOf
  // but all aliases point to the original record, this will always compare
  // the original record
  return (a.aliasOf || a) === (b.aliasOf || b)
}

const assign = Object.assign

export const RouterViewImpl = /* #__PURE__ */ defineComponent({
  name: 'RouterView',
  // #674 we manually inherit them
  inheritAttrs: false,
  props: {
    name: {
      type: String as PropType<string>,
      default: 'default',
    },
    route: Object as PropType<RouteLocationNormalizedLoaded>,
  },

  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },

  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey)!
    const routeToDisplay = computed<RouteLocationNormalizedLoaded>(
      () => props.route || injectedRoute.value,
    )
    const injectedDepth = inject(viewDepthKey, 0)
    // The depth changes based on empty components option, which allows passthrough routes e.g. routes with children
    // that are used to reuse the `path` property
    const depth = computed<number>(() => {
      let initialDepth = unref(injectedDepth)
      const { matched } = routeToDisplay.value
      let matchedRoute: RouteLocationMatched | undefined
      while (
        // eslint-disable-next-line no-cond-assign
        (matchedRoute = matched[initialDepth])
        && !matchedRoute.components
      ) {
        initialDepth++
      }
      return initialDepth
    })
    const matchedRouteRef = computed<RouteLocationMatched | undefined>(
      () => routeToDisplay.value.matched[depth.value],
    )

    provide(
      viewDepthKey,
      computed(() => depth.value + 1),
    )
    provide(matchedRouteKey, matchedRouteRef)
    provide(routerViewLocationKey, routeToDisplay)

    const viewRef = ref<ComponentPublicInstance>()

    // watch at the same time the component instance, the route record we are
    // rendering, and the name
    watch(
      () => [viewRef.value, matchedRouteRef.value, props.name] as const,
      ([instance, to, name], [oldInstance, from]) => {
        // copy reused instances
        if (to) {
          // this will update the instance for new instances as well as reused
          // instances when navigating to a new route
          to.instances[name] = instance
          // the component instance is reused for a different route or name, so
          // we copy any saved update or leave guards. With async setup, the
          // mounting component will mount before the matchedRoute changes,
          // making instance === oldInstance, so we check if guards have been
          // added before. This works because we remove guards when
          // unmounting/deactivating components
          if (from && from !== to && instance && instance === oldInstance) {
            if (!to.leaveGuards.size) {
              to.leaveGuards = from.leaveGuards
            }
            if (!to.updateGuards.size) {
              to.updateGuards = from.updateGuards
            }
          }
        }

        // trigger beforeRouteEnter next callbacks
        if (
          instance
          && to
          // if there is no instance but to and from are the same this might be
          // the first visit
          && (!from || !isSameRouteRecord(to, from) || !oldInstance)
        ) {
          ;(to.enterCallbacks[name] || []).forEach(callback =>
            callback(instance),
          )
        }
      },
      { flush: 'post' },
    )

    return createNodes(() => {
      const route = routeToDisplay.value
      // we need the value at the time we render because when we unmount, we
      // navigated to a different location so the value is different
      const currentName = props.name
      const matchedRoute = matchedRouteRef.value
      const ViewComponent
        = matchedRoute && matchedRoute.components![currentName]

      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route })
      }

      // props from route configuration
      const routePropsOption = matchedRoute.props[currentName]
      const routeProps = routePropsOption
        ? routePropsOption === true
          ? route.params
          : typeof routePropsOption === 'function'
            ? routePropsOption(route)
            : routePropsOption
        : null

      // const onVnodeUnmounted: VNodeProps['onVnodeUnmounted'] = vnode => {
      // console.log('onVnodeUnmounted', vnode)
      // remove the instance reference to prevent leak
      // if (vnode.component!.isUnmounted) {
      //   matchedRoute.instances[currentName] = null
      // }
      // }
      const component = createComponent(
        // @ts-expect-error ingore
        ViewComponent,
        assign({}, routeProps, attrs, {
          // onVnodeUnmounted,
        }),
      )
      createTemplateRefSetter()(component, viewRef)

      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, { Component: component, route })
        || component
      )
    })
  },
})

function normalizeSlot(slot: Slot | undefined, data: any) {
  if (!slot)
    return null
  const slotContent = slot(data)
  return slotContent.length === 1 ? slotContent[0] : slotContent
}

// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
/**
 * Component to display the current route the user is at.
 */
export const RouterView = RouterViewImpl as unknown as {
  new (): {
    $props: AllowedComponentProps &
      ComponentCustomProps &
      VNodeProps &
      RouterViewProps

    $slots: {
      default?: ({
        Component,
        route,
      }: {
        Component: VNode
        route: RouteLocationNormalizedLoaded
      }) => VNode[]
    }
  }
}
