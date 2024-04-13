import React from 'react'
import { 
    IconEye,
  } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const ChatItem = ({ name, message, time, img, id, readen }) => {

    return (
        <Link to={'/chat/'+id} className='list-chats'>
            <div className='img-chat-grid'>
            <img src={img} alt="User Img" className="border-black border rounded-full p-1" />
            </div>

            <div className='name-chat-grid'>
                <div style={{ width: '80%', height: '100%', display: 'flex', alignItems: 'end' }}>
                    <p className='text-md'><strong>{name}</strong></p>
                </div>

                <div style={{ width: '20%', height: '100%', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                    {
                        readen ? <IconEye color='#9C71D9'/> : <></>
                    }
                </div>

            </div>
            
            <div className='message-chat-grid'>
            <div style={{ width: '80%', height: '100%', display: 'flex', alignItems: 'center' }}>
                    <p className='text-md'>{message}</p>
                </div>

                <div style={{ width: '20%', height: '100%', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <p className='text-xs'>{time}</p>
                </div>
            </div>
        </Link>
    )
}

export default ChatItem