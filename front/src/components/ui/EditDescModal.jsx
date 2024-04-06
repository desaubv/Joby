import { IconX } from '@tabler/icons-react'
import Input from './Input'
import './ui.css'

const EditDescModal = ({data, handleClose, show}) => {

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
                        <div className='my-4'>
                            <p className='font-bold'>Indica cuál es tu estatus actual!:</p>
                            <select name="" id="" className='p-3 rounded-md bg-slate-200 flex-wrap'>
                                <option value="">😄 Actualmente trabajando</option>
                                <option value="">👀 En busca de empleo</option>
                                <option value="">🔎 Abierto a nuevas oportunidades</option>
                            </select>
                        </div>
                        <div className='my-4'>
                            <Input value={data.desc !== null ? data.desc : ''} variantI="textarea" label="Tu descripción actual:" extraI="w-full h-36"/>
                        </div>
                        <div className='my-4'>
                            <Input value={data.exp !== null ? data.exp : ''} variantI="textarea" label="Tu experiencia laboral:" extraI="w-full h-36"/>
                        </div>
                        <div className='my-4'>
                            <Input value={data.disc !== null ? data.disc : '' } variantI="base" label="Tu discapacidad (si tienes):" extraI="w-full"/>
                        </div>
                        <div className='w-full flex justify-end gap-3'>
                            <button className="font-semibold btnEdit bg-gray-300 text-black border border-black" onClick={handleClose}>Cancelar</button>
                            <button className="font-semibold btnEdit text-black">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDescModal