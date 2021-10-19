import { makeStyles, Typography } from "@material-ui/core"
import { MoreVert, PersonAddOutlined } from "@material-ui/icons"
import { useState } from "react"
import { BiTask } from "react-icons/bi"
import { BsArrow90DegLeft, BsArrow90DegRight } from "react-icons/bs"
import OutsideClickHandler from "react-outside-click-handler"
import colors from "../../../assets/colors"

const ChatMessageMenu = () => {
    const classes = useStyles()
    const [show, setShow] = useState(false)

    const handleToggle = () => {
        setShow(!show)
    }

    return (
        <div className="dropdown">
            <MoreVert className={classes.moreIcon} onClick={handleToggle} />
            {show && (
                <OutsideClickHandler onOutsideClick={handleToggle}>
                    <div className={`dropdown-content ${classes.dropdownContent}`}>
                        <div className={`${classes.menuWrapper} dropdown-menu`}>
                            <BsArrow90DegLeft className={classes.menuIcon} />
                            <Typography className={classes.menuText}>
                                Reply to chat
                            </Typography>
                        </div>
                        <div className={`${classes.menuWrapper} dropdown-menu`}>
                            <BsArrow90DegRight className={classes.menuIcon} />
                            <Typography className={classes.menuText}>
                                Forward message
                            </Typography>
                        </div>

                        <hr className={classes.break} />

                        <div className={`${classes.menuWrapper} dropdown-menu`}>
                            <BiTask className={classes.menuIcon} />
                            <Typography className={classes.menuText}>
                                Mark as task
                            </Typography>
                        </div>

                        <hr className={classes.break} />

                        <div className={`${`${classes.menuWrapper} dropdown-menu`}`}>
                            <PersonAddOutlined className={classes.menuIcon} />
                            <Typography className={`${classes.menuText}`}>
                                Add temporary member
                            </Typography>
                        </div>
                    </div>
                </OutsideClickHandler>
            )
            }
        </div>
    )
}

export default ChatMessageMenu

const useStyles = makeStyles({
    moreIcon: {
        fontSize: 24,
        color: colors.textPrimary
    },
    dropdownContent: {
        minWidth: 200,
        display: 'block'
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