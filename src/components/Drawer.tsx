import { useState } from 'react'

import './Drawer.css'

const Drawer = ({children}:{children:any}) => {
  const [isOpen, setIsOpen] = useState(false)
  const clickDrawer = () => {
    setIsOpen((isOpen) => !isOpen)
  }
  return (
    <>
      <div className={`drawer-container ${isOpen ? 'open' : ''}`}>
        <div onClick={() => clickDrawer()}>Click Me</div>
        <div className={`drawer-content ${isOpen ? 'open' : ''}`}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Drawer
