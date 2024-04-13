import React from 'react'
import Header from '../components/ui/Header'
import './content.css'
import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp, IconMail } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const session = JSON.parse(localStorage.getItem('session'));

function Company() {
  return (
    <div className='bg-pink w-full h-full'>
        <Header />
      <div className="pt-24 ml-4">
        <div className='bg-purple pt-10 pb-6'>
            <div className="company-picture flex justify-center ">
              <img src={session.pic} alt="Foto de perfil" className='profile-picture'/>
            </div>
            <div className='ml-32 mb-3'>
              <h1 className='text-m font-bold'>Nombre de la empresa:</h1>
              <p className='text-sm'>Nombre :p</p>              
              <h1 className='text-m font-bold'>Rubro de la empresa:</h1>
              <p className='text-sm'>*/Inserte aqui el rubro/*</p>
            </div>
        </div>    
        <div className='bg-purple h-auto mt-3'>          
            <h1 className='text-m font-bold pt-2 ml-4'>Descripción:</h1>
            <p className='text-m ml-4 mb-4'>*/inserta la descripción de la empresa aqui/*</p>          
        </div>
        <div className='h-full mt-3'>
          <button className='contact-button text-m font-bold'>Contactanos</button>
          <button className='jobs-button text-m font-bold'>Vacantes</button>
            <div className='bg-purple2 h-auto mb-4'>
              <p className='text-m font-bold pt-2 ml-4'>Contacta a *Nombre empresa* para más información</p>            
                <ul className='text-white flex justify-evenly w-full mt-3 mb-2'> 
                    <Link className='p-2'>
                      <li className='footer-icon'><IconBrandFacebook size={35} stroke={1.5} className='facebook'/></li>
                    </Link>
                    <Link className='p-2'>
                      <li className='footer-icon'><IconBrandInstagram size={35} stroke={1.5}/></li>
                    </Link>
                    <Link className='p-2'>
                      <li className='footer-icon'><IconBrandWhatsapp size={35} stroke={1.5}/></li>
                    </Link>
                    <Link className='p-2'>
                      <li className='footer-icon'><IconMail size={35} stroke={1.5}/></li>
                    </Link>
                </ul>                
            </div>
        </div>
      </div>
    </div>
  )
}

export default Company