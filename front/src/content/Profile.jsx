import { useState, useEffect } from 'react'
import Header from '../components/ui/Header'
import Button from '../components/ui/Button'
import EditDescModal from '../components/ui/EditDescModal'
import { 
  IconUserCog,
  IconBuilding, 
  IconFileCv, 
  IconDots 
} from '@tabler/icons-react'
import './content.css'
import axiosHandler from '../axiosHandler';
import { Link } from 'react-router-dom'

function Profile() {

  const data = {
    'status': '😄 Actualmente trabajando',
    'desc': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum mollitia fugiat eaque placeat repellat, doloremque harum beatae fugit, quos facilis incidunt omnis ex perspiciatis. Laboriosam, tempora quidem. Dolor recusandae minima nam accusantium hic, culpa quos nesciunt, veniam quibusdam minus quasi perspiciatis!',
    'exp': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum mollitia fugiat eaque placeat repellat, doloremque harum beatae fugit, quos facilis incidunt omnis ex perspiciatis. Laboriosam, tempora quidem. Dolor recusandae minima nam accusantium hic.',
    'disc': 'autismo'
  }

  const [ modalEdition, setModalEdition ] = useState(false)
  const [ documents, setDocuments ] = useState(null);
  const [ enterprise, setEnterprise ] = useState(null);

  const session = JSON.parse(localStorage.getItem('session'));

  useEffect(() => {

  }, [])

  const handleOpenModalCv = () => {
    console.log(documents);
    if(documents !== null) window.open(axiosHandler.backend+'documents/'+documents._id);
  };

  const handleOpenModalEdition = () => {
    setModalEdition(true);
  };

  const handleCloseModalEdition = () => {
    setModalEdition(false);
  };

  useEffect(() => {
      const getData = async() => {
          axiosHandler.GET('documents/user/'+session._id)
          .then(data => {
              setDocuments(data[0]);
          }).catch({})

          if(session.enterpriseId !== undefined){
            axiosHandler.GET('enterprise/'+session.enterpriseId)
            .then(data => {
              setEnterprise(data);
            }).catch({})
          }
      }

      getData();
  }, [ 1 ]);

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
              <img src={session.pic} alt="Foto de perfil" className='profile-picture'/>
            </div>
            <div className='flex-col justify-center items-center'>
              <h1 className='user-name py-2'>{session.name} {session.lastname}</h1>
              <p className='text-sm'>{session.email}</p>
              {
                enterprise == null ? <></> : <Link to={'/company/'+enterprise._id}>Trabajo en: <b style={{ textDecoration: 'underline' }}>{enterprise.name}</b></Link>
              }
            </div>
          </div>
          <div className='bg-white description p-5 overflow-auto'>
            <div className='w-full flex justify-between items-center'>
              {
                documents == null ? <button></button> :  <IconFileCv size={45} className='p-2 bg-slate-200 rounded-full' onClick={handleOpenModalCv}/>
              }
              <IconDots size={28} onClick={handleOpenModalEdition}/>
            </div>
            <p className='text-md font-semibold my-3'>{session.ocupation}</p>
            <p className='text-sm'><strong>Descripción:</strong> {session.description}</p>
            <p className='text-sm'><strong>Experiencia:</strong></p>
            {
              session.experience.map(e => 
                <div key={e.puesto+e.name} style={{ paddingLeft: 7, marginBottom: 5, border: "1px black solid", borderLeft: 'none', borderRight: 'none' }}>
                  <ul>

                    <li> <p className='text-xs'><b>Empresa:</b> {e.name}</p> </li>
                    <li> <p className='text-xs'><b>Puesto:</b> {e.position}</p> </li>
                    <li> <p className='text-xs'><b>Fecha de Inicio:</b> {e.start}</p> </li>
                    <li> <p className='text-xs'><b>Fecha de Fin:</b> {e.end}</p> </li>
                    <li> <p className='text-xs'><b>Habilidades:</b> {e.habilities}</p> </li>

                  </ul>
                </div>
              )
            }
            <p className='text-sm'><strong>Discapacidad(es):</strong></p>
            <ul>
              {
                session.disabilities.map(d => <li key={d}> <p className='text-sm'>- {d}</p></li>)
              }
            </ul>
          </div>

          <div className='btns flex flex-col justify-center items-center'>
            <Button variant="btnM" extra="flex justify-center items-center gap-3 font-semibold" onClick={handleOpenModalEdition}><IconUserCog />Editar Perfil</Button>
            <Button variant="btnM" extra="flex justify-center items-center gap-3 font-semibold" onClick={() => window.location.href = '/joincompany'}><IconBuilding />Trabajo en empresa</Button>
            <div style={{ minHeight: session.enterpriseId == undefined ? '340px' : '400px', content: '' }}></div>
          </div>
        </div>

        <div className='fixed z-50'>
          <EditDescModal data={data} show={modalEdition} handleClose={handleCloseModalEdition} />
        </div>
    </div>
  )
}

export default Profile