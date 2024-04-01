import { Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

function SignUp() {
  return (
    <div className='signup'>
      <div className='flex items-baseline justify-center'>
        <h1 className='text-white uppercase text-3xl text-center py-10'>CREA UNA CUENTA</h1>
      </div>
      <div className='bg-white signup-content p-14'>
        <div className='pb-8'>  
          <Link to="/login" className='text-sm'>¿Ya tienes cuenta? Inicia sesion aqui</Link>
        </div>
        <form action="/step1" method="" className='flex flex-col justify-center'>
          <div className='flex flex-col pb-10'>
            <Input label="Nombre(s)" variantI="input-base" type="text" />
            <Input label="Apellido(s)" variantI="input-base" type="text" />
            <Input label="Correo" variantI="input-base" type="text" />
            <Input label="Contraseña" variantI="input-base" type="text" />
            <Input label="Repite tu contraseña" variantI="input-base" type="text" />
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
