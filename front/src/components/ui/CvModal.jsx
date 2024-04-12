import { IconX } from '@tabler/icons-react'
import './ui.css'
import { useEffect, useState } from 'react';
import axiosHandler from '../../axiosHandler';
import { Link } from 'react-router-dom';

const CvModal = ({ handleClose, show}) => {

    const session = JSON.parse( localStorage.getItem('session') );
    const [ documents, setDocuments ] = useState([]);

    useEffect(() => {
        const getData = async() => {
            axiosHandler.GET('documents/user/'+session._id)
            .then(data => {
                console.log(data);
                setDocuments(data);
            })
            .catch({})
        }

        getData();
    }, [ session ]);

    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
            <div className='close-sidebar w-full flex justify-end p-4'>
                <IconX onClick={handleClose} />
            </div>
            <div>
                <p className='text-black text-xl font-extrabold'>Documentos</p>
                {
                    documents.length == 0
                    ? <>NOOOOOOOOOOO</>
                    : documents.map((d, index) => {
                        <p>a</p>
                    })
                }
            <button onClick={() => console.log( documents ) }>Hola</button>
            </div>
        </section>
      </div>
    );
}

export default CvModal