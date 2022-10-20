import { useEffect, useRef, useState } from 'react'
import './Drawer.css'

type DrawerProps = {
  children: JSX.Element
}

const Drawer = ({children}:DrawerProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [drawerHeight, setDrawerHeight] = useState(-500)
  const contentRef = useRef<HTMLDivElement>(null)

  // once drawer content is rendered, we'll set the initial bottom height
  useEffect(()=> {
    if (!contentRef || !contentRef.current) return;
    setDrawerHeight(0 - contentRef.current.scrollHeight)
    setIsLoaded(true)
  }, [contentRef])

  // toggle open/close
  const clickDrawer = () => {
    if (drawerHeight < 0) setDrawerHeight(0)
    else setDrawerHeight(0 - contentRef.current!.scrollHeight)
  }

  return (
    <div className={`drawer-container ${isLoaded ? 'open' : ''}`} style={{"bottom":drawerHeight}}>
      <div className='drawer-header' onClick={() => clickDrawer()}>Sound Streams</div>
      <div className='drawer-content' ref={contentRef}>
        {children}
      </div>
    </div>
  )
}

export default Drawer
