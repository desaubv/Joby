/* IMPORTACION */
import { IconArrowDownRight } from '@tabler/icons-react'
/* IMPORTACION DE COMPONENTES */
import Header from '../components/ui/Header';
import Button from '../components/ui/Button'
/* import SearchLayout from '../components/ui/SearchLayout'; */
import './content.css'
import CocaCola from '../assets/cocacola.png'

function Homepage() {
  return (
    <div className='bg-pink homepage'>
      <Header />
      {/* <SearchLayout /> */}
      <div className='pt-10'>
        <div className='w-3/4 flex m-auto py-10 '>
          <h1 className='text-4xl font-bold'>Empleos para tí</h1>
        </div>
      </div>
      <div className='content'>
        <div className="card flex flex-col justify-center m-auto w-3/4">
          <div className='card-img w-full h-auto '>
            <div className='w-full flex justify-center items-center'>
              <img src={CocaCola} alt="Logo empresa"/>
            </div>
          </div>
          <div className='card-info h-auto w-full px-7 pt-3 pb-6'>
            <h1 className='text-2xl font-bold'>Frontend Developer</h1>
            <p className='text-lg font-semibold'>Coca Cola</p>
            <p className='text-xs'>Guadalajara, Jalisco</p>
          </div>
          <div className='w-full flex justify-center pb-6'>
            <Button variant="btnM" extra="font-semibold bg-white">Ver empleo</Button>
          </div>
        </div>
        <div className="card flex flex-col justify-center m-auto w-3/4">
          <div className='card-img w-full h-auto '>
            <div className='w-full flex justify-center items-center'>
              <img src={CocaCola} alt="Logo empresa"/>
            </div>
          </div>
          <div className='card-info h-auto w-full px-7 pt-3 pb-6'>
            <h1 className='text-2xl font-bold'>Frontend Developer</h1>
            <p className='text-lg font-semibold'>Coca Cola</p>
            <p className='text-xs'>Guadalajara, Jalisco</p>
          </div>
          <div className='w-full flex justify-center pb-6'>
            <Button variant="btnM" extra="font-semibold bg-white">Ver empleo</Button>
          </div>
        </div>
        <div className="card flex flex-col justify-center m-auto w-3/4">
          <div className='card-img w-full h-auto '>
            <div className='w-full flex justify-center items-center'>
              <img src={CocaCola} alt="Logo empresa"/>
            </div>
          </div>
          <div className='card-info h-auto w-full px-7 pt-3 pb-6'>
            <h1 className='text-2xl font-bold'>Frontend Developer</h1>
            <p className='text-lg font-semibold'>Coca Cola</p>
            <p className='text-xs'>Guadalajara, Jalisco</p>
          </div>
          <div className='w-full flex justify-center pb-6'>
            <Button variant="btnM" extra="font-semibold bg-white">Ver empleo</Button>
          </div>
        </div>
        <div className="card flex flex-col justify-center m-auto w-3/4">
          <div className='card-img w-full h-auto '>
            <div className='w-full flex justify-center items-center'>
              <img src={CocaCola} alt="Logo empresa"/>
            </div>
          </div>
          <div className='card-info h-auto w-full px-7 pt-3 pb-6'>
            <h1 className='text-2xl font-bold'>Frontend Developer</h1>
            <p className='text-lg font-semibold'>Coca Cola</p>
            <p className='text-xs'>Guadalajara, Jalisco</p>
          </div>
          <div className='w-full flex justify-center pb-6'>
            <Button variant="btnM" extra="font-semibold bg-white">Ver empleo</Button>
          </div>
        </div>
        <div className='w-full flex justify-center pt-5 pb-10'>
          <Button variant="btnLg" extra="flex justify-center items-center font-bold">Mostrar todo <IconArrowDownRight width={32} height={32} stroke={2}/></Button>
        </div>
      </div>
    </div>
  )
}

export default Homepage
