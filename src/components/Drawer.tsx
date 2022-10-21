import { useEffect, useRef, useState } from 'react'
import './Drawer.css'

type DrawerProps = {
  children: JSX.Element,
  setDrawerState: (arg0:boolean) => void
}

const Drawer = ({children, setDrawerState}:DrawerProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [drawerHeight, setDrawerHeight] = useState(-500)
  const contentRef = useRef<HTMLDivElement>(null)

  // once drawer content is rendered, we'll set the initial bottom height
  useEffect(()=> {
    const offSetElementCollection = document.getElementsByClassName('player-containter')
    if (!contentRef || !contentRef.current || !offSetElementCollection.length) return;
    const newOffset = offSetElementCollection[0].scrollHeight
    setDrawerHeight(newOffset - contentRef.current.scrollHeight)
    setIsLoaded(true)
  }, [contentRef])

  // toggle open/close
  const clickDrawer = () => {
    if (drawerHeight < 0) {
      setDrawerHeight(0)
      setDrawerState(true)
    }
    else {
      const newOffset = document.getElementsByClassName('player-containter')[0].scrollHeight
      setDrawerHeight(newOffset - contentRef.current!.scrollHeight)
      setDrawerState(false)
    }
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
