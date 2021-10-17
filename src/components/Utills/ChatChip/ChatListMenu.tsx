import { makeStyles, Typography } from "@material-ui/core"
import { BookmarkBorder, Chat, Delete, MoreVert } from "@material-ui/icons"
import { BsBookmark } from "react-icons/bs"
import { GrVolumeMute } from "react-icons/gr"
import colors from "../../../assets/colors"

const ChatListMenu = () => {
    const classes = useStyles()
    return (
        <div className="dropdown">
            <MoreVert className={classes.moreIcon}/>
            <div className={`dropdown-content ${classes.dropdownContent}`}>
                <div className={`${classes.menuWrapper} dropdown-menu`}>
                    <Chat className={classes.menuIcon} />
                    <Typography className={classes.menuText}>
                        Mark unread
                    </Typography>
                </div>
                <div className={`${classes.menuWrapper} dropdown-menu`}>
                    <GrVolumeMute className={classes.menuIcon} />
                    <Typography className={classes.menuText}>
                        Mute chat
                    </Typography>
                </div>

                <hr className={classes.break}/>
 
                <div className={`${classes.menuWrapper} dropdown-menu`}>
                    <BsBookmark className={classes.menuIcon} />
                    <Typography className={classes.menuText}>
                        Add to favorites
                    </Typography>
                </div>

                <hr className={classes.break}/>

                <div className={`${`${classes.menuWrapper} dropdown-menu`} ${classes.deleteConversation}`}>
                    <Delete className={classes.menuIcon} />
                    <Typography className={`${classes.menuText} ${classes.deleteText}`}>
                        Delete conversation
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default ChatListMenu

const useStyles = makeStyles({
    moreIcon: {
        fontSize: 24,
        color: colors.textPrimary
    },
    dropdownContent: {
        minWidth: 160
    },
    menuWrapper: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'flex-start'
    },
    menuIcon: {
        fontSize: 14
    },
    menuText: {
        fontSize: 14,
        fontWeight: 500,
        marginLeft: 10,
        height: 30,
        color: colors.textPrimary
    },
    break: {
        border: 0,
        borderTop: `1px solid ${colors.grey}`
    },
    deleteConversation: {
        color: colors.btnRed
    },
    deleteText: {
        color: colors.btnRed
    }
})