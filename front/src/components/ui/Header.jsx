import { IconLegoFilled, IconMenu2, IconAddressBook, IconBell, IconMessage } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Logo Joby Black.svg'
import '../../index.css'
/* import Button from './Button' */
import './ui.css'

function Header() {
  return (
    <header className="App-header border-b border-black">
        <div className='flex justify-between items-center px-5'>
            <IconMenu2 className='lg:hidden' width={35}/>
            <Link to="/home">
              <img src={logo} alt='logo' className='w-24 lg:w-20 h-auto m-3'/>
            </Link>
            <div className='flex lg:gap-8 items-center'>
                <IconAddressBook className='hidden lg:block'/>
                <IconBell className='hidden lg:block'/>
                <IconMessage className='hidden lg:block'/>
                <IconLegoFilled className='lg:block border-black border rounded-full w-11 h-11 p-1'/>
            </div>
        </div>
    </header>
  )
}

export default Header
