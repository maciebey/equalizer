import './App.css'
import PlayerContainer from './components/playerContainer'
import AudioContainer from './components/audioContainer'
import ModalController from './components/ModalController'
import Drawer from './components/Drawer'

import { useAppDispatch } from './state/hooks'
import { toggleDrawer } from './state/audioSlice'

function App () {
  const dispatch = useAppDispatch()
  const drawerStateHandler = (newState: boolean) => {
    dispatch(toggleDrawer(newState))
  }
  return (
    <>
      <header>
        <span className='app-header'>Relax Mix</span>
        <ModalController />
      </header>
      <div className='app-body'>
        <PlayerContainer />
        <Drawer setDrawerState={drawerStateHandler}>
          <AudioContainer />
        </Drawer>
      </div>
      <footer className='app-footer'>
        &copy;2019
      </footer>
    </>
  )
}

export default App
