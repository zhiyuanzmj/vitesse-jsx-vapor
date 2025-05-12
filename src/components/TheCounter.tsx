export default defineComponent(({
  initial = 0,
}) => {
  let { count, inc, dec } = $useCounter(initial)

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
