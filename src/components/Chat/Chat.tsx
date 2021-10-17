import { Grid, makeStyles } from '@material-ui/core'
import colors from '../../assets/colors'
import ChatSidebar from './ChatSidebar'
import ChatBoxHeader from './ChatBoxHeader'
import { CHAT_LIST, CHAT_MESSAGE } from '../../constants/chat.constants'
import ChatBody from './ChatBody'
import ChatForm from './ChatForm'
import { useRef, useState } from 'react'
import $ from "jquery";

const Chat = () => {
    const classes = useStyles()

    const [messages, setMessage] = useState(CHAT_MESSAGE)

    const sendMessage = (text: string) => {

        const today = new Date()
        const nowTime = today.getHours() % 12 + ":" + today.getMinutes() + " Pm"

        setMessage([
            ...messages,
            {
                username: 'Kristo Vunukainen',
                time: nowTime,
                companyName: 'Electrician',
                messageText: text,
                seen: false,
                myMessage: true
            }
        ])

        setTimeout(() => {
            const chatBox: any = document.getElementById('chatBox') || { scrollTop: 0, scrollHeight: 0}
            chatBox.scrollTop = chatBox.scrollHeight
    
        }, 300)

        setTimeout(() => {
            setMessage(old => [
                ...old,
                {
                    username: 'Kristo Vunukainen',
                    time: nowTime,
                    companyName: 'Electrician',
                    messageText: 'I am fine . ',
                    seen: false,
                    myMessage: false
                }
            ])
            setTimeout(() => {
                const chatBox: any = document.getElementById('chatBox') || { scrollTop: 0, scrollHeight: 0}
                chatBox.scrollTop = chatBox.scrollHeight
        
            }, 300)
        }, 6000)

        return text
    }

    return (
        <Grid container className={classes.wrapper}>
            <Grid item xs={12} md={4}>
                <ChatSidebar/>
            </Grid>
            <Grid item xs={12} md={8} style={{ background: 'white' }}>
                <ChatBoxHeader chat={CHAT_LIST[0]} />
                <ChatBody messages={messages} />
                <ChatForm handleSendClick={sendMessage}/>
            </Grid>
        </Grid>
    )
}

export default Chat

const useStyles = makeStyles({
    wrapper: { 
        background: colors.white,
        position: 'relative'
    }
})