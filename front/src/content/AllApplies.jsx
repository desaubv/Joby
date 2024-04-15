import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosHandler from '../axiosHandler';
import Swal from 'sweetalert2'
import LoaderDefault from '../components/ui/LoaderDefault';
import Header from '../components/ui/Header';
import { IconFileCv, IconX } from '@tabler/icons-react';
import Button from '../components/ui/Button';

const AllApplies = () => {

    const { id } = useParams();
    const [ users, setUsers ] = useState(null);
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ documents, setDocuments ] = useState(null);

    const session = JSON.parse( localStorage.getItem('session') );

    useEffect(() => {
        axiosHandler.GET('oportunity/apllies/'+id)
            .then(data => {
                setUsers(data);
            })
            .catch(() => {})
    }, [1]);

    useEffect(() => {
        if(currentUser == null) return;

        axiosHandler.GET('documents/user/'+currentUser._id)
            .then(data => {
                setDocuments(data[0]);
            }).catch({})
          
    }, [currentUser]);

    const handleContact = () => {
        axiosHandler.POST('conversations/', {
            oportunityId: id,
            userId1: session._id,
            userId2: currentUser._id,
            conversationIndex: 0
        }).then(data => window.location.href = '/chat/'+data._id)
        .catch(() => {})
    }

    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: '#9C71D952' }}>
            <Header/>

            <div style={{ content: '', width: '100%', height: '100px' }}></div>

            <div style={{ width: '100%', minHeight: 'calc(100vh - 100px)', backgroundColor: 'white', borderTopLeftRadius: '40px', borderTopRightRadius: '40px' }} >
                <p className='text-black text-xl font-extrabold mb-2 pl-5 pt-6 mt-2'><Link to={'/oportunity/'+id}>Aplicaciones a tu <u>vacante</u></Link></p>

                {
                    users == null
                    ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '170px' }}>
                        <LoaderDefault/>
                        <p style={{ width: '100%', textAlign:'center' }} className='text-xl'>Obteniendo conversaciones...</p>
                      </div>
                    : users.length == 0
                        ? <p style={{ width: '100%', textAlign:'center', marginTop: '200px' }} className='text-xl'>Por el momento no hay ninguna aplicación.</p>
                        : users.map((u, index) => 
                            <div key={'user-'+index} className='list-chats' onClick={() => setCurrentUser(u)} >
                                <div className='img-chat-grid'>
                                    <img src={u.pic} alt="User Img" className="border-black border rounded-full p-1" />
                                </div>
                    
                                <div className='name-chat-grid'>
                                    <div style={{ width: '80%', height: '100%', display: 'flex', alignItems: 'end' }}>
                                        <p className='text-md'><strong>{u.name}</strong></p>
                                    </div>
                    
                                </div>
                                
                                <div className='message-chat-grid'>
                                    <div style={{ width: '80%', height: '100%', display: 'flex', alignItems: 'center' }}>
                                        <p className='text-md' style={{whiteSpace: 'nowrap', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis'}}>{u.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    
                }

                {
                    currentUser == null
                        ? <></>   
                        : <div className='modal display-block'>
                            <div className="modal-main">
                                <div className='close-sidebar w-full flex justify-between items-center p-2'>
                                    <h1 className='text-2xl font-semibold'>Información del aplicante</h1>
                                    <IconX onClick={() => setCurrentUser(null)} />
                                </div>
                                <div>

                                    <div className='bg-white overflow-auto'>
                                        <div className="profile-picture-container flex justify-center pb-3">
                                            <img src={currentUser.pic} alt="Foto de perfil" className='profile-picture'/>
                                        </div>
                                        
                                        <div className='flex-col justify-center items-center'>
                                            <h1 className='py-2 text-xl'><b>Nombre: </b>{currentUser.name} {currentUser.lastname}</h1>
                                            <Link to={'mailto:'+currentUser.email} className='text-md'><u><b>Correo: </b>{currentUser.email}</u></Link>
                                        </div>

                                        <p className='text-md my-3'><b>Ocupación actual:</b> {currentUser.ocupation}</p>

                                        <div className='w-full flex justify-between items-center'>
                                        {
                                            documents == null 
                                                ? <p>(NOTA: No hay ningun CV cargado)</p> 
                                                : <IconFileCv size={45} className='p-2 bg-slate-200 rounded-full' onClick={() => { if(documents !== null) window.open(axiosHandler.backend+'documents/'+documents._id) }}/>
                                        }
                                        
                                        </div>

                                        <p className='text-sm'><strong>Discapacidad(es):</strong></p>
                                        <ul>
                                        {
                                            currentUser.disabilities.map(d => <li key={d}> <p className='text-sm'>- {d}</p></li>)
                                        }
                                        </ul>
                                        

                                        <p className='text-sm mt-3'><strong>Descripción:</strong> {currentUser.description}</p>
                                        <p className='text-sm'><strong>Experiencia:</strong></p>
                                        {
                                            currentUser.experience.map(e => 
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
                                        
                                    </div>
                                        
                                <Button onClick={handleContact}>Contactar al aplicante</Button>
                                </div>
                            </div>
                        </div>
                }

        


            </div>
        </div>  
    )
}

export default AllApplies