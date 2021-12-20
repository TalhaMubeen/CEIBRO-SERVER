import { Badge, Grid, makeStyles, Typography } from "@material-ui/core"
import { Bookmark, BookmarkBorder, DockTwoTone, MoreVert } from "@material-ui/icons"
import { BsDot } from "react-icons/bs"
import colors from "../../../assets/colors"
import NameAvatar from '../Others/NameAvatar'
import ChatListMenu from './ChatListMenu'
import { ChatListInterface } from '../../../constants/interfaces/chat.interface'

interface ChatListInterfaceProps {
    chat: ChatListInterface
}

const ChatListChip: React.FC<ChatListInterfaceProps> = (props) => {
    const classes = useStyles()

    const { chat } = props
    const { bookmarked, username, lastMessage, unreadCount, lastMessageTime } = chat

    return (
        <Grid className={classes.chatListWrapper} container >
            <Grid item xs={1} className={classes.bookMarkWrapper}>
                {bookmarked? (<Bookmark className={classes.bookmarked}/>): (<BookmarkBorder/>)}
                {unreadCount > 1 && (
                    <div className={classes.dot}>
                    </div> 
                )} 
            </Grid>
            <Grid item xs={2} className={classes.avatarWrapper}>
                <NameAvatar name={username}/>
            </Grid>

            <Grid item xs={6} className={classes.messageDetailWrapper}>
                <Typography className={classes.userName}>
                   {username}
                </Typography>
                <Typography className={classes.message}>
                    {lastMessage.substr(0, 22)}
                </Typography>
            </Grid>

            <Grid item xs={2} className={classes.timeWrapper}>
                {unreadCount > 0 && (
                        <Badge badgeContent={4} color="error">
                        </Badge>
                    )
                }
                <Typography className={classes.time}>
                    {lastMessageTime}
                </Typography>
            </Grid>

            <Grid item xs={1} className={classes.timeWrapper}>
                <ChatListMenu />
            </Grid>

        </Grid>
    )
}

export default ChatListChip

const useStyles = makeStyles({
    chatListWrapper: {
        padding: 0,
        height: 70,
        border: `0.5px solid ${colors.grey}`
    },
    bookMarkWrapper: {
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    dot: {
        marginTop: 15,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: `linear-gradient(180deg, #F1B740 0%, #FF7A00 100%)`
    },
    avatarWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageDetailWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    userName: {
        fontSize: 14,
        fontWeight: 500
    },
    message: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey
    },
    timeWrapper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    time: {
        fontSize: 12,
        fontWeight: 500
    },
    bookmarked: {
        color: colors.darkYellow
    }
})

