import { Grid, makeStyles, Typography } from "@material-ui/core"
import { AiOutlinePushpin } from "react-icons/ai"
import { BsDownload } from "react-icons/bs"
import colors from "../../../assets/colors"
import { ChatMessageInterface } from "../../../constants/interfaces/chat.interface"
import NameAvatar from "../Others/NameAvatar"
import { IoReturnUpForward } from 'react-icons/io5'
import FileView from './FileView'
import { useState } from "react"
import ChatMessageMenu from "./ChatMessageMenu"

interface MessageChatProps {
    message: ChatMessageInterface
}

const MessageChat: React.FC<MessageChatProps> = (props) => {

    const { message } = props
    const { username, time, companyName, messageText, seen, myMessage, files } = message
    const classes = useStyles()

    const [view, setView] = useState(false)

    const toggleView = () => {
        setView(!view)
    }

    const getStyles = () => {
        return {
            background: myMessage? colors.grey: colors.white,
            boxShadow: "none"
          }
    }

    return (
        <Grid 
            container 
            justifyContent={myMessage? "flex-end": "flex-start"} 
            className={classes.outerWrapper}
        >
            <Grid item xs={9}>
                <div className={classes.innerWrapper} style={getStyles()}>
                    <Grid container>
                        <Grid item xs={1}>
                            <NameAvatar name={username} />
                        </Grid>
                        <Grid item xs={10}>
                            <div className={classes.titleWrapper}>
                                <div className={classes.usernameWrapper}>
                                    <Typography className={classes.username}>
                                        {username}
                                    </Typography>

                                    <Typography className={classes.time}>
                                        {time}
                                    </Typography>
                                </div>
                                <div className={classes.projectWrapper}>
                                    <Typography className={classes.company}>
                                        Company . {companyName}
                                    </Typography>
                                </div>
                            </div>

                            <div className={classes.messageBody}>
                                <Typography className={classes.messageText}>
                                    {messageText}
                                </Typography>
                            </div>

                        </Grid>

                        {files && 
                            <Grid item xs={10} className={classes.filesWrapper}>
                                <Grid container>
                                    <Grid item xs={2} className={classes.imageWrapper}>
                                        <img src={"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"} className={classes.image}/>
                                    </Grid>
                                    <Grid item xs={2} className={classes.imageWrapper}>
                                        <img src={"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"} className={classes.image}/>
                                    </Grid>
                                    <Grid item xs={2} className={classes.imageWrapper}>
                                        <img src={"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"} className={classes.image}/>
                                    </Grid>

                                    <Grid item xs={2} className={classes.imageWrapper}>
                                        <div className={classes.fileIconWrapper}>
                                            <BsDownload className={classes.fileIcon}/>
                                        </div>
                                    </Grid>

                                    <Grid item xs={2} className={classes.imageWrapper}>
                                        <div className={classes.fileIconWrapper} onClick={toggleView}>
                                            <IoReturnUpForward className={classes.fileIcon}/>
                                        </div>
                                    </Grid>

        
                                    {view && <FileView handleClose={toggleView}/>}

                                </Grid>
                            </Grid>
                        }


                    </Grid>
                </div>
                <div className={classes.seenWrapper}>   
                    <Typography className={classes.visibility}>
                        {seen ? "Seen": "Unseen"}
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={1} className={classes.iconsWrapper}>
                <AiOutlinePushpin className={classes.pinIcon} />
                <ChatMessageMenu/>
            </Grid>
        </Grid>
    )
}

export default MessageChat

const useStyles = makeStyles({
    outerWrapper: {
        padding: 15,
    },
    innerWrapper: {
        border: `1px solid ${colors.grey}`,
        padding: 8,
        background: colors.white,
        boxShadow: `0px 0px 15px rgba(0, 0, 0, 0.1)`,
        borderRadius: 4
    },
    titleWrapper: {
    },
    usernameWrapper: {
        display: 'flex',
        alignItems: 'baseline'
    },
    projectWrapper: {

    },
    messageBody: {
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary
    },
    time: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey,
        paddingLeft: 10
    },
    company: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey
    },
    messageText: {
        fontSize: 14,
        fontWeight: 500,
        color: colors.black
    },
    iconsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10
    },
    pinIcon: {
        color: colors.textPrimary,
        fontSize: 20
    },
    moreIcon: {
        fontSize: 20,
        color: colors.textPrimary,
        marginTop: 20
    },
    seenWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    visibility: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey
    },
    filesWrapper: {
        paddingLeft: 10,
        display: 'flex',
        gap: 10
    },
    imageWrapper: {
        padding: 5
    },
    image: {
        width: '100%',
        borderRadius: 4
    },
    fileIcon: {
        fontSize: 20,
        color: colors.textPrimary
    },
    fileIconWrapper: {
        border: `1px solid ${colors.textPrimary }`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%'
    }
})