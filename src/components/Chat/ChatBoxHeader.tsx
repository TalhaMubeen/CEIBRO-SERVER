import { Grid, makeStyles, Typography } from "@material-ui/core"
import { Create } from "@material-ui/icons"
import colors from "../../assets/colors"
import { ChatListInterface } from "../../constants/interfaces/chat.interface"
import NameAvatar from "../Utills/Others/NameAvatar"
import InputText from "../Utills/Inputs/InputText"
import ChatUserMenu from '../Utills/ChatChip/ChatUserMenu'

interface ChatBoxHeaderProps {
    chat: ChatListInterface
}

const ChatBoxHeader: React.FC<ChatBoxHeaderProps> = (props) => {
    
    const { chat } = props
    const { username } = chat

    const classes = useStyles()

    return (
        <Grid container className={classes.wrapper}>
            <Grid item xs={1} className={classes.editWrapper}>
                <Create className={classes.editIcon} />
            </Grid>
            <Grid item xs={2} className={classes.usernameWrapper}>
                <Typography className={classes.username}>
                    {username}
                </Typography>
            </Grid>
            <Grid item xs={4} className={classes.avatarWrapper}>
                <NameAvatar name={username}/>
            </Grid>
            <Grid item xs={4} className={classes.moreWrapper}>
                <InputText placeholder="Chat Search" />
            </Grid>
            <Grid item xs={1} className={classes.moreWrapper}>
                <ChatUserMenu/>
            </Grid>
        </Grid>
    )
}

export default ChatBoxHeader

const useStyles = makeStyles({
    wrapper: {
        borderBottom: `1px solid ${colors.grey}`,
        height: 48
    },
    editIcon: {
        color: colors.textPrimary,
        fontSize: 14,
        border: `0.5px solid ${colors.lightGrey}`,
        padding: 1
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    editWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    usernameWrapper: {
        borderRight: `1px solid ${colors.grey}`,
        display: 'flex',
        alignItems: 'center',
    },
    avatarWrapper: {
        paddingLeft: 20,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    moreWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
