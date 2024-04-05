import { Link } from 'react-router-dom'
import { IconPlus, IconCamera, IconFileCv, IconMinus } from '@tabler/icons-react'
import Button from './Button'
import Input from './Input'
import './ui.css'
import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import axiosHandler from '../../axiosHandler'
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

const disabilitiesList = [
  "Discapacidad visual",
  "Discapacidad auditiva",
  "Discapacidad motriz",
  "Discapacidad intelectual",
  "Trastorno del espectro autista (TEA)",
  "Síndrome de Down",
  "Parálisis cerebral",
  "Discapacidad del habla",
  "Discapacidad del aprendizaje",
  "Discapacidad emocional"
];

const experience = {
  name: "",
  start: "",
  end: "",
  habilities: "",
  position: ""
}

const schoolRecord = {
  school: "",
  career: "",
  start: "",
  end: ""
}

export function Step1() {

  const session = JSON.parse( window.localStorage.getItem('session') );
 
  const [ showInputOther, setShowInputOther ] = useState(false);
  const [ formData1, setFormData1 ] = useState({
    gender: "",
    disabilities: []  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData1({...formData1, [name]: value})
  }

  const handleChangeCB = (e) => {
    const { name, value, type, checked } = e.target;

    if(type == "checkbox"){

      if(checked){
        const disa = [...formData1.disabilities]

        disa.push(name);
        setFormData1({...formData1, "disabilities": disa});
      }else{
        const disa = formData1.disabilities.filter(item => item !== name);
        setFormData1({...formData1, "disabilities": disa});
      }

    }else if(type == "text"){

      const disa = formData1.disabilities.filter(item => disabilitiesList.indexOf(item) > -1);

      disa.push(value);
      setFormData1({...formData1, "disabilities": disa});

    }
  }

  const handleSubmit = () => {
        
    if(formData1.gender == ""){
      Swal.fire({
        icon: "warning",
        title: "Debes seleccionar cual es tu genero",
        confirmButtonText: "Aceptar"
      });
      return;

    }else if(document.querySelector("#Otra").checked && document.querySelector("#Other").value == ""){
      Swal.fire({
        icon: "warning",
        title: "Debes escribir cual es tu discapacidad",
        confirmButtonText: "Aceptar"
      });
      return;

    }

    axiosHandler.POST(`login/signin/${session._id}/2`, formData1)
      .then(data => {
        localStorage.setItem('session', JSON.stringify(data));
        window.location.href = "/step2"
      }).catch(err => {})
    
  }

  return (
    <div className='p-7 bg-white'>
      <p className='font-normal text-black text-xs flex w-full justify-end pb-2'>1/4</p>
      <p className='text-black text-xl font-extrabold mb-2'>Cuéntanos un poco sobre tí</p>
      <div className='p-6 signup-card rounded-2xl mb-7'>
        <p className='text-black text-xl font-extrabold mb-2'>Género</p>
        <Input id="radio-1" value="MALE" name="gender" variantI="check" variantL="check" label="Masculino" type="radio" extraL="text-black" onChange={handleChange} />
        <Input id="radio-2" value="FEMALE" name="gender" variantI="check" variantL="check" label="Femenino" type="radio" extraL="text-black" onChange={handleChange} />
        <Input id="radio-3" value="NOT_BINARY" name="gender" variantI="check" variantL="check" label="No binario" type="radio" extraL="text-black" onChange={handleChange} />
        <Input id="radio-4" value="N/A" name="gender" variantI="check" variantL="check" label="Prefiero no decir" type="radio" extraL="text-black" onChange={handleChange} />
      </div>
      <div className='p-6 signup-card rounded-2xl'>
        <p className='text-black text-xl font-extrabold mb-2'>¿Cuentas con alguno de estos tipos de discapacidad?</p>
        
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
      <div className='pt-5'>
        <Button variant="btnLink" extra='text-white sig-btn' onClick={handleSubmit}>Siguiente</Button>
      </div>
    </div>
  )
}

export function Step2() {

  const session = JSON.parse( window.localStorage.getItem('session') );

  const [formData, setFormData] = useState({
    experience: [],
    schoolRecord: [],
    ocupation: ""
  });

  const addElement = (array) => {
    const aux = [...formData[array]];
    if(array == "experience")
      aux.push(experience);
    else if(array == "schoolRecord")
      aux.push(schoolRecord);

    setFormData({...formData, [array]: aux});
  }

  const quitElement = (array, index) => {
    const aux = [...formData[array]];
    aux.splice(index, 1);

    setFormData({...formData, [array]: aux});
  }

  const handleChange = (e, array, index) => {
    const { name, value } = e.target;

    const aux = [...formData[array]];
    aux[index][name] = value;

    aux[index] = {
      ...aux[index],
      [name]: value
    };


    setFormData({...formData, [array]: aux});
  }

  const handleSubmit = () => {
    axiosHandler.POST(`login/signin/${session._id}/3`, formData)
      .then(data => {
        localStorage.setItem('session', JSON.stringify(data));
        window.location.href = "/step3"
      }).catch(err => {})
  }

  return (
    <div className='p-7'>
      <p className='font-normal text-black text-xs flex w-full justify-end pb-2'>2/4</p>
      <p className='text-black text-xl font-extrabold mb-2'>Hablanos de tu historia profesional</p>


      <div className='p-6 signup-card rounded-2xl mb-7'>
        <p className='text-black text-xl font-extrabold mb-2'>Experiencia laboral</p>

        {
          formData.experience.map((e, index) => 
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

      <div className='p-6 signup-card rounded-2xl mb-7'>
        <p className='text-black text-xl font-extrabold mb-2'>Historia escolar</p>

        {
          formData.schoolRecord.map((e, index) => 
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

      <div className='p-6 signup-card rounded-2xl mb-7'>
        <p className='text-black text-xl font-extrabold mb-2'>Cual es tu profesión (Opcional)</p>
        <Input id="ocupation" value={formData.ocupation} placeholder="Ej. Estudiante, cocinero, mesero, programador" variantI="base" variantL="check" label="Ocupación" type="text" extraL="text-black" onChange={(e) => setFormData({...formData, ['ocupation']: e.target.value})}/>
      </div>

      {/*<div className='p-6 signup-card rounded-2xl mb-7'>
        <p className='text-black text-xl font-extrabold mb-2'>Experiencia laboral</p>
        <Input variantI="base" variantL="check" label="Nombre de la empresa" type="text" extraL="text-black"/>
        <div className='flex flex-col items-center'>
          <label htmlFor="">Estadía en la empresa</label>
          <Input variantI="base" variantL="check" type="text" extraL="text-black" extraI='w-2/3' placeholder="Ingreso (aprox)"/>
          <p>a</p>
          <Input variantI="base" variantL="check" type="text" extraL="text-black" extraI='w-2/3' placeholder="Egreso (aprox)"/>
        </div>
        <Input variantI="base" variantL="check" label="Habilidades adquiridas o utilizadas" type="" extraL="text-black"/>
        <Button variant="btnFull" extra="flex justify-center gap-2 text-white font-bold sig-btn"><IconPlus className='plus-logo'/>Añadir experiencia laboral</Button>
      </div>*/}


      <div className='pt-5'>
        <Button variant="btnLink" extra='text-white sig-btn' onClick={handleSubmit}>Siguiente</Button>
        <Link to='/step1'><Button variant="btnLink" extra='text-black back-btn'>Atrás</Button></Link>
        <Link to='/step3'><Button variant="btnLink" extra='text-black omitir-btn'>Omitir</Button></Link>
      </div>
    </div>
  )
}

export function Step3() {

  const session = JSON.parse( window.localStorage.getItem('session') );

  const cropperRef = useRef(null);

  const [picFile, setPicFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const [urlImage, setUrlImage] = useState(null);

  const [dragging, setDragging] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = [...e.dataTransfer.files];

    if(files[0] === undefined){
      Toast.fire({
        title: `No se selecciono ninguna imagen`,
        icon: "info"
      })
    }else if(files[0].type.startsWith('image/')){
      setPicFile(files[0]);
      setUrlImage(URL.createObjectURL(files[0]))
    }else if(files[0].type == "application/pdf"){
      setPdfFile(files[0])
    }else{
      Toast.fire({
        title: `El tipo de archivo no es valido, favor de ingresar archivos de imagen o pdf`,
        icon: "error"
      })
    }

  };

  const handleFileChange = (e, type) => {
    const {files} = e.target;

    if(files[0] === undefined){
      Toast.fire({
        title: `No se selecciono ninguna imagen`,
        icon: "info"
      })
    }else if(files[0].type.startsWith('image/')){
      setPicFile(files[0]);
      setUrlImage(URL.createObjectURL(files[0]))
    }else if(files[0].type == "application/pdf"){
      setPdfFile(files[0])
    }else{
      Toast.fire({
        title: `El tipo de archivo no es valido, favor de ingresar archivos de imagen o pdf`,
        icon: "error"
      })
    }

  }

  const selectFile = (id) => {
    if(urlImage === null) document.getElementById(id).click()
  }

  const handleSubmit = () => {
    const formData = new FormData();
    if(picFile !== null) formData.append( "pic", picFile );
    if(pdfFile !== null) formData.append( "cv", pdfFile );

    axiosHandler.POST(`login/signin/${session._id}/4`, formData)
      .then(data => {
        localStorage.setItem('session', JSON.stringify(data));
        window.location.href = "/step4"
      }).catch(err => {})
  }

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const canvas = cropper.getCroppedCanvas();

    canvas.toBlob((blob) => {
      const file = new File([blob], picFile.name, { type: picFile.type });
      setPicFile(file);
      setUrlImage(null);
    })
  };


  return (
    <div 
      className='p-7' 
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className='font-normal text-black text-xs flex w-full justify-end pb-2'>3/4</p>

      <div className='p-6 signup-card rounded-2xl mb-7'>


          <p className='text-black text-xl font-extrabold mb-2'>Elige una foto de perfil</p>
          <div className='dnd text-center w-3/4 m-auto' style={{ cursor: 'pointer' }} onClick={(e) => selectFile("input-file-pic")} >
                          
            {
              picFile === null
              ? 
              <>
                <Input accept="image/*" id='input-file-pic' variantI="file" label="Importa o selecciona una foto para tu perfil" type="file" extraL="text-black text-xl" extraI="text-xs hidden" onChange={handleFileChange}/>
                <div className='w-full flex justify-center mt-3'>
                  <IconCamera className='w-1/4 h-auto'/>
                </div>             
              </> 
              : 
              <>
              <Input accept="image/*" id='input-file-pic' variantI="file" label="Cambiar imagen seleccionada" type="file" extraL="text-black text-xl" extraI="text-xs hidden" onChange={handleFileChange}/>
              <div className='w-full flex justify-center mt-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <p><b>Imagen actual:</b> {picFile.name}</p>
                <p><b>Tipo:</b> {picFile.type}</p>
                <p><b>Peso:</b> {formatFileSize(picFile.size)}</p>
                <IconCamera className='w-1/6 h-auto'/>
              </div>
              </>
            }
              
          </div>
          {
            picFile !== null
            ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Button variant="btnLink" extra='text-black back-btn' onClick={() => setPicFile(null)}>Quitar foto</Button>
              </div>
            : <></>
          }
      </div>


      <div className='p-6 signup-card rounded-2xl mb-7'>
        <p className='text-black text-xl font-extrabold mb-2'>Importa tu CV</p>
        <div className='dnd text-center w-3/4 m-auto' style={{ cursor: 'pointer' }} onClick={(e) => selectFile("input-file-pdf")}>

          {
            pdfFile === null
            ? 
            <>
              <Input id='input-file-pdf' accept=".pdf" variantI="file" label="Importa o selecciona tu currículum vitae" type="file" extraL="text-black text-xl" extraI="text-xs hidden" onChange={handleFileChange}/>
              <div className='w-full flex justify-center mt-3'>
                <IconFileCv className='w-1/4 h-auto'/>
              </div>
            </>
            : 
            <>
              <Input id='input-file-pdf' accept=".pdf" variantI="file" label="Cambiar archivo seleccionado" type="file" extraL="text-black text-xl" extraI="text-xs hidden" onChange={handleFileChange}/>
              <div className='w-full flex justify-center mt-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <p><b>Archivo actual:</b> {pdfFile.name}</p>
                <p><b>Tipo:</b> {pdfFile.type}</p>
                <p><b>Peso:</b> {formatFileSize(pdfFile.size)}</p>
                <IconFileCv className='w-1/6 h-auto'/>
              </div>
            </>
          }

        </div>
        {
            pdfFile !== null
            ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Button variant="btnLink" extra='text-black back-btn' onClick={() => setPdfFile(null)}>Quitar archivo</Button>
              </div>
            : <></>
          }
      </div>


      <div className='pt-5'>
        <Button variant="btnLink" extra='text-white sig-btn' onClick={handleSubmit}>Siguiente</Button>
        <Link to='/step4'><Button variant="btnLink" extra='text-black omitir-btn'>Omitir</Button></Link>
        <Link to='/step2'><Button variant="btnLink" extra='text-black back-btn'>Atrás</Button></Link>
      </div>

      {
        dragging 
        ? <div style={{ position: 'fixed', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: "5", top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><p style={{ fontSize: 25, color: 'white' }}>Suelta el elemento aqui</p></div> 
        : <></>
      }

      {
        urlImage !== null 
        ? <div style={{ position: 'fixed', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: "5", top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column'  }}>
            <div style={{ width: '80%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                      
            <Cropper
              src={urlImage}
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={1}
              aspectRatio={1}
              guides={true}
              ref={cropperRef}
            />

            </div>
            <Button variant="btnLink" extra='text-black back-btn' onClick={onCrop}>Recortar</Button> 
            <Button variant="btnLink" extra='text-black back-btn' onClick={() => { setPicFile(null); setUrlImage(null); }}>Cancelar</Button>
          </div> 
          : <></>
        }

    </div>
  )
}

export function Step4() {
  const session = JSON.parse( window.localStorage.getItem('session') );

  const [ description, setDescription ] = useState(false);

  const handleSubmit = () => {
    axiosHandler.POST(`login/signin/${session._id}/5`, {
      description: description
    })
      .then(data => {
        localStorage.setItem('session', JSON.stringify(data));
        window.location.href = "/home"
      }).catch(err => {})
  }

  return (
    <div className='p-7'>
      <p className='font-normal text-black h- text-xs flex w-full justify-end pb-2'>4/4</p>
      <div className='p-6 signup-card rounded-2xl mb-7'>
        <p className='text-black text-xl font-extrabold mb-2'>Descripción pública</p>
        <Input onChange={(e) => setDescription(e.target.value)} variantI="base" variantL="" label="Cuéntanos acerca de ti y qué es lo que quieres que las personas vean sobre tí" type="text" extraI="h-32 flex align-text-top" extraL="text-black text-sm font-normal"/>
      </div>
      <div className='pt-5'>
        <Link to='/step3'><Button variant="btnLink" extra='text-black back-btn'>Atrás</Button></Link>
        <Button variant="btnLink" extra="text-white sig-btn" onClick={handleSubmit}>Finalizar</Button>
      </div>
    </div>
  )
}

function formatFileSize(size) {
  if (size === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(size) / Math.log(k));

  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}