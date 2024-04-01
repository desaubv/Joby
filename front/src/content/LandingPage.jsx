import { Link } from 'react-router-dom'
import Footer from '../components/ui/Footer'
import logo from '../assets/Logo Joby Black.svg'
import violet from '../assets/Violet-door.svg'
import violetStroke from '../assets/Violet-door-stroke.svg'
import people1 from '../assets/people1.png'
import people2 from '../assets/people2.png'
import bg1 from '../assets/bg-1.png'
import bg2 from '../assets/bg-2.png'
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
                <img src={violet} alt="" className='violet w-2/5 absolute z-0 mt-3' />
                <img src={violetStroke} alt="stroke" className='stroke w-2/5 absolute z-10 mt-6 ml-6'/>
                <img src={logo} alt="logo" className='w-2/5 h-auto py-8 logo-landing absolute z-20'/>
            </div>
            <div className='mt-36 font-bold text-md text-center px-7 py-4 '>
                <p>Somos un sitio web de búsqueda de empleo que ofrece filtros específicos para encontrar oportunidades laborales adaptadas a las necesidades de las personas con discapacidad.</p>
            </div>
        </div>
        <div className='w-full h-auto'>
            <div className='flex justify-center items-center p-5 mt-20'>
                <img src={bg1} alt="" className='w-3/4 absolute z-0'/>
                <img src={people1} alt="" className='w-2/5 absolute z-10'/>
            </div>
            <div className='mt-28 flex flex-col justify-center items-center text-center px-10'>
                <h1 className='text-5xl font-bold'>Misión</h1>
                <p className='font-normal text-sm mt-3'>Facilitar a los usuarios la búsqueda y aplicación de empleos mediante una plataforma intuitiva y eficiente, conectando a candidatos con oportunidades laborales que se ajusten a sus habilidades y aspiraciones profesionales.</p>
            </div>
            <div className='flex justify-center items-center p-5 mt-36'>
                <img src={bg2} alt="" className='w-2/3 absolute z-0'/>
                <img src={people2} alt="" className='w-2/5 absolute z-10'/>
            </div>
            <div className='mt-28 flex flex-col justify-center items-center text-center px-10 mb-20'>
                <h1 className='text-5xl font-bold'>Visión</h1>
                <p className='font-normal text-sm mt-3'>Convertirnos en el principal destino en línea para todas aquellas personas discapacitadas que buscan trabajo, ofreciendo una amplia gama de opciones laborales, herramientas de búsqueda y recursos de desarrollo profesional, para impulsar el éxito y la realización en las carreras de nuestros usuarios.</p>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default LandingPage