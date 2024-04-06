import { useState, useEffect } from 'react'
import Header from '../components/ui/Header'
import Button from '../components/ui/Button'
import CvModal from '../components/ui/CvModal'
import EditDescModal from '../components/ui/EditDescModal'
import { 
  IconUserCog, 
  IconSettings, 
  IconUsers, 
  IconBuilding, 
  IconFileCv, 
  IconDots 
} from '@tabler/icons-react'
import idk from '../assets/idk.jpg'
import './content.css'

function Profile() {

  const data = {
    'status': '😄 Actualmente trabajando',
    'desc': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum mollitia fugiat eaque placeat repellat, doloremque harum beatae fugit, quos facilis incidunt omnis ex perspiciatis. Laboriosam, tempora quidem. Dolor recusandae minima nam accusantium hic, culpa quos nesciunt, veniam quibusdam minus quasi perspiciatis!',
    'exp': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum mollitia fugiat eaque placeat repellat, doloremque harum beatae fugit, quos facilis incidunt omnis ex perspiciatis. Laboriosam, tempora quidem. Dolor recusandae minima nam accusantium hic.',
    'disc': 'autismo'
  }

  const [modalCv, setModalCv] = useState(false)
  const [modalEdition, setModalEdition] = useState(false)

  useEffect(() => {

  }, [])

  const handleOpenModalCv = () => {
    setModalCv(true);
  };

  const handleCloseModalCv = () => {
    setModalCv(false);
  };

  const handleOpenModalEdition = () => {
    setModalEdition(true);
  };

  const handleCloseModalEdition = () => {
    setModalEdition(false);
  };

  return (
    <div className="content">
      <div className='absolute z-30'>
        <Header />
      </div>
        <div className="planet-background w-full pt-24 pb-32">
          <h1 className='text-4xl font-bold'>Perfil</h1>
        </div>
        <div className="main-content mt-10 relative">
          <div className='user-info pt-16 pb-10'>
            <div className="profile-picture-container flex justify-center pb-3">
              <img src={idk} alt="Foto de perfil" className='profile-picture'/>
            </div>
            <div className='flex-col justify-center items-center'>
              <h1 className='user-name py-2'>Yago Vega</h1>
              <p className='text-sm'>batiyago.js@gmail.com</p>
            </div>
          </div>
          <div className='bg-white description p-5 overflow-auto'>
            <div className='w-full flex justify-between items-center'>
              <IconFileCv size={45} className='p-2 bg-slate-200 rounded-full' onClick={handleOpenModalCv}/>
              <IconDots size={28} onClick={handleOpenModalEdition}/>
            </div>
            <p className='text-md font-semibold my-3'>{/* <strong>Status:</strong> */} {data.status}</p>
            <p className='text-sm'><strong>Descripción:</strong> {data.desc}</p>
            <p className='text-sm'><strong>Experiencia:</strong> {data.exp}</p>
            <p className='text-sm'><strong>Discapacidad:</strong> {data.disc}</p>
          </div>
          <div className='btns flex flex-col justify-center items-center'>
            <Button variant="btnM" extra="flex justify-center items-center gap-3 font-semibold"><IconUserCog />Editar Perfil</Button>
            <Button variant="btnM" extra="flex justify-center items-center gap-3 font-semibold"><IconSettings />Ajustes</Button>
            <Button variant="btnM" extra="flex justify-center items-center gap-3 font-semibold"><IconUsers />Cuentas</Button>
            <Button variant="btnM" extra="flex justify-center items-center gap-3 font-semibold"><IconBuilding />+ Añadir empresa</Button>
          </div>
        </div>
        <div className='fixed z-50'>
          <CvModal show={modalCv} handleClose={handleCloseModalCv}/>
        </div>
        <div className='fixed z-50'>
          <EditDescModal data={data} show={modalEdition} handleClose={handleCloseModalEdition} />
        </div>
    </div>
  )
}

export default Profile