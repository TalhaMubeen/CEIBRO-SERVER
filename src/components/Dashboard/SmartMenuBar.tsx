import { Badge, Button, Grid, makeStyles, Typography } from '@material-ui/core'
import { ContactPhone } from '@material-ui/icons'
import colors from '../../assets/colors'
import InputInvite from '../Profile/InputInvite'
import { MdInsertInvitation } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router'

const SmartMenuBar = () => {
    const classes = useStyles()
    const history = useHistory()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)'})

    const goToConnections = () => {
        history.push('connections')
    }

    return (
        <Grid container >
            <Grid item xs={12} md={4}>
                <div className={`${classes.connectionWrapper} ongoing-badge`}>
                    
                    <Typography className={classes.connectionTitle}>
                        <ContactPhone className={classes.connectionIcon}/>
                         <span className={classes.marginLeft}>My connections</span>
                         {isTabletOrMobile && 
                            <Badge badgeContent={4} color="primary">
                            </Badge>
                         }
                    </Typography>
                    {!isTabletOrMobile && 
                        <Badge badgeContent={4} color="primary">
                        </Badge>
                    }
                    <Button size="small" color="primary" variant="outlined" onClick={goToConnections}>View</Button>
                </div>
            </Grid>

            <Grid item xs={12} md={3} className={classes.invitationOuterWrapper}>
                <div className={`${classes.connectionWrapper} ongoing-badge`}>
                    <Typography className={classes.connectionTitle}>
                        {isTabletOrMobile && 
                            <MdInsertInvitation className={classes.inviteIcon} />
                        }
                        <span className={classes.marginLeft}>Invitations</span>

                        {isTabletOrMobile && 
                            <Badge badgeContent={4} color="error">
                            </Badge>
                        }
                    </Typography>
                    {!isTabletOrMobile && <Badge badgeContent={4} color="error">
                    </Badge>}
                    <Button size="small" color="primary" variant="outlined">View</Button>
                </div>
            </Grid>

            <Grid item xs={12} md={5}>
                <div className={classes.searchWrapper}>
                    <InputInvite/>
                </div>
            </Grid>
        </Grid>
    )
}

export default SmartMenuBar

const useStyles = makeStyles({
    connectionWrapper: {
        background: colors.white,
        display: 'flex',
        justifyContent: "space-evenly",
        alignItems: 'center',
        padding: "10px 2px",
        ['@media (max-width:960px)']: {
            justifyContent: "space-between",
            padding: "10px 10px"
        }
    },
    marginLeft: {
        paddingRight: 20
    },
    connectionTitle: {
        fontSize: 14,
        color: colors.black,
        display: 'flex',
        alignItems: 'center'
    },
    connectionIcon: {
        width: 18,
        color: colors.primary,
        paddingRight: 10
    },
    inviteIcon: {
        fontSize: 18,
        color: colors.primary,
        paddingRight: 10
    },
    invitationOuterWrapper: {
        paddingLeft: 10,
        ['@media (max-width:960px)']: {
            // marginLeft: 0,
            padding: 0
        }
    },
    searchInput: {
        height: 10,
        width: '100%'
    },
    searchWrapper: {
        padding: 6,
        background: colors.white,
        display: 'flex',
        alignItems: 'center'
    }
})