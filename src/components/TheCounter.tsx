export default defineVaporComponent(({
  initial = 0,
}) => {
  const { count, inc, dec } = useCounter(initial)

  return (
    <div>
      { count }
      <button class="inc" onClick={() => inc()}>
        +
      </button>
      <button class="dec" onClick={() => dec()}>
        -
      </button>
    </div>
  )
})
