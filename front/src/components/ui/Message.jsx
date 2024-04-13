import React from 'react'

const Message = ({ mine, body, time }) => {
    return (
        <div className="notification-container">
            <div className={ mine ? "notification mine" : "notification" }>
                <div className="notiglow"></div>
                <div className="notiborderglow"></div>
                <div className="notititle"></div>
                <div className="notibody">{body}</div>
                <div className="notitime">{time}</div>
            </div>
        </div>
    )
}

export default Message