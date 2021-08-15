export const callAll =
  (...fns: any[]) =>
  (...args: any[]) => {
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i]
      if (!fn) continue
      const res = fn(...args)
      if (res === false) {
        break
      }
    }
  }
// fns.forEach((fn) => fn && fn(...args))
