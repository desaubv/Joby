import { IconX } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import './ui.css'

function Sidebar() {
  return (
    <div className='sidebar-container fixed'>
        <div>
            <IconX />
        </div>
        <ul className=''>
            <Link></Link>
            <li>Inicio</li>
            <li>Mensajes</li>
            <li>Cerrar sesión</li>
        </ul>
    </div>
  )
}

export default Sidebar
