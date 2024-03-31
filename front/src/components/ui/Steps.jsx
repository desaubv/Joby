import { Link } from 'react-router-dom'
import { IconPlus, IconCamera, IconFileCv } from '@tabler/icons-react'
import Button from './Button'
import Input from './Input'
import './ui.css'

export function Step1() {
  return (
    <div className='p-7 bg-white'>
      <p className='font-normal text-black text-xs flex w-full justify-end pb-2'>1/4</p>
      <div className='p-6 signup-card rounded-2xl mb-7'>
        <p className='text-black text-xl font-extrabold mb-2'>Género</p>
        <Input variantI="check" variantL="check" label="Masculino" type="checkbox" extraL="text-black"/>
        <Input variantI="check" variantL="check" label="Femenino" type="checkbox" extraL="text-black"/>
        <Input variantI="check" variantL="check" label="No binario" type="checkbox" extraL="text-black"/>
        <Input variantI="check" variantL="check" label="Prefiero no decir" type="checkbox" extraL="text-black"/>
      </div>
      <div className='p-6 signup-card rounded-2xl'>
        <p className='text-black text-xl font-extrabold mb-2'>¿Cuentas con alguno de estos tipos de discapacidad?</p>
        <Input variantI="check" variantL="check" label="Física" type="checkbox" extraL="text-black"/>
        <Input variantI="check" variantL="check" label="Sensorial" type="checkbox" extraL="text-black"/>
        <Input variantI="check" variantL="check" label="Intelectual o de desarrollo" type="checkbox" extraL="text-black"/>
        <Input variantI="check" variantL="check" label="Aprendizaje" type="checkbox" extraL="text-black"/>
        <Input variantI="check" variantL="check" label="Psicosocial o mental" type="checkbox" extraL="text-black"/>
        <Input variantI="check" variantL="check" label="Crónica" type="checkbox" extraL="text-black"/>
        <Input variantI="check" variantL="check" label="Otra" type="checkbox" extraL="text-black" extraI="text-black mb-5"/>
        <Input variantI="base" label="¿Qué discapacidad?" type="text" extraL="text-black"/>
      </div>
      <div className='pt-5'>
        <Link to='/signup'><Button variant="btnLink" extra='text-black back-btn'>Atrás</Button></Link>
        <Link to='/step2'><Button variant="btnLink" extra='text-white sig-btn'>Siguiente</Button></Link>
      </div>
    </div>
  )
}

export function Step2() {
  return (
    <div className='p-7'>
      <p className='font-normal text-black text-xs flex w-full justify-end pb-2'>2/4</p>
      <div className='p-6 signup-card rounded-2xl mb-7'>
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
      </div>
      <div className='pt-5'>
        <Link to='/step3'><Button variant="btnLink" extra='text-black omitir-btn'>Omitir</Button></Link>
        <Link to='/step1'><Button variant="btnLink" extra='text-black back-btn'>Atrás</Button></Link>
        <Link to='/step3'><Button variant="btnLink" extra='text-white sig-btn'>Siguiente</Button></Link>
      </div>
    </div>
  )
}

export function Step3() {
  return (
    <div className='p-7'>
      <p className='font-normal text-black text-xs flex w-full justify-end pb-2'>3/4</p>
      <div className='p-6 signup-card rounded-2xl mb-7'>
        <p className='text-black text-xl font-extrabold mb-2'>Elige una foto de perfil</p>
        <div className='dnd text-center w-3/4 m-auto'>
          <Input variantI="file" label="Importa o selecciona una foto para tu perfil" type="file" extraL="text-black text-xl" extraI="text-xs hidden"/>
          <div className='w-full flex justify-center mt-3'>
            <IconCamera className='w-1/5 h-auto'/>
          </div>
        </div>
      </div>
      <div className='p-6 signup-card rounded-2xl mb-7'>
        <p className='text-black text-xl font-extrabold mb-2'>Importa tu CV</p>
        <div className='dnd text-center w-3/4 m-auto'>
          <Input variantI="file" label="Importa o selecciona tu currículum vitae" type="file" extraL="text-black text-xl" extraI="text-xs hidden"/>
          <div className='w-full flex justify-center mt-3'>
            <IconFileCv className='w-1/5 h-auto'/>
          </div>
        </div>
      </div>
      <div className='pt-5'>
        <Link to='/step4'><Button variant="btnLink" extra='text-black omitir-btn'>Omitir</Button></Link>
        <Link to='/step2'><Button variant="btnLink" extra='text-black back-btn'>Atrás</Button></Link>
        <Link to='/step4'><Button variant="btnLink" extra='text-white sig-btn'>Siguiente</Button></Link>
      </div>
    </div>
  )
}

export function Step4() {
  return (
    <div className='p-7'>
      <p className='font-normal text-black h- text-xs flex w-full justify-end pb-2'>4/4</p>
      <div className='p-6 signup-card rounded-2xl mb-7'>
        <p className='text-black text-xl font-extrabold mb-2'>Descripción pública</p>
        <Input variantI="base" variantL="" label="Cuéntanos acerca de ti y qué es lo que quieres que las personas vean sobre tí" type="text" extraI="h-32 flex align-text-top" extraL="text-black text-sm font-normal"/>
      </div>
      <div className='pt-5'>
        <Link to='/step3'><Button variant="btnLink" extra='text-black back-btn'>Atrás</Button></Link>
        <Link to='/home'><Button variant="btnLink" extra="text-white sig-btn">Finalizar</Button></Link>
      </div>
    </div>
  )
}