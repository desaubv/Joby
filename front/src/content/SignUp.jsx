import { Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import axiosHeader from '../axiosHandler';
import { useState } from 'react';

import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

function SignUp() {

  const [ formData, setFormData ] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confPassword: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regex.test(formData.email)){
      Swal.fire({
        title: "Correo electronico no valido",
        icon: "warning",
        confirmButtonText: "Aceptar"
      });
      return;

    }else if( formData.password.length <= 6 ){
      Swal.fire({
        title: "La contraseña debe tener al menos 7 carácteres",
        icon: "warning",
        confirmButtonText: "Aceptar"
      });
      return;

    }else if(formData.password !== formData.confPassword){
      Swal.fire({
        title: "Las contraseñas no coinciden",
        icon: "warning",
        iconColor: 'red',
        confirmButtonText: "Aceptar"
      });
      return;

    }
    
    axiosHeader.POST('login/signin/1/1', formData)
      .then(data => {
        localStorage.setItem('session', JSON.stringify(data))
        window.location.href = "/step1"
      }).catch(err => {});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData( {...formData, [name]: value} );
  }

  return (
    <div className='signup'>
      <div className='flex items-baseline justify-center'>
        <h1 className='text-white uppercase text-3xl text-center py-10'>CREA UNA CUENTA</h1>
      </div>
      <div className='bg-white signup-content p-14'>
        <div className='pb-8'>  
          <Link to="/login" className='text-sm'>¿Ya tienes cuenta? <u>Inicia sesion aqui</u></Link>
        </div>
        <form method="" className='flex flex-col justify-center' onSubmit={handleSubmit}>
          <div className='flex flex-col pb-10'>
            <Input label="Nombre(s)" variantI="input-base" type="text" name="name" onChange={handleChange} />
            <Input label="Apellido(s)" variantI="input-base" type="text" name="lastname" onChange={handleChange} />
            <Input label="Correo" variantI="input-base" type="email" name="email" onChange={handleChange} />
            <Input label="Contraseña" variantI="input-base" type="text" name="password" onChange={handleChange} />
            <Input label="Repite tu contraseña" variantI="input-base" type="password" name="confPassword" onChange={handleChange} />
          </div>
          <div className='flex flex-col items-center'>
            <Button variant="login" type='submit'>Registrarse</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
