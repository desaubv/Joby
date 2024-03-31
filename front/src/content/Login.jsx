import { Link } from 'react-router-dom'
import { IconUserFilled, IconLock } from '@tabler/icons-react'
import Logo from '../assets/Logo Joby.svg' 
import './content.css'
/* IMPORTACION DE COMPONENTES REUTILIZABLES */
import Button from '../components/ui/Button'
import './content.css'

function Login() {
  return (
    <div className='login'>
        <div className="logo flex justify-center p-5 py-10">
          <Link to="/">
            <img src={Logo} alt="logo" className='w-40'/>
          </Link>
        </div>
        <div className='bg-white login-content p-14'>
          <div className='pb-10'>
            <h1 className='text-black uppercase text-4xl text-center pt-2 pb-3 '>Iniciar sesión</h1>
            <Link to="/signup" className='text-sm font-semibold px-2'>¿No tienes cuenta? registrate aqui</Link>
          </div>
          <form action="" method="post" className='flex-column justify-center'>
            <div className='flex-column pb-10'>
              <div className='w-full text-right'>
                <label htmlFor="" className='w-full text-right font-semibold'>Nombre</label>
              </div>
              <div className='flex justify-center'>
                <div className='bg-black p-3 rounded-full z-10'>
                  <IconUserFilled className='login-icon'/>
                </div>
                <input type='text' className='w-full text-black font-normal text-right border border-black -ml-8  my-4 p-2 login-input'/>
              </div>
              <div className='mt-4'>
                <div className='w-full text-left '>
                  <label htmlFor="" className='font-semibold'>Contraseña</label>
                </div>
                <div className='flex'>
                  <input type="text" className='w-full text-black font-normal text-left border border-black login-input -mr-8 my-4 p-2'/>
                  <div className='bg-black p-3 rounded-full z-10'>
                    <IconLock className='login-icon'/>
                  </div>
                </div>
              </div>
              
            </div>
            <div className='flex-column items-center'>
              <Button variant="login">Iniciar sesion</Button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Login
