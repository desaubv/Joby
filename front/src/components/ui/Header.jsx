import { useState, useEffect } from 'react'
import { 
  /* IconLegoFilled, */
  IconMenu2,
  IconX, 
  IconHome,
  IconMessages,
  IconLogout2,
  IconUser,
  /* IconAddressBook, IconBell, IconMessage */ 
} from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo Joby Black.svg'
import logoWhite from '../../assets/Logo Joby.svg'
import idk from '../../assets/idk.jpg'
import './ui.css'

function Header() {
  const location = useLocation()
  const [sidebar, setSidebar] = useState(false)
  const [activeItem, setActiveItem] = useState('')

  const session = JSON.parse(localStorage.getItem('session'));

  useEffect(() => {
    const currentPath = location.pathname

    if (currentPath === '/home') {
      setActiveItem('home')
    } else if (currentPath === '/chat') {
      setActiveItem('chat');
    } else if (currentPath === '/profile') {
      setActiveItem('profile')
    } else {
      setActiveItem('');
    }
  }, [location.pathname])

  return (
    <div>
      <header className="App-header border border-black flex justify-between items-center px-5 fixed w-full">
        <div>
          <IconMenu2 className='lg:hidden' width={35} onClick={() => setSidebar(true)} />
        </div>
        <Link to="/home">
          <img src={logo} alt='logo' className='w-24 lg:w-20 h-auto m-3'/>
        </Link>
        <div className='flex lg:gap-8 items-center'>
          <Link to="/profile">
            <img src={session.pic} alt="" className="border-black border rounded-full w-14 h-14 p-1" />
          </Link>
        </div>
      </header>
      <div className={`sidebar ${sidebar ? 'show' : ''}`}>
        <div className="side-container">
          <div className='close-sidebar w-full flex justify-end p-4'>
            <IconX onClick={() => setSidebar(false)} />
          </div>
          <ul className='list'>
            <div className='d-1 pt-10'>
              <li className={`w-full ${activeItem === 'home' ? 'active' : ''}`}>
                <Link to="/home" className='flex justify-start items-center gap-3'>
                  <IconHome size={28}/>
                  <p className='text-xl font-semibold'>Inicio</p>
                </Link>
              </li>
              <li className={`w-full ${activeItem === 'chats' ? 'active' : ''}`}>
                <Link to="/chats" className='flex justify-start items-center gap-3'>
                  <IconMessages size={28}/>
                  <p className='text-xl font-semibold'>Mensajes</p>
                </Link>
              </li>
              <li className={`w-full ${activeItem === 'profile' ? 'active' : ''}`}>
                <Link to="/profile" className='flex justify-start items-center gap-3'>
                  <IconUser size={28}/>
                  <p className='text-xl font-semibold'>Perfil</p>
                </Link>
              </li>
            </div>
            <div className='d-2'>
                <Link to='/logout'>
                  <li className='flex justify-start items-center gap-3'>
                      <IconLogout2 size={28}/>
                      <p className='text-xl font-semibold'>Cerrar sesión</p>
                  </li>
                </Link>
            </div>
            <div className='d-3 w-full'>
              <img src={logoWhite} alt="Logo Joby" />
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
