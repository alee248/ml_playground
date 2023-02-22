function debounce(fn, delay=500) {
    var timerId
    return function(...props) {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            fn.call(this, ...props)
        }, delay)
    }
}

export default debounce