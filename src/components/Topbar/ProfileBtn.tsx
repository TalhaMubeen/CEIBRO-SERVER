import { Avatar, Badge, Button, makeStyles, Typography } from '@material-ui/core'
import { ContactPhone, Create, PermContactCalendar, PersonAdd } from '@material-ui/icons'
import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import { useHistory } from 'react-router'
import colors from '../../assets/colors'
import './ProfileBtn.css'

const ProfileBtn = () => {
    
    const classes = useStyles()

    const image = "https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg"

    const history = useHistory()

    const handleProfileClick = () => {
        history.push('/profile')
    }

    const handleConnectionClick = () => {
        history.push('/connections')
    }


    return (
        
        <div className="dropdown" style={{float:"right"}}>
            <Button style={{ padding: 0}} aria-controls="simple-menu" aria-haspopup="true">
                <Avatar variant="square"  alt="Cindy Baker" className={classes.small} src={image}></Avatar> 
            </Button>
            <div className="dropdown-content">
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
                        <Create className={classes.createIcon}/>
                    </div>
                </div>

                <hr className={classes.break}/>
                

                <div className={`${classes.menuItem} dropdown-menu`} onClick={handleConnectionClick}>
                    <div className={classes.smallMenuText} >
                        <PermContactCalendar className={classes.smallMenuIcon}/>
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
                            <PersonAdd className={classes.smallMenuIcon}/>
                        <Typography className={classes.smallText}>
                            Invitations
                        </Typography>
                    </div>
                    <div className={`${classes.menuAction} rejected-badge`}>
                        <Badge color="primary" badgeContent={23}>
                        </Badge>
                    </div>
                </div>


                <hr className={classes.break}/>
                

                <div className={`${classes.menuItem} dropdown-menu`}>
                    <div className={classes.smallMenuText}>
                            <BiLogOut className={classes.smallMenuIcon}/>
                        <Typography className={classes.smallText}>
                            Logout
                        </Typography>
                    </div>
                </div>



            </div>
        </div>

    )
}

export default ProfileBtn

const useStyles = makeStyles(theme => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
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
        color: colors.textPrimary
    }
    
}))
