import React from 'react'
import ChatListChip from '../Utills/ChatChip/ChatListChip'
import { CHAT_LIST } from '../../constants/chat.constants'

const ChatList = () => {
    return (
        <div>
            {CHAT_LIST && CHAT_LIST.map((chat, index) =>  {
                    return <ChatListChip chat={chat} key={index}/>
                }
            )}
        </div>
    )
}

export default ChatList
