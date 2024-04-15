import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosHandler from '../axiosHandler';
import Header from '../components/ui/Header';
import LoaderDefault from '../components/ui/LoaderDefault';
import Button from '../components/ui/Button';
import Swal from 'sweetalert2';

const Oportunity = () => {

    const { id } = useParams();
    const session = JSON.parse( localStorage.getItem('session') );

    const [ oportunity, setOportunity ] = useState(null);
    const [ enterprise, setEnterprise ] = useState(null);

    useEffect(() => {
        axiosHandler.GET('oportunity/'+id)
            .then(data => {
                setOportunity(data.oportunity);
                setEnterprise(data.enterprise);

                console.log(data);

            })
            .catch(() => {})
    }, [1]);

    const handleApply = () => {
        Swal.fire({
            html: `
                <h3>Se compartirá tu información personal</h3>
                <p>¿Deseas continuar?</p>
            `,
            icon: 'warning',
            confirmButtonText: 'Continuar',
            showDenyButton: true,
            denyButtonText: 'Cancelar'
        }).then((res) => {
            if(res.isConfirmed){

                axiosHandler.POST(`oportunity/apply/${session._id}/${id}`)
                    .then(data => 
                        Swal.fire('Listo, hemos enviado tu información', 'Si estan interesados se comunicarán contigo por el chat y/o correo electronico', 'success')
                            .then(() => window.location.href = '/home')
                    )
                    .catch(() => {})

            }
        })
    }

    const dropApply = () => {
        Swal.fire({
            html: `
                <h3>Se eliminara esta vacante por lo que no podrá haber mas aplicaciones</h3>
                <p>¿Deseas continuar?</p>
            `,
            confirmButtonText: 'Continuar',
            showDenyButton: true,
            denyButtonText: 'Cancelar'
        }).then((res) => {
            if(res.isConfirmed){

                axiosHandler.DELETE(`oportunity/${id}`)
                    .then(data => 
                        Swal.fire('Listo', 'Hemos removido esta vacante', 'success')
                            .then(() => window.location.href = '/home')
                    )
                    .catch(() => {})

            }
        })
    }

    return (
        <div style={{ width: '100%', backgroundColor: '#9C71D9'}}>
            <Header/>
            <div style={{ content: '', width: '100%', height: '78px' }}></div>

            {
                oportunity == null
                ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '170px' }}>
                      <LoaderDefault/>
                      <p style={{ width: '100%', textAlign:'center' }} className='text-xl'>Cargando información...</p>
                  </div>
                : <>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px 0 7.5px' }} >
                        <p className='name-chat-user'><strong>{oportunity == null ? 'Obteniendo datos...' : `${oportunity.title}`}</strong></p>
                    </div>

                    { session._id == oportunity.authorId ? <p style={{ width: '100%', textAlign:'center' }} className='text-xl'>( Publicada por mi )</p> : <></>}
                    <div style={{ width: '100%', height: 'max-content', backgroundColor: 'white', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', display: 'flex', justifyContent: 'center', alignItems: 'start', paddingTop: 20 }} >
                        

                        <div style={{width: '100%', margin: '20px', borderRadius: '20px', backgroundColor: '#B796E1', marginBottom: '20px', display: 'flex', flexDirection: 'row', height: 'max-content'}}>

                            <div style={{ width: '20%', display: 'flex', alignItems: 'start', justifyContent: 'center', marginLeft: '7px',marginTop: '7px'}}>
                                <img src={enterprise.pic} alt="User Img" className="border-black border rounded-full p-1" />
                            </div>

                            <div style={{width: '65%', display: 'flex', flexDirection: 'column', marginLeft: '3%'}}>
                                <div style={{ width: '100%', height: '40px', display: 'flex', alignItems: 'center'}}>
                                    <p className='text-md'><strong>{enterprise.name}</strong></p>
                                </div>

                                <div style={{ width: '100%', height: 'fit-content', display: 'flex', alignItems: 'start', justifyContent: 'center', flexDirection: 'column' }}>
                                    <p style={{ textAlign: 'justify' }} className='text-m pb-4'>{enterprise.description}</p>
                                </div>
                            </div>


                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '85%' }}>

                            <p className='text-m font-bold pt-2'>Descripción de la vacante:</p>
                            <p style={{ textAlign: 'justify' }} className='text-m pb-4'>{oportunity.description}</p>

                            <p className='text-m font-bold pt-2'>Experiencia requerida:</p>
                            <p style={{ textAlign: 'justify' }} className='text-m pb-4'>{oportunity.experience}</p>

                            <p className='text-m font-bold pt-2'>Ubicación de la vacante:</p>
                            <p style={{ textAlign: 'justify' }} className='text-m pb-4'>{oportunity.ubication}</p>

                            <p className='text-m font-bold pt-2'>Responsabilidades a llevar a cabo:</p>
                            <p style={{ textAlign: 'justify' }} className='text-m pb-4'>{oportunity.responsabilities}</p>

                            {
                                oportunity.salary !== undefined && oportunity.salary !== ''
                                ? <>
                                    <p className='text-m font-bold pt-2'>Salario aproximado del puesto:</p>
                                    <p style={{ textAlign: 'justify' }} className='text-m pb-4'>{oportunity.salary}</p>                 
                                </>
                                : <></>
                            }

                            <p className='text-m font-bold pt-2'>Tipo:</p>
                            <p style={{ textAlign: 'justify' }} className='text-m pb-4'>{oportunity.type}</p>

                            <p className='text-m font-bold pt-2'>Tipo de jornada:</p>
                            <p style={{ textAlign: 'justify' }} className='text-m pb-4'>{oportunity.typeOfWorkday}</p>

                            <p className='text-m font-bold pt-2'>Discapacidades aceptadas:</p>
                            <ul>
                                {
                                    oportunity.disabilities.map(d => 
                                        <li key={d}>
                                            <p style={{ textAlign: 'justify' }} className='text-m pb-4'>- {d}</p>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>

                        {
                            session._id == oportunity.authorId 
                                ? <>
                                    <Button style={{ backgroundColor: "#8B65BF", color: 'white' }} onClick={() => window.location.href = "/applies/"+id}><b>Ver aplicaciones</b></Button>
                                    <Button style={{ backgroundColor: "#8B65BF", color: 'white' }} onClick={dropApply}><b>Eliminar vacante</b></Button>
                                </>
                                : <Button style={{ backgroundColor: "#8B65BF", color: 'white' }} onClick={handleApply}><b>Aplicar al empleo</b></Button>
                        }
                        
                        <br/>
                    </div>


                </> 
                
            }

                


        </div>

    )
}

export default Oportunity