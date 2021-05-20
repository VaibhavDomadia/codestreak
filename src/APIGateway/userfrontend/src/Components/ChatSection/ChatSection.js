import React, { useState } from 'react';
import { getDateAndTime } from '../../util/helper';
import './ChatSection.css';
import ChatIcon from '../../Icons/comment-dots-regular.svg';
import DeleteIcon from '../../Icons/trash-solid.svg';

const ChatSection = (props) => {
    const { chats, onMessage, onMessageDelete } = props;
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    }

    const onEnter = (event) => {
        if(event.keyCode === 13) {
            onSubmit();
        }
    }

    const onSubmit = () => {
        onMessage(value);
        setValue('');
    }

    const onDelete = (messageID) => {
        onMessageDelete(messageID);
    }

    return (
        <div className='ChatSection-Container'>
            <div className='ChatSection-Header'>
                <img src={ChatIcon} alt='Chat' className='ChatSection-Header-Icon'></img>
                <div className='ChatSection-Header-Title'>
                    Chat:
                </div>
            </div>
            <div className='Chats-Container'>
                {
                    chats.map(chat => {
                        let style = {};
                        if(chat.sentBy !== 'user') {
                            style.justifyItems = 'end';
                        }
                        return (
                            <div key={chat._id} className='Chat-Box' style={style}>
                                <div className='Chat-Control-Container'>
                                    <div className='Chat-Container'>
                                        <div className='Chat-Message'>
                                            {chat.message}
                                        </div>
                                        <div className='Chat-CreatedAt'>
                                            {getDateAndTime(chat.createdAt)}
                                        </div>
                                    </div>
                                    {
                                        chat.sentBy === 'user' ?
                                        <button className='Chat-Control-Delete' onClick={(event) => onDelete(chat._id, event)}>
                                            <img src={DeleteIcon} className='Chat-Control-Delete-Icon' alt='Delete'></img>
                                        </button> :
                                        null
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='ChatSection-Write'>
                <input type='text' value={value} onChange={onChange} placeholder='Enter Your Message' className='ChatSection-Input' onKeyDown={onEnter}></input>
                <button className='ChatSection-SendButton' onClick={onSubmit}>Send</button>
            </div>
        </div>
    )
}

export default ChatSection;