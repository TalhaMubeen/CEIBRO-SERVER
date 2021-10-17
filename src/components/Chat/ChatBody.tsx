import { Grid, makeStyles } from "@material-ui/core"
import { ChatMessageInterface } from "../../constants/interfaces/chat.interface"
import MessageChat from '../Utills/ChatChip/MessageChat'

interface ChatBodyInt {
    messages: ChatMessageInterface[]
}

const ChatBody: React.FC<ChatBodyInt> = (props) => {
    const { messages } = props
    const classes = useStyles()


    return (
        <Grid className={classes.wrapper} id="chatBox" container >
            {messages && messages.map((message: ChatMessageInterface) => {
                return <MessageChat message={message} />
            })}   
        </Grid>
    )
}

export default ChatBody

const useStyles = makeStyles({
     wrapper: {
         height: 'calc(100vh - 271px)',
         overflowY: 'scroll',
     }
})