import { Link, useParams } from 'react-router-dom'
import { IconUserFilled, IconLock } from '@tabler/icons-react'
import Logo from '../assets/Logo Joby.svg' 
import './content.css'
/* IMPORTACION DE COMPONENTES REUTILIZABLES */
import Button from '../components/ui/Button'
import './content.css'
import { useState } from 'react'
import axiosHandler from '../axiosHandler'
import Swal from 'sweetalert2'

const Forgot = () => {

    const { state } = useParams();
    const [ value, setValue ] = useState('');
    const [formData, setFormData] = useState({
        email: state,
        newPassword: "",
        passkey: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        switch(state){
            case "1": 

                    if(value.length > 0){
                        axiosHandler.POST('login/forgot/1', {email: value})
                        .then(data => {
                            console.log(data);
                            Swal.fire({
                                icon: 'info',
                                title: "Si el correo es correcto se te enviara un codigo de recuperación",
                                confirmButtonText: "Aceptar",
                                confirmButtonColor: "#9C71D9"
                            }).then(() => {
                                window.location.href = "/forgot/"+value
                            })
                        }).catch(err => {});
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: "Debes ingresar un correo",
                            confirmButtonText: "Aceptar",
                            confirmButtonColor: "#9C71D9"
                        })
                    }

                    
                break;

            default:
                if(formData.newPassword.length > 0 && formData.passkey.length > 0){
                    if(formData.newPassword.length < 7){
                        Swal.fire({
                            icon: 'error',
                            title: "La contraseña debe tener al menos 7 caracteres",
                            confirmButtonText: "Aceptar",
                            confirmButtonColor: "#9C71D9"
                        })
                    }else{
                        axiosHandler.POST('login/forgot/2', formData)
                        .then(data => {
                            Swal.fire({
                                icon: 'info',
                                title: "Contraseña actualizada con exito",
                                confirmButtonText: "Aceptar",
                                confirmButtonColor: "#9C71D9"
                            }).then(() => {
                                window.location.href = "/login"
                            })
                        }).catch(err => {});
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: "Debes ingresar los valores",
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "#9C71D9"
                    })
                }
        }
    }

    const handleChange = (e) => {
        const { value } = e.target;

        setValue(value);
    }

    const handleChange2 = (e) => {
        const { name, value } = e.target;

        setFormData({...formData, [name]: value});
    }


    return state === "1" ? (
        <div className='login'>
            <div className="logo flex justify-center p-5 py-10">
              <Link to="/">
                <img src={Logo} alt="logo" className='w-40'/>
              </Link>
            </div>
            <div className='bg-white login-content p-14'>
              <div className='pb-10'>
                <h1 className='text-black uppercase text-4xl text-center pt-2 pb-3 '>Recuperar contraseña 1/2</h1>
                <div style={{width: '100%', display: "flex", justifyContent: 'center'}}>
                    <Link to="/login" className='text-sm font-semibold px-2'><u>Volver al inicio de sesión</u></Link>
                </div>
              </div>
              <form onSubmit={handleSubmit} method="post" className='flex-column justify-center'>
                <div className='flex-column pb-10'>
                    <div className='w-full text-left '>
                      <label htmlFor="password" className='font-semibold'>Correo</label>
                    </div>
                    <div className='flex justify-center'>
                        <div className='bg-black p-3 rounded-full z-10'>
                            <IconUserFilled className='login-icon'/>
                        </div>
                        <input id="email" name="email" type='email' className='w-full text-black font-normal text-right border border-black -ml-8  my-4 p-2 login-input' onChange={handleChange}/>
                    </div>
                  
                
                </div>
                <div className='flex-column items-center'>
                  <Button variant="login">Enviar correo</Button>
                </div>
              </form>
            </div>
        </div>
      ) : <div className='login'>
            <div className="logo flex justify-center p-5 py-10">
                <Link to="/">
                <img src={Logo} alt="logo" className='w-40'/>
                </Link>
            </div>
            <div className='bg-white login-content p-14'>
                <div className='pb-10'>
                <h1 className='text-black uppercase text-4xl text-center pt-2 pb-3 '>Recuperar contraseña 2/2</h1>
                <div style={{width: '100%', display: "flex", justifyContent: 'center'}}>
                    <Link to="/forgot/1" className='text-sm font-semibold px-2'><u>Volver a ingresar correo</u></Link>
                </div>
                </div>
                <form onSubmit={handleSubmit} method="post" className='flex-column justify-center'>
                <div className='flex-column pb-10'>
                    
                    

                    <div className='mt-4'>
                        <div className='w-full text-left '>
                        <label htmlFor="passkey" className='font-semibold'>Código</label>
                        </div>
                        <div className='flex'>

                            <input id='passkey' name="passkey" type="text" className='w-full text-black font-normal text-left border border-black login-input -mr-8 my-4 p-2' onChange={handleChange2}/>
                        
                        </div>
                    </div>

                    <div className='mt-4'>
                        <div className='w-full text-left '>
                        <label htmlFor="newPassword" className='font-semibold'>Nueva contraseña</label>
                        </div>
                        <div className='flex'>

                            <input id='newPassword' name="newPassword" type="text" className='w-full text-black font-normal text-left border border-black login-input -mr-8 my-4 p-2' onChange={handleChange2}/>
                        
                        </div>
                    </div>
                    
                
                </div>
                <div className='flex-column items-center'>
                    <Button variant="login">Recuperar contraseña</Button>
                </div>
                </form>
            </div>
        </div>
}

export default Forgot