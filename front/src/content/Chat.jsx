import React, { useEffect, useState } from 'react'
import Header from '../components/ui/Header'
import Message from '../components/ui/Message';
import { Link, useParams } from 'react-router-dom';
import { socket } from '../socket';
import { IconBrandTelegram } from '@tabler/icons-react'
import axiosHandler from '../axiosHandler';
import Swal from 'sweetalert2'
import LoaderDefault from '../components/ui/LoaderDefault';

const Chat = () => {

    const { id } = useParams();
    const session = JSON.parse( localStorage.getItem('session') );

    const [ otherUser, setOtherUser ] = useState(null);
    const [ messages, setMessages ] = useState(null);
    const [ oportunity, setOportunity ] = useState(null);

    useEffect(() => {

        socket.emit('client:joinConversations', session._id);

        axiosHandler.GET('conversations/chat/'+id+'/'+session._id)
            .then(data => {

                setMessages(data.messages);
                setOtherUser(data.other);
                setOportunity(data.oportunity);
                console.log(data);

            })
            .catch({})
    }, [id]);

    useEffect(() => {
        const textArea = document.getElementById('list-of-messages');
        textArea.scrollTop = textArea.scrollHeight;
    }, [messages])


    socket.on('server:sendedMessage', () => socket.emit('client:getMessages', id));
    socket.on('server:showMessages', (msgs) => setMessages(msgs));


    const handleSend = () => {
        const textArea = document.querySelector('#text-area-message');
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
              popup: 'colored-toast',
            },
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });

        if(textArea.value == ''){
            Toast.fire({
                title: 'No puedes mandar mensajes vacios',
                icon: 'warning'
            });
        }else{
            const message = textArea.value;

            socket.emit('client:sendMessage', {
                sender: session._id,
                conversation: id,
                message: message
            });

            textArea.value = '';
        }
    }

    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: '#9C71D9', overflow: 'hidden' }}>
            <Header/>
            <div style={{ content: '', width: '100%', height: '78px' }}></div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px 0 7.5px', flexDirection: 'column' }} >
                <p className='name-chat-user'><strong>{otherUser == null ? 'Obteniendo nombre...' : `${otherUser.name} ${otherUser.lastname}`}</strong></p>
                <p className='name-chat-user'>{otherUser == null ? 'Obteniendo nombre...' :  <><b>Vacante:</b> <Link to={'/oportunity/'+oportunity._id}><u>{oportunity.title}</u></Link> </>}</p>

            </div>

            <div style={{ width: '100%', height: 'calc(100vh - 205px)', backgroundColor: 'white', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', display: 'flex', justifyContent: 'center', alignItems: 'start', paddingTop: 20 }} >
                
                <div id='list-of-messages' style={{ overflowY: 'auto', width: '97%', height: '100%', display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column' }}>

                    {
                        messages == null
                        ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '170px' }}>
                            <LoaderDefault/>
                            <p style={{ width: '100%', textAlign:'center' }} className='text-xl'>Cargando mensajes...</p>
                          </div>
                        : messages.map((m, index) => 
                                m.label !== undefined
                                ? <React.Fragment key={'msg-'+index}>
                                    <div style={{ width: '100%', backgroundColor: '#F0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'ceter', marginTop: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                                        <p className='text-black font-bold text-sm'>{m.label}</p>                                
                                    </div>
                                    
                                    <Message key={'msg-'+index} mine={session._id === m.sender} body={m.message} time={m.time}/> 
                                </React.Fragment>
                                : <Message key={'msg-'+index} mine={session._id === m.sender} body={m.message} time={m.time}/> 
                          )
                            
                    }
                    <br/>

                </div>

            </div>

            <div style={{ width: '100%', height: '85px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', left: 0, bottom: 0, background: 'white'}}>
                <textarea id='text-area-message' className='text-area-message' placeholder='Escribe tu mensaje...'>
                </textarea>
                <button onClick={handleSend} style={{ backgroundColor: '#9C71D9', width: '70px', height: '70px', borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IconBrandTelegram size={40} color='white'/>
                </button>
            </div>
        </div>
    )
}

export default Chat;



