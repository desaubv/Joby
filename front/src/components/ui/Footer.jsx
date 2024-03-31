import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp, IconMail } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Logo Joby Black.svg'
import './ui.css'

function Footer() {
  return (
    <div>
      <div className='w-full h-auto flex justify-between items-center p-6'>
        <p className='font-semibold'>¡Contáctanos!</p>
        <ul className='text-white flex gap-4'> 
            <Link><li className='footer-icon'><IconBrandFacebook size={30} stroke={1.5} className='facebook'/></li></Link>
            <Link><li className='footer-icon'><IconBrandInstagram size={30} stroke={1.5}/></li></Link>
            <Link><li className='footer-icon'><IconBrandWhatsapp size={30} stroke={1.5}/></li></Link>
            <Link><li className='footer-icon'><IconMail size={30} stroke={1.5}/></li></Link>
        </ul>
      </div>
      <div className='w-full h-auto flex px-5'>
        <div className='w-1/3 p-3 flex flex-col gap-y-3 items-center justify-center'>
            <img src={logo} alt="logo Joby" />
            <p className='text-xs'>© 2024</p>
        </div>
        <div className='w-1/3 p-3 text-center text-sm font-semibold flex flex-col justify-center gap-y-5'>
            <Link><p>Acerca de</p></Link>
            <Link><p>Condiciones de uso</p></Link>
        </div>
        <div className='w-1/3 p-3 text-center text-sm font-semibold flex flex-col justify-center gap-y-5'>
            <Link><p>Política de la marca</p></Link>
            <Link><p>Política de privacidad</p></Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
