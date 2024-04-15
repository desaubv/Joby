import React, { useEffect, useState } from 'react';
import axiosHandler from '../axiosHandler';
import Header from '../components/ui/Header';
import LoaderDefault from '../components/ui/LoaderDefault';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { IconBuilding, IconSearch } from '@tabler/icons-react'
import Swal from 'sweetalert2';

const JoinCompany = () => {

    const [ companies, setCompanies ] = useState(null);
    const [ allCompanies, setAllComanies ] = useState(null);

    const session = JSON.parse( localStorage.getItem('session') );

    useEffect(() => {

        axiosHandler.GET('enterprise')
            .then(data => {
                setCompanies(data);
                setAllComanies(data);
            })
            .catch({ });

    }, [1]);

    const handleSearch = (e) => {
        const { value } = e.target;

        if(value == ''){
            setCompanies(allCompanies);
            return;
        }

        const data = allCompanies.filter(item => item.name.toUpperCase().includes(value.toUpperCase()));
        setCompanies(data);
    }

    const handleJoin = (index) => {
        Swal.fire({
            icon: 'question',
            title: 'Deseas asignar que trabajas en '+companies[index].name,
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            confirmButtonColor: '#8B65BF'
        }).then((result) => {
            if (result.isConfirmed) {
              
                axiosHandler.PUT('enterprise/join/'+session._id, { enterpriseId: companies[index]._id })
                    .then(user => {
                        localStorage.setItem('session', JSON.stringify(user));
                        Swal.fire("Listo!", "", "Continuar")
                            .then(() => window.location.href = '/profile')

                    }).catch({})
                
            }
        });
    }



    return (
        <div style={{ width: '100%', minHeight: window.innerHeight, backgroundColor: '#9C71D9'}}>
            <Header/>            
            <div style={{ content: '', width: '100%', height: '80px' }}></div>

            


            <p className='text-xl font-bold' style={{ fontSize: '25px', color: 'white', width: '100%', textAlign: 'center', marginBottom: '5px' }}><strong>Elegir empresa</strong></p>
            

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Input placeholder='Buscar empresa' variantI="login" onChange={handleSearch} />
                    <Button style={{ marginTop: '-5px', marginLeft: '10px', backgroundColor: 'white' }} onClick={() => {}}><IconSearch/></Button>
                </div>

                <Button style={{backgroundColor: 'white', marginTop: '-5px', marginBottom: '15px', fontSize: '15px', padding: '5px 15px 5px 15px'}} variant="btnM" extra="flex justify-center items-center gap-3 font-semibold" onClick={() => window.location.href = '/addcompany'}><IconBuilding size={20}/>+ Añadir empresa</Button>



                <div style={{ width: '100%', minHeight: 'calc(100vh - 285px)', backgroundColor: 'white', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column' }} >
                    <div style={{ content: '', minHeight: '30px' }}></div>

                    {
                        companies == null
                        ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '170px' }}>
                            <LoaderDefault/>
                            <p style={{ width: '100%', textAlign:'center' }} className='text-xl'>Cargando Empresas...</p>
                        </div>
                        : companies.map((c, index) => 
                            <div key={'chamba-'+index} className='list-chats' style={{ backgroundColor: 'red', width: '92%', borderRadius: '10px', backgroundColor: '#F2E9F2', marginBottom: '20px' }} onClick={() => handleJoin(index)}>
                                <div className='img-chat-grid'>
                                <img src={c.pic} alt="User Img" className="border-black border rounded-full p-1" />
                                </div>

                                <div className='name-chat-grid' style={{ display: 'flex', alignItems: 'start', justifyContent: 'start' }}>
                                    <div style={{ width: '80%', height: '100%', display: 'flex', alignItems: 'end' }}>
                                        <p className='text-md'><strong>{c.name}</strong></p>
                                    </div>

                                </div>
                                
                                <div className='message-chat-grid' style={{ display: 'flex', alignItems: 'start', justifyContent: 'start' }}>
                                    <p style={{ maxHeight: '4.8em', textOverflow: 'ellipsis', overflow: 'hidden', fontSize: '12px', WebkitLineClamp: '4', lineHeight: '1.2em', WebkitBoxOrient: 'vertical', display: '-webkit-box', whiteSpace: 'normal', textAlign: 'justify' }}>{c.description}</p>
                                </div>
                            </div>
                        )
                    }


                    

                    




                </div>


            </div>

            



            
        </div>
    )
}

export default JoinCompany