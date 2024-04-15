import React, { useEffect, useState } from 'react'
import Header from '../components/ui/Header'
import ChatItem from '../components/ui/ChatItem'
import axiosHandler from '../axiosHandler';
import '../content/Chat.css';
import LoaderDefault from '../components/ui/LoaderDefault';
import { socket } from '../socket';

const Chats = () => {

    const session = JSON.parse( localStorage.getItem('session') );
    const [ conversations, setConversations ] = useState(null);
    const [ labels, setLabels ] = useState([]);

    useEffect(() => {

        socket.emit('client:joinConversations', session._id);

        axiosHandler.GET('conversations/user/'+session._id)
        .then(data => setConversations(data))
        .catch({});
    }, [1]);

    socket.on('server:sendedMessage', () => axiosHandler.GET('conversations/user/'+session._id)
        .then(data => setConversations(data))
        .catch({})
    );


  return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: '#9C71D952' }}>
            <Header/>

            <div style={{ content: '', width: '100%', height: '100px' }}></div>

            <div style={{ width: '100%', minHeight: 'calc(100vh - 100px)', backgroundColor: 'white', borderTopLeftRadius: '40px', borderTopRightRadius: '40px' }} >
                <p className='text-black text-xl font-extrabold mb-2 pl-5 pt-6'>Chats:</p>

                {
                    conversations == null
                    ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '170px' }}>
                        <LoaderDefault/>
                        <p style={{ width: '100%', textAlign:'center' }} className='text-xl'>Obteniendo conversaciones...</p>
                      </div>
                    : conversations.length == 0
                        ? <p style={{ width: '100%', textAlign:'center', marginTop: '200px' }} className='text-xl'>No tienes conversaciones en tu chat.</p>
                        : conversations.map((c, index) => 
                            <ChatItem
                                id={c._id}
                                key={"chat-item-"+index}
                                oportunity={c.oportunity}
                                img={c.pic}
                                name={c.name+' '+c.lastname}
                                message={c.lastMessage}
                                time={determinarFecha(c.date, c.time)}
                                readen={c.readen}
                            />
                        )
                    
                }



            </div>
        </div>  
    )
}

export default Chats;

function determinarFecha(fechaString, time) {
    const partesFecha = fechaString.split('-');
    const dia = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1;
    const anio = parseInt(partesFecha[2], 10);
    const fecha = new Date(anio, mes, dia);

    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); 

    const diferencia = (fechaActual - fecha) / (1000 * 60 * 60 * 24);

    if (diferencia === 0) {
        return time;
    } else if (diferencia === 1) {
        return 'Ayer';
    } else if (diferencia === 2) {
        return 'Anteayer';
    } else {
        return fechaString;
    }
}
