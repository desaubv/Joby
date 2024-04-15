import React, { useEffect, useState } from 'react'
import Header from '../components/ui/Header'
import './content.css'
import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp, IconMail, IconNewSection, IconPlus, IconX } from '@tabler/icons-react'
import { Link, useParams } from 'react-router-dom'
import axiosHandler from '../axiosHandler';
import LoaderDefault from '../components/ui/LoaderDefault'
import Button from '../components/ui/Button'
import Swal from 'sweetalert2'
import Input from '../components/ui/Input'

const disabilitiesList = [
  "Auditiva (Parcial)",
  "Auditiva (Total)",
  "Intelectual",
  "Motiz (Silla de ruedas)",
  "Motiz (Brazos o torso)",
  "Motiz (Cadera, piernas o pies)",
  "Motiz (Talla baja)",
  "Visual (Parcial)",
  "Visual (Total)",
];

const session = JSON.parse(localStorage.getItem('session'));

function Company() {

  const {id} = useParams();

  const [ company, setCompany ] = useState(null);
  const [ oportunutyModal, setOportunityModal ] = useState(false)
  const [ oportunuty, setOportunity ] = useState({
    authorId: session._id,
    enterpriseId: id,
    title: '',
    description: '',
    experience: '',
    responsabilities: '',
    disabilities: [],
    salary: '',
    type: '',
    typeOfWorkday: '',
  });
  const [ showInputOther, setShowInputOther ] = useState(false);

  useEffect(() => {
    axiosHandler.GET('enterprise/'+id)
    .then(data => {
      setCompany(data);
    }).catch({})
  }, [1]);

  const handleExit = () => {
    Swal.fire({
      icon: 'question',
      title: 'Deseas asignar que ya no trabajas en '+company.name,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonColor: '#8B65BF'
    }).then((result) => {
        if (result.isConfirmed) {
          
            axiosHandler.PUT('enterprise/join/'+session._id, { enterpriseId: null })
                .then(user => {
                    localStorage.setItem('session', JSON.stringify(user));
                    Swal.fire("Listo!", "", "Continuar")
                        .then(() => window.location.href = '/profile')

                }).catch({})
            
        }
    });
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setOportunity({...oportunuty, [name]: value});
  }

  const handleNewoportunity = () => {
    setOportunityModal(!oportunutyModal);
  }

  const handleChangeCB = (e) => {
    const { name, value, type, checked } = e.target;

    if(type === "checkbox"){

      if(checked){
        const disa = [...oportunuty.disabilities]

        disa.push(name);
        setOportunity({...oportunuty, "disabilities": disa});
      }else{
        const disa = oportunuty.disabilities.filter(item => item !== name);
        setOportunity({...oportunuty, "disabilities": disa});
      }

    }else if(type === "text"){

      const disa = oportunuty.disabilities.filter(item => disabilitiesList.indexOf(item) > -1);

      disa.push(value);
      setOportunity({...oportunuty, "disabilities": disa});

    }
  }

  const handleCreate = () => {
    axiosHandler.POST('oportunity', oportunuty)
      .then(data => window.location.href = '/oportunity/'+data._id)
      .catch(()=>{})
  }

  return (
    <div className='bg-pink w-full h-full' style={{minHeight: '100vh'}}>
        <Header />

        <div style={{ width: '92%', marginLeft: '4%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

        {

          company == null
          ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '170px' }}>
                <LoaderDefault/>
                <p style={{ width: '100%', textAlign:'center' }} className='text-xl'>Cargando información...</p>
            </div>
          : <div  className="pt-24">
  

              <div style={{width: '100%', borderRadius: '20px', backgroundColor: '#B796E1', marginBottom: '20px', display: 'flex', flexDirection: 'row', height: 'max-content'}}>

                <div style={{ width: '20%', display: 'flex', alignItems: 'start', justifyContent: 'center', marginLeft: '7px',marginTop: '7px'}}>

                  <img src={company.pic} alt="User Img" className="border-black border rounded-full p-1" />

                </div>

                <div style={{width: '65%', display: 'flex', flexDirection: 'column', marginLeft: '3%'}}>
                  <div style={{ width: '100%', height: '40px', display: 'flex', alignItems: 'center'}}>
                    <p className='text-md'><strong>{company.name}</strong></p>

                  </div>
                  <div style={{ width: '100%', height: 'fit-content', display: 'flex', alignItems: 'start', justifyContent: 'center', flexDirection: 'column' }}>
                      <p className='text-m font-bold pt-2'>Rubros de la empresa:</p>
                      {
                        company.branches.map(b => <li key={b}>{b}</li>)
                      }
                  </div>
                </div>

              </div>

              <div className='bg-purple h-auto mt-3' style={{ width: '100%', padding: '15px' }}>          
                <p className='text-m font-bold'>Descripción:</p>
                <p className='text-m ' style={{ textAlign: 'justify' }}>{company.description}</p>          
              </div>

              {
                session.enterpriseId === id
                ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                   <Button style={{ backgroundColor: 'white', display: 'flex'}} onClick={handleNewoportunity}><IconNewSection/> Crear oportunidad laboral</Button>
                   <Button style={{ backgroundColor: 'white', display: 'flex'}} onClick={handleExit}><IconX/> Ya no trabajo aqui</Button>
                  </div>
                : <></>
              }

              {
                oportunutyModal
                ? <div style={{ width: '100vw', height: '100vh', backgroundColor: '#FFFFFF70', position: 'fixed', top: 0, left: 0, zIndex: '323', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '95%', maxHeight: '80vh', backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column', borderRadius: 15, border: '2px #8B65BF solid', overflowY: 'scroll' }}>
                      <div style={{ display: 'flex', justifyContent: 'end' }} onClick={handleNewoportunity}><IconX/></div>
                    <p className='text-black text-xl font-extrabold mb-2'>Crear vacante de trabajo</p>

                      <div className='p-3 signup-card rounded-2xl mb-3'>
                        <Input name="title" placeholder="Ej. Cocinero de comida china Jr" variantI="base" variantL="check" label="Titulo de la vacante" type="text" extraL="text-black" onChange={handleChange} />
                        <Input name="description" placeholder="Una breve descripción de en que consiste" variantI="textarea" label="Descripcion de la vacante:" extraI="w-full h-24" onChange={handleChange}/>
                        <Input name="experience" placeholder="La experiecia minima requerida para el trabajo" variantI="textarea" label="Experiencia requerida:" extraI="w-full h-24" onChange={handleChange}/>
                        <Input name="responsabilities" placeholder="Un listado con las responsabilidades que se llevaran a cabo" variantI="textarea" label="Responsabilidades a desarrollar:" extraI="w-full h-24" onChange={handleChange}/>
                        <Input name="salary" placeholder="$2500 MXN semanales" variantI="base" variantL="check" label="Sueldo aproximado (Opcional)" type="text" extraL="text-black" onChange={handleChange} />
                        <Input name="type" placeholder="Ej. Remoto, Hibrido" variantI="base" variantL="check" label="Tipo" type="text" extraL="text-black" onChange={handleChange} />
                        <Input name="typeOfWorkday" placeholder="Ej. Completa, medio tiempo, 12hrs" variantI="base" variantL="check" label="Tipo de jornada" type="text" extraL="text-black" onChange={handleChange} />
                        <Input name="ubication" placeholder="Ej. Ciudad de México, México" variantI="base" variantL="check" label="Ubicación de la vacante (Ciudad)" type="text" extraL="text-black" onChange={handleChange} />

                        <p className='text-black text-md font-extrabold mb-2'>Discapacidades aceptadas (no poner aceptara cualquiera)</p>
        
                        {
                          disabilitiesList.map(d => <Input key={"key-"+d} id={d} name={d} variantI="check" variantL="check" label={d} type="checkbox" extraL="text-black" onChange={handleChangeCB}/>)
                        }

                        <Input id="Otra" name="Otra" variantI="check" variantL="check" label="Otra" type="checkbox" extraL="text-black" onChange={(e) => setShowInputOther(e.target.checked)}/>
                        {
                          showInputOther
                          ? <Input id="Other" variantI="base" label="¿Qué discapacidad?" type="text" extraL="text-black" onChange={handleChangeCB}/> 
                          : <></>
                        }

                      </div>

                      <Button onClick={handleCreate} style={{ backgroundColor: '#8B65BF', display: 'flex', color: 'white' }}><b>Crear</b> <IconPlus/></Button>
                    
                    </div>
                    <br/>
                  </div>
                : <></>
              }

                  

        </div>

        }


        </div>
      
    </div>
  )
}

export default Company