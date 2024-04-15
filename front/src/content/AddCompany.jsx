import Swal from 'sweetalert2'
import Input from '../components/ui/Input'
import React, { useRef, useState } from 'react'
import axiosHandler from '../axiosHandler'
import Header from '../components/ui/Header'
import Button from '../components/ui/Button'
import { IconUsers, IconCamera } from '@tabler/icons-react'
import './content.css'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const disabilitiesList = [
  "Informática y tecnología",
  "Medicina y farmacia",
  "Ensamblaje",
  "Alimentación y bebidas",
  "Consultorías",
  "Fabricación",
  "Productos",
  "Servicios",
  "Educación",
  "Energía y recursos naturales",
  "Construcción",
  "Transporte y logística",
  "Entretenimiento",
  "Finanzas y seguros",
  "Telecomunicaciones",
  "Turismo y hospitalidad",
  "Publicidad y marketing",
  "Ingeniería",
  "Arte y diseño",
  "Agricultura y ganadería",
  "Medios de comunicación",
  "Automotriz",
  "Bienes raíces",
  "Ambiental",
  "Legal"
];

function AddCompany() {

    const cropperRef = useRef(null);
  
    const [picFile, setPicFile] = useState(null);  
    const [urlImage, setUrlImage] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [ formData, setFormData ] = useState({
      name: '',
      description: '',
      branches: []
    })
  
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
      const axiosData = new FormData();

      axiosData.append('name', formData.name);
      axiosData.append('description', formData.description);
      axiosData.append('branches', formData.branches);

      axiosData.append( "pic", picFile );
      
      console.log(axiosData);

      axiosHandler.POST('enterprise', axiosData)
        .then(data => window.location.href = '/joincompany')
        .catch({  })
    }

    const [ showInputOther, setShowInputOther ] = useState(false);


    const handleChangeCB = (e) => {
      const { name, value, type, checked } = e.target;
  
      if(type === "checkbox"){
  
        if(checked){
          const disa = [...formData.branches]
  
          disa.push(name);
          setFormData({...formData, "branches": disa});
        }else{
          const disa = formData.branches.filter(item => item !== name);
          setFormData({...formData, "branches": disa});
        }
  
      }else if(type === "text"){
  
        const disa = formData.branches.filter(item => disabilitiesList.indexOf(item) > -1);
  
        disa.push(value);
        setFormData({...formData, "branches": disa});
  
      }
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

    return(
        <div className='content bg-pink'>
          <Header />
          <div className='w-full pt-20 pb-8 text-center flex items-center justify-center'>
            <h1 className='text-xl font-bold mr-1'>Coloca los datos de tu empresa</h1>
            <IconUsers className='h-6 w-6 mr-2  '/>         
          </div>  
          <div className='ml-2 mb-2'>
            <p className='text-lg font-bold ml-6'>Nombre de la empresa:</p>
          </div>
          <div className='flex justify-center'>
            <input type='text' placeholder = 'Nombre' className='w-80 text-black font-normal text-left border border-black p-2 mr-3 mb-3 login-input' onChange={ (e) => setFormData({...formData, ['name']: e.target.value}) } />            
          </div>   
          <p className='text-black text-lg font-bold ml-2 mb-2 mt-4 ml-6 mt-8'>Logotipo de la empresa</p>
          <div className='dnd text-center w-3/4 m-auto mb-4' style={{ cursor: 'pointer' }} onClick={(e) => selectFile("input-file-pic")} >
                          
            {
              picFile === null
              ? 
              <>
                <Input accept="image/*" id='input-file-pic' variantI="file" label="Importa o selecciona el logotipo de tu empresa" type="file" extraL="text-black text-xl" extraI="text-xs hidden" onChange={handleFileChange}/>
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
          <div className='ml-2'>
              <p className='text-lg font-bold mb-3 ml-6 mt-8'>Descripción de tu empresa:</p>
          </div>                 
           <div className='flex justify-center'>
              <textarea placeholder='Cuentanos de tu empresa...' className='w-80 h-24 text-black font-normal text-left border border-black text-area p-2' onChange={ (e) => setFormData({...formData, ['description']: e.target.value}) }></textarea> 
           </div>   
           <div className='ml-2 mt-3 signup-card rounded-2xl'>
              <p className='text-black text-lg font-bold mb-2 ml-6 mt-8'>¿De qué rubro es tu empresa?</p>
           </div>   
           <div className='ml-9'>
                {
                  disabilitiesList.map(d => <Input key={"key-"+d} id={d} name={d} variantI="check" variantL="check" label={d} type="checkbox" extraL="text-black" onChange={handleChangeCB}/>)
                }

              <Input id="Otra" name="Otra" variantI="check" variantL="check" label="Otra" type="checkbox" extraL="text-black" onChange={(e) => setShowInputOther(e.target.checked)}/>
              {
                showInputOther
                ? <Input id="Other" variantI="base" label="¿Que rubro es? (Si es mas de uno separalos por comas)" type="text" extraL="text-black" onChange={handleChangeCB}/> 
                : <></>
              }
            </div> 
            <div className='flex justify-center mb-3 mt-2'>
              <Button variant="btnLink" extra="text-white sig-btn" onClick={handleSubmit}>Crear</Button>  
            </div> 

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
 
 function formatFileSize(size) {
  if (size === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(size) / Math.log(k));

  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}


 export default AddCompany