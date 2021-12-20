import { Grid, makeStyles } from "@material-ui/core"
import { AttachFile, EmojiEmotionsOutlined, Image, Mic, SendOutlined } from "@material-ui/icons"
import colors from "../../assets/colors"
import Picker from 'emoji-picker-react';
import { FormEvent, useState } from "react";
import OutsideClickHandler from 'react-outside-click-handler';

interface ChatFormInterface {
    handleSendClick: (a: string) => string
}

const ChatForm: React.FC<ChatFormInterface> = (props) => {

    const [open, setOpen] = useState(false)
    const [text, setText] = useState("")
    const classes = useStyles()

    const onEmojiClick = (e: any, emojiObj: any) => {
        setText(`${text}${emojiObj.emoji}`)
    }

    const toggleEmoji = () => {
        setOpen(!open)
    }

    const handleTextChange = (e: FormEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const handleSend = () => {
        if(text) {
            props.handleSendClick(text)
            setText('')
        }

    }

    return (
        <Grid className={classes.wrapper} container>
            <Grid item xs={12} className={classes.inputWrapper}>
                <input value={text} onChange={handleTextChange} type="text" placeholder="Type a message" className={`messageInput ${classes.messageInput}`} />
                <div className={classes.sendWrapper}>
                    <SendOutlined onClick={handleSend} className={classes.sendIcon} />
                </div>
            </Grid>
            <Grid item xs={12} className={classes.btnWrapper}>
                <EmojiEmotionsOutlined onClick={toggleEmoji} className={classes.btnIcon}/>
                <AttachFile className={classes.btnIcon}/>
                <Mic className={classes.btnIcon}/>
                <Image className={classes.btnIcon}/>

                {open &&
                    <OutsideClickHandler
                        onOutsideClick={toggleEmoji}
                    > 
                        <div className={classes.emojisWrapper}>
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    </OutsideClickHandler>
                }
            </Grid>
        </Grid>
    )
}

export default ChatForm

const useStyles = makeStyles({
    wrapper: {
        height: 100,
        borderTop: `1px solid ${colors.lightGrey}`,
        paddingTop: 10,
        position: 'relative'
    },
    inputWrapper: {
        height: 50,
        paddingLeft: 15,
        display: 'flex',
        borderBottom: `1px solid ${colors.lightGrey}`,
    },
    sendWrapper: {
        fontSize: 18,
        textAlign: 'center'
    },
    sendIcon: {
        background: colors.darkYellow,
        padding: 10,
        color: colors.white
    },
    messageInput: {
        width: '90%',
        height: 45,
        border: 'none',
        '&:focus': {
            border: 'none'
        },
        '&:hover': {
            border: 'none'
        },
        '&:active': {
            border: 'none'
        },
        '&:focus-visible': {
            border: 'none',
            outline: 'none'
        }
    },
    btnWrapper: {
        display: 'flex',
        paddingLeft: 20,
        gap: 20
    },
    btnIcon: {
        color: colors.textPrimary,
        fontSize: 20
    },
    emojisWrapper: {
        position: 'absolute',
        top: -250,
        left: 0
    }
})