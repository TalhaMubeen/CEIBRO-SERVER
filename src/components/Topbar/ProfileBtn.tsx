import { Avatar, Badge, Button, makeStyles, Typography } from '@material-ui/core'
import { ContactPhone, Create, PermContactCalendar, PersonAdd } from '@material-ui/icons'
import React, { useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import OutsideClickHandler from 'react-outside-click-handler'
import { useHistory } from 'react-router'
import colors from '../../assets/colors'
import './ProfileBtn.css'

const ProfileBtn = () => {

    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const image = "https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg"

    const history = useHistory()

    const handleProfileClick = () => {
        handleOutsideClick()
        history.push('/profile')
    }

    const handleConnectionClick = () => {
        handleOutsideClick()
        history.push('/connections')
    }

    const toggle = () => {
        setOpen(!open)   
    }

    const handleOutsideClick = () => {
        setOpen(false)
    }


    return (
        <div className="dropdown" style={{ float: "right" }}>
                <Button onClick={toggle} style={{ padding: 0 }} aria-controls="simple-menu" aria-haspopup="true">
                    <Avatar variant="square" alt="Cindy Baker" className={classes.small} src={image}></Avatar>
                </Button>
                {open && 
                    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                        <div className="dropdown-content" id="dropdownContent">
                            <div onClick={handleProfileClick} className={`${classes.menuItem} dropdown-menu`}>
                                <div className={classes.menuText}>
                                    <Typography>
                                        IIJA Nikojlave
                                    </Typography>
                                    <Typography className={classes.subMenuText}>
                                        Company
                                    </Typography>
                                </div>
                                <div className={classes.menuAction}>
                                    <Create className={classes.createIcon} />
                                </div>
                            </div>

                            <hr className={classes.break} />


                            <div className={`${classes.menuItem} dropdown-menu`} onClick={handleConnectionClick}>
                                <div className={classes.smallMenuText} >
                                    <PermContactCalendar className={classes.smallMenuIcon} />
                                    <Typography className={classes.smallText}>
                                        My connections
                                    </Typography>
                                </div>
                                <div className={`${classes.menuAction} ongoing-badge`}>
                                    <Badge color="primary" badgeContent={23}>
                                    </Badge>
                                </div>
                            </div>


                            <div className={`${classes.menuItem} dropdown-menu`}>
                                <div className={classes.smallMenuText}>
                                    <PersonAdd className={classes.smallMenuIcon} />
                                    <Typography className={classes.smallText}>
                                        Invitations
                                    </Typography>
                                </div>
                                <div className={`${classes.menuAction} rejected-badge`}>
                                    <Badge color="primary" badgeContent={23}>
                                    </Badge>
                                </div>
                            </div>


                            <hr className={classes.break} />


                            <div className={`${classes.menuItem} dropdown-menu`}>
                                <div className={classes.smallMenuText}>
                                    <BiLogOut className={classes.smallMenuIcon} />
                                    <Typography className={classes.smallText}>
                                        Logout
                                    </Typography>
                                </div>
                            </div>

                        </div>
                    </OutsideClickHandler>
                }
            </div>
    )
}

export default ProfileBtn

const useStyles = makeStyles(theme => ({
    small: {
        width: theme.spacing(5),
        height: theme.spacing(5)
    },
    menuItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 7
    },
    menuText: {
        fontSize: 18,
        fontWeight: 500,
        display: 'flex',
        flexDirection: 'column',
    },
    smallMenuText: {
        fontSize: 18,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center'
    },
    menuAction: {
        paddingRight: 10
    },
    createIcon: {
        fontSize: 16,
        color: colors.lightPurpuple
    },
    menuIcon: {

    },
    subMenuText: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey
    },
    break: {
        border: 0,
        borderTop: `1px solid ${colors.grey}`
    },
    smallMenuIcon: {
        fontSize: 18
    },
    smallText: {
        fontSize: 14,
        fontWeight: 500,
        color: colors.textPrimary,
        marginLeft: 5
    }

}))
