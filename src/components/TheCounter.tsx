export default defineVaporComponent(({
  initial = 0,
}) => {
  let { count, inc, dec } = useCounter(initial)

  return (
    <div>
      { count.value }
      <button class="inc" onClick={() => inc()}>
        +
      </button>
      <button class="dec" onClick={() => dec()}>
        -
      </button>
    </div>
  )
})
