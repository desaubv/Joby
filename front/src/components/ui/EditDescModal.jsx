import { IconX } from '@tabler/icons-react'
import { IconPlus, IconMinus } from '@tabler/icons-react'
import Input from './Input'
import './ui.css'
import { useState } from 'react'
import React from 'react';
import Button from './Button'
import axiosHandler from '../../axiosHandler';

const experienceJSON = {
    name: "",
    start: "",
    end: "",
    habilities: "",
    position: ""
}

const schoolRecordJSON = {
    school: "",
    career: "",
    start: "",
    end: ""
}

const EditDescModal = ({data, handleClose, show}) => {

    const session = JSON.parse(localStorage.getItem('session'));

    const [ experience, setExperience ] = useState(session.experience);
    const [ schoolRecord, setSchoolRecord ] = useState(session.schoolRecord);
    const [ ocupation, setOcupation ] = useState(session.ocupation);
    const [ description, setDescription ] = useState(session.description);
    const [name, setName] = useState(session.name);
    const [lastname, setLastame] = useState(session.lastname);

    const handleChange = (e, array, index) => {
        const { name, value } = e.target;
    
        if(array == 'schoolRecord'){
            const aux = [...schoolRecord];
            aux[index][name] = value;

            setSchoolRecord(aux);
        }else if(array == 'experience'){
            const aux = [...experience];
            aux[index][name] = value;
            
            setExperience(aux);
        }
    }

    const quitElement = (array, index) => {
        if(array == 'schoolRecord'){
            const aux = [...schoolRecord];

            aux.splice(index, 1);
            setSchoolRecord(aux);
        }else if(array == 'experience'){
            const aux = [...experience];
            
            aux.splice(index, 1);
            setExperience(aux);
        }
    }

    const addElement = (array) => {
        if(array == 'schoolRecord'){
            const aux = [...schoolRecord];

            aux.push(schoolRecordJSON);
            setSchoolRecord(aux);
        }else if(array == 'experience'){
            const aux = [...experience];
            
            aux.push(experienceJSON);
            setExperience(aux);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name,
            lastname,
            experience,
            schoolRecord,
            ocupation,
            description,
        }


        axiosHandler.PUT('users/'+session._id, formData)
        .then(data => {
            localStorage.setItem('session', JSON.stringify(data));
            window.location.reload();
        }).catch(err => {});

    }

    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                <div className='close-sidebar w-full flex justify-between items-center p-2'>
                    <h1 className='text-2xl font-semibold'>Editar información</h1>
                    <IconX onClick={handleClose} />
                </div>
                <div>
                    <div className='p-2'>
                        
                        <p className='text-black text-xl font-extrabold mb-2'>Nombre y apellido</p>
                        <div className='my-4'>
                            <Input id="ocupation" value={name} placeholder="Ej. Juan Pedro" variantI="base" variantL="check" label="Nombre" type="text" extraL="text-black" onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className='my-4'>
                            <Input id="ocupation" value={lastname} placeholder="Ej. Lopez Perez" variantI="base" variantL="check" label="Apellido" type="text" extraL="text-black" onChange={(e) => setLastame(e.target.value)}/>
                        </div>
                        
                        <div className='my-4'>
                            <p className='text-black text-xl font-extrabold mb-2'>Cual es tu profesión (Opcional)</p>
                            <Input id="ocupation" value={ocupation} placeholder="Ej. Estudiante, cocinero, mesero, programador" variantI="base" variantL="check" label="Ocupación" type="text" extraL="text-black" onChange={(e) => setOcupation(e.target.value)}/>
                        </div>

                        <div className='my-4'>
                            <Input value={description} variantI="textarea" label="Tu descripción actual:" extraI="w-full h-36" onChange={(e) => setDescription(e.target.value)}/>
                        </div>

                        <div className='my-4 signup-card rounded-2xl p-6 mb-4'>
                            <p className='text-black text-xl font-extrabold mb-2'>Experiencia laboral</p>
                            {
                                experience.map((e, index) => 
                                    <React.Fragment key={"experience-"+index}> 
                                    <p className='text-black text-l font-bold mt-4'>Empresa #{index+1}</p>

                                    <Input id="name-1" name="name" value={e.name} variantI="base" variantL="check" label="Nombre de la empresa" type="text" extraL="text-black" onChange={(e) => handleChange(e, "experience", index)} />
                                    <Input id="position-1" name="position" value={e.position} variantI="base" variantL="check" label="Puesto" type="text" extraL="text-black" onChange={(e) => handleChange(e, "experience", index)} />
                                    
                                    <div className='flex flex-col items-center'>
                                        <label htmlFor="start-1">Estadía en la empresa</label>
                                        <Input name="start" value={e.start} variantI="base" variantL="check" type="text" extraL="text-black" extraI='w-2/3' placeholder="Ingreso (aprox)" id="start-1" onChange={(e) => handleChange(e, "experience", index)} />
                                        
                                        <label htmlFor="end-1">a</label>
                                        <Input name="end" value={e.end} variantI="base" variantL="check" type="text" extraL="text-black" extraI='w-2/3' placeholder="Egreso (aprox)" id="end-1" onChange={(e) => handleChange(e, "experience", index)} />
                                    </div>
                                    <Input name="habilities" value={e.habilities} variantI="base" variantL="check" label="Habilidades adquiridas o utilizadas" type="" extraL="text-black" id="habilities-1" onChange={(e) => handleChange(e, "experience", index)} />

                                    <Button variant="btnS" extra="flex justify-center gap-2 text-white font-bold sig-btn" onClick={() => quitElement("experience", index)}><IconMinus className='plus-logo'/>Quitar</Button>

                                    <br/>
                                    </React.Fragment>
                                )
                            }

                            <Button variant="btnFull" extra="flex justify-center gap-2 text-white font-bold sig-btn" onClick={() => addElement("experience")} ><IconPlus className='plus-logo'/>Añadir experiencia laboral</Button>
                        </div>


                        <div className='my-4 signup-card rounded-2xl p-6'>
                            <p className='text-black text-xl font-extrabold mb-2'>Historia escolar</p>

                            {
                                schoolRecord.map((e, index) => 
                                    <React.Fragment key={"schoolRecord-"+index}> 
                                    <p className='text-black text-l font-bold mt-4'>Escuela #{index+1}</p>

                                    <Input id="school-1" name="school" value={e.school} variantI="base" variantL="check" label="Escuela" type="text" extraL="text-black" onChange={(e) => handleChange(e, "schoolRecord", index)} />
                                    <Input id="career-1" name="career" value={e.career} variantI="base" variantL="check" label="Carrera o titulo" type="text" extraL="text-black" onChange={(e) => handleChange(e, "schoolRecord", index)} />
                                    
                                    <div className='flex flex-col items-center'>
                                        <label htmlFor="start-2">Estadía en la escuela</label>
                                        <Input name="start" value={e.start} variantI="base" variantL="check" type="text" extraL="text-black" extraI='w-2/3' placeholder="Incio (aprox)" id="start-1" onChange={(e) => handleChange(e, "schoolRecord", index)} />
                                        
                                        <label htmlFor="end-2">a</label>
                                        <Input name="end" value={e.end} variantI="base" variantL="check" type="text" extraL="text-black" extraI='w-2/3' placeholder="Fin (aprox)" id="end-1" onChange={(e) => handleChange(e, "schoolRecord", index)} />
                                    </div>

                                    <Button variant="btnS" extra="flex justify-center gap-2 text-white font-bold sig-btn" onClick={() => quitElement("schoolRecord", index)}><IconMinus className='plus-logo'/>Quitar</Button>

                                    <br/>
                                    </React.Fragment>
                                )
                            }
                            <Button variant="btnFull" extra="flex justify-center gap-2 text-white font-bold sig-btn" onClick={() => addElement('schoolRecord')}><IconPlus className='plus-logo'/>Añadir educación profesional</Button>

                        </div>

                        <div className='w-full flex justify-end gap-3'>
                            <button className="font-semibold btnEdit bg-gray-300 text-black border border-black" onClick={handleClose}>Cancelar</button>
                            <button className="font-semibold btnEdit text-black" onClick={handleSubmit}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDescModal