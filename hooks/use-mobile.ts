import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// this is a helper hook to avoid hydration mismatch when rendering on the server
// it returns undefined on the server and the actual value on the client
// this is useful for components that need to know if they are rendered on mobile or not
// it can be used like this:
// const isMobile = useIsMobile()
// if (isMobile === undefined) {
//   // render a placeholder or nothing
// } else if (isMobile) {
//   // render mobile version
// } else {
//   // render desktop version
// }
