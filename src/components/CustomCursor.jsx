import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const outlineRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      dot.style.left = `${x}px`
      dot.style.top = `${y}px`
      outline.animate({ left: `${x}px`, top: `${y}px` }, { duration: 500, fill: 'forwards' })
    }

    const onEnter = () => outline.classList.add('hover')
    const onLeave = () => outline.classList.remove('hover')

    window.addEventListener('mousemove', onMove)

    const targets = document.querySelectorAll('[data-cursor]')
    targets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={outlineRef} className="cursor-outline hidden md:block" />
    </>
  )
}
