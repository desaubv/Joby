import { Link } from 'react-router-dom'
import Footer from '../components/ui/Footer'
import Button from '../components/ui/Button'
import logo from '../assets/Logo Joby Black.svg'
import violet from '../assets/Violet-door.svg'
import violetStroke from '../assets/Violet-door-stroke.svg'
import './content.css'

function LandingPage() {
  return (
    <div className='container bg-pink'>
        <div className='flex justify-between items-center p-3 border-b border-black'>
            <h1 className='text-3xl font-bold'>Joby</h1>
            <div className='flex gap-2'>
                <Link to="/login"><button className="btnLinksm">Iniciar sesión</button></Link>
                <Link to="/signup"><button className="btnLinksm">Registrarse</button></Link>
            </div>
        </div>
        <div>
            <div className='door-logo mt-5 flex justify-center w-full h-auto'>
                <img src={violet} className='violet w-2/5 absolute z-0 mt-3' />
                <img src={violetStroke} alt="stroke" className='stroke w-2/5 absolute z-10 mt-6 ml-6'/>
                <img src={logo} alt="logo" className='w-2/5 h-auto py-8 logo-landing absolute z-20'/>
            </div>
            <div className='mt-36 font-bold text-md text-center px-7 py-4 '>
                <p>Somos un sitio web de búsqueda de empleo que ofrece filtros específicos para encontrar oportunidades laborales adaptadas a las necesidades de las personas con discapacidad.</p>
            </div>
            <div className='w-full h-auto'>
                <img src=" " alt="" />
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default LandingPage