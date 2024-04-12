import { IconPlus, IconCamera, IconFileCv, IconMinus } from '@tabler/icons-react'
import Swal from 'sweetalert2'
import Input from '../components/ui/Input'
import React, { useRef, useState } from 'react'
import axiosHandler from '../axiosHandler'
import Header from '../components/ui/Header'
import Button from '../components/ui/Button'
import CvModal from '../components/ui/CvModal'
import EditDescModal from '../components/ui/EditDescModal'
import { 
  IconUserCog, 
  IconSettings, 
  IconUsers, 
  IconBuilding, 
  IconDots 
} from '@tabler/icons-react'
import './content.css'

import { Document, Page } from '@react-pdf/renderer';

const disabilitiesList = [
  "Informatica",
  "Medicina y farmaceutica",
  "Ensamblaje",
  "Alimentacion y bebidas",
  "Consultorias",
  "Fabricacion",
  "Productos",
  "Servicios",
];

function AddCompany() {

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
      }else if(files[0].type === "application/pdf"){
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
      }else if(files[0].type === "application/pdf"){
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

    const [ showInputOther, setShowInputOther ] = useState(false);
    const [ formData1, setFormData1 ] = useState({
      gender: "",
      disabilities: []  
    });

    const handleChangeCB = (e) => {
      const { name, value, type, checked } = e.target;
  
      if(type === "checkbox"){
  
        if(checked){
          const disa = [...formData1.disabilities]
  
          disa.push(name);
          setFormData1({...formData1, "disabilities": disa});
        }else{
          const disa = formData1.disabilities.filter(item => item !== name);
          setFormData1({...formData1, "disabilities": disa});
        }
  
      }else if(type === "text"){
  
        const disa = formData1.disabilities.filter(item => disabilitiesList.indexOf(item) > -1);
  
        disa.push(value);
        setFormData1({...formData1, "disabilities": disa});
  
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
            <h1 className='text-1xl font-bold mr-1'>Coloca tus detalles personales</h1>
            <IconUsers className='h-6 w-6 mr-2  '/>         
          </div>  
          <div className='ml-2 mb-2'>
            <p className='text-lg font-bold'>Nombre completo:</p>
          </div>
          <div className='ml-1'>
            <input type='text' placeholder = 'Nombres' className='w-40 text-black font-normal text-left border border-black p-2 mr-3 mb-3 login-input'></input>
            <input type='text' placeholder = 'Apellidos' className='w-40 text-black font-normal text-left border border-black  p-2 mr-3 mb-3 login-input'></input>
          </div>
          <p className='text-black text-lg font-bold ml-2 mb-2 mt-4'>Logotipo de la empresa</p>
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
              <p className='text-lg font-bold mb-3'>Descripción de tu empresa:</p>
          </div>                 
           <div className='flex justify-center'>
              <textarea placeholder='Cuentanos de tu empresa...' className='w-80 h-24 text-black font-normal text-left border border-black text-area'></textarea> 
           </div>   
           <div className='ml-2 mt-3 signup-card rounded-2xl'>
              <p className='text-black text-lg font-bold mb-2'>¿De qué rubro es tu empresa?</p>
           </div>   
           <div className='ml-9'>
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
            <div className='flex justify-center mb-3 mt-2'>
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


 export default AddCompany