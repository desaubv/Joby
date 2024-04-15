import React, { useEffect, useState } from 'react'
import Header from '../components/ui/Header'
import LoaderDefault from '../components/ui/LoaderDefault';
import Button from '../components/ui/Button';
import axiosHandler from '../axiosHandler';

const MyOportunities = () => {

    const [ oportunities, setOportunities ] = useState(null);
    const [ applies, setApplies ] = useState(null);

    const session = JSON.parse( localStorage.getItem('session') )

    useEffect(() => {
        axiosHandler.GET('oportunity/user/'+session._id)
            .then(data => {
                setApplies(data.applies);
                setOportunities(data.oportunities);
                console.log(data);
            })
            .catch(() => {})
    }, [0])

    return (
        <div className='bg-pink homepage'>
            <Header />

            <div className='pt-10'>
                <div className='w-3/4 flex m-auto py-10 '>
                <h1 className='text-4xl font-bold'>Vacantes</h1>
                </div>
            </div>
            <div className='content'>

                {

                    oportunities == null
                        ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '170px' }}>
                                <LoaderDefault/>
                                <p style={{ width: '100%', textAlign:'center' }} className='text-xl'>Cargando información...</p>
                            </div>
                        : oportunities.length == 0
                            ? <></>
                            : <>
                                <p className='text-xl font-bold ml-6'>Publicadas por mi:</p>
                            {
                                    oportunities.map((o, index) => 
                                        <div className="card flex flex-col justify-center m-auto w-3/4 p-6">    
                                            <div className='card-info h-auto w-full px-7 pt-3 pb-6'>
                                                <br/>
                                                <h1 className='text-2xl font-bold'>{o.title}</h1>
                                                <p className='text-lg font-semibold'>{o.name}</p>
                                                <p className='text-xs'>{o.ubication}</p>
                                            </div>
                                            <div className='w-full flex justify-center pb-2'>
                                            <Button variant="btnM" extra="font-semibold bg-white" onClick={() => window.location.href = '/oportunity/'+o._id}>Ver</Button>
                                            </div>
                                        </div>
                                    )
                                }
                            
                            </>
                }

                    <br/><br/><br/>

                {

                    applies == null
                        ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '170px' }}>
                                <LoaderDefault/>
                                <p style={{ width: '100%', textAlign:'center' }} className='text-xl'>Cargando información...</p>
                            </div>
                        : applies.length == 0
                            ? <></>
                            : <>
                                <p className='text-xl font-bold ml-6'>Aplicadas:</p>
                            {
                                    applies.map((o, index) => 
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
                                        <Button variant="btnM" extra="font-semibold bg-white" onClick={() => window.location.href = '/oportunity/'+o._id}>Ver</Button>
                                        </div>
                                    </div>
                                    )
                                }
                            
                            </>
                }

            </div>
        </div>
    )
}

export default MyOportunities