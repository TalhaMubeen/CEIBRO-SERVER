import { Badge, Button, Grid, makeStyles, Typography } from '@material-ui/core'
import { ContactPhone } from '@material-ui/icons'
import colors from '../../assets/colors'
import InputInvite from '../Profile/InputInvite'
import TextField from '../Utills/Inputs/TextField'

const SmartMenuBar = () => {
    const classes = useStyles()

    return (
        <Grid container >
            <Grid item xs={12} md={4}>
                <div className={`${classes.connectionWrapper} ongoing-badge`}>
                    <ContactPhone className={classes.connectionIcon}/>
                    <Typography className={classes.connectionTitle}>
                        My connections
                    </Typography>
                    <Badge badgeContent={4} color="primary">
                    </Badge>
                    <Button size="small" color="primary" variant="outlined">View</Button>
                </div>
            </Grid>

            <Grid item xs={12} md={3} className={classes.invitationOuterWrapper}>
                <div className={`${classes.connectionWrapper} ongoing-badge`}>
                    <Typography className={classes.connectionTitle}>
                        Invitations
                    </Typography>
                    <Badge badgeContent={4} color="primary">
                    </Badge>
                    <Button size="small" color="primary" variant="outlined">View</Button>
                </div>
            </Grid>

            <Grid item xs={12} md={5}>
                <div className={classes.searchWrapper}>
                <InputInvite/>
                    {/* <TextField
                        id="input-with-icon-adornment"
                        placeholder="Search"
                        className={classes.searchInput}
                        size="small"
                        inputProps={{
                            className: classes.searchInput
                        }}
                    />
                    <Button size="small" color="primary" variant="contained">Invite</Button> */}
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
        padding: "10px 2px"
    },
    connectionTitle: {
        fontSize: 14,
        color: colors.black
    },
    connectionIcon: {
        width: 18,
        color: colors.primary
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