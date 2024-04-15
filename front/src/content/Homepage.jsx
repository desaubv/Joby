/* IMPORTACION */
import { IconArrowDownRight } from '@tabler/icons-react'
/* IMPORTACION DE COMPONENTES */
import Header from '../components/ui/Header';
import Button from '../components/ui/Button'
/* import SearchLayout from '../components/ui/SearchLayout'; */
import './content.css'
import CocaCola from '../assets/cocacola.png'
import { useEffect, useState } from 'react';
import axiosHandler from '../axiosHandler';
import LoaderDefault from '../components/ui/LoaderDefault';

function Homepage() {

  const [ oportunity, setOportunity ] = useState(null);

    useEffect(() => {
        axiosHandler.GET('oportunity/')
            .then(data => {
                setOportunity(data);
            })
            .catch(() => {})
    }, [1]);

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

        {

          oportunity == null
          ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '170px' }}>
                <LoaderDefault/>
                <p style={{ width: '100%', textAlign:'center' }} className='text-xl'>Cargando información...</p>
            </div>
          : oportunity.map((o, index) => 
          <div className="card flex flex-col justify-center m-auto w-3/4">
            <div className='card-img w-full h-auto '>
              <div className='w-full flex justify-center items-center mt-10'>
              <img src={o.pic} alt="" className="border-black border rounded-full p-1" style={{ width: '100px', height: '100px' }} />
              </div>
            </div>
            <div className='card-info h-auto w-full px-7 pt-3 pb-6'>
              <h1 className='text-2xl font-bold'>{o.title}</h1>
              <p className='text-lg font-semibold'>{o.name}</p>
              <p className='text-xs'>{o.ubication}</p>
            </div>
            <div className='w-full flex justify-center pb-6'>
              <Button variant="btnM" extra="font-semibold bg-white" onClick={() => window.location.href = '/oportunity/'+o._id}>Ver empleo</Button>
            </div>
          </div>
          )

        }

      </div>
    </div>
  )
}

export default Homepage
