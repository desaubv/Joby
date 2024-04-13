import React, { useEffect, useState } from 'react'
import Header from '../components/ui/Header'
import ChatItem from '../components/ui/ChatItem'
import axiosHandler from '../axiosHandler';
import '../content/Chat.css';
import LoaderDefault from '../components/ui/LoaderDefault';

const Chats = () => {

    const session = JSON.parse( localStorage.getItem('session') );
    const [ conversations, setConversations ] = useState(null);

    useEffect(() => {
        axiosHandler.GET('conversations/user/'+session._id)
        .then(data => setConversations(data))
        .catch({})
    }, [1])

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
                                img={c.pic}
                                name={c.name+' '+c.lastname}
                                message={c.lastMessage}
                                time={c.time}
                                readen={c.readen}
                            />
                        )
                    
                }



            </div>
        </div>  
    )
}

export default Chats