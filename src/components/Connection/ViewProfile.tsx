import { Avatar, Button, Dialog, DialogContent, DialogTitle, Grid, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import * as React from 'react';
import colors from '../../assets/colors';
import NameAvatar from '../Utills/Others/NameAvatar';
import { useDispatch } from 'react-redux'
import taskActions from '../../redux/action/task.action'
interface IViewProfileProps {
}

const ViewProfile: React.FunctionComponent<IViewProfileProps> = (props) => {
    
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const dispatch = useDispatch()

    const handleToggle = () => {
        setOpen(!open)
    }

    const openTaskDrawer = () => {
        dispatch(taskActions.openDrawer())
    }


    const user = {
        image: "https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg",
        name: 'Kristo',
        surname: 'Vaughn',
        email: 'abc123@gmail.com',
        contact: '+372 5679 8908',
        company: 'My company Ltd.',
        vat: '1324343554',
        location: 'Vesse 12, Tallinn, Harjumaa 12345'
    }

    return (
        <>
            <Button onClick={handleToggle} className={classes.btn} variant="outlined" size="medium" color="primary">View profile</Button>
            <Dialog onClose={handleToggle} open={open}>
                <DialogTitle>
                    <div className={classes.titleWrapper}>
                        <div className={classes.imgWrapper}>
                            {user.image? <img className={classes.img} src={user.image} />: <NameAvatar name={user.name} />}
                        </div>
                        <Clear onClick={handleToggle} className={classes.close} />
                    </div>
                </DialogTitle>
                <DialogContent className={classes.wrapper}>
                    <Grid container>
                        <Grid item xs={12} className={classes.detailRow}>
                            <div>
                                <Typography className={classes.title}>Name</Typography>
                                <Typography className={classes.value}>{user.name}</Typography>
                            </div>
                            <div>
                                <Typography className={classes.title}>Surname</Typography>
                                <Typography className={classes.value}>{user.surname}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} className={classes.detailRow}>
                           <div>
                                <Typography className={classes.title}>Email</Typography>
                                <Typography className={classes.value}><a className={classes.email} href="#">{user.email}</a></Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} className={classes.detailRow}>
                           <div>
                                <Typography className={classes.title}>Contact</Typography>
                                <Typography className={classes.value}>{user.contact}</Typography>
                            </div>
                        </Grid>
                        <br/><br/>

                        <Grid item xs={12} className={`${classes.companyRow} ${classes.detailRow}`}>
                            <div>
                                <Typography className={classes.title}>Company</Typography>
                                <Typography className={classes.value}>{user.company}</Typography>
                            </div>
                            <div>
                                <Typography className={classes.title}>VAT</Typography>
                                <Typography className={classes.value}>{user.vat}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} className={classes.detailRow}>
                           <div>
                                <Typography className={classes.title}>Location</Typography>
                                <Typography className={classes.value}>{user.location}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} className={classes.detailRow}>
                           <div>
                                <Typography className={classes.title}>Company contact number</Typography>
                                <Typography className={classes.value}>{user.contact}</Typography>
                            </div>
                        </Grid>

                        <Grid item xs={12} className={classes.btnWrapper}>
                            <Button className={classes.btn} variant="contained" size="medium" color="primary">Start conversation</Button>
                            <Button className={classes.btn} variant="contained" size="medium" color="primary" onClick={openTaskDrawer}>Create task</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
  )
};

export default ViewProfile;

const useStyles = makeStyles({
    titleWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 10,
        alignItems: 'center',
    },
    wrapper: {
        width: 300
    },
    imgWrapper: {
        maxWidth: 80,
        maxHeight: 80
    },
    img: {
        width: '100%'
    },
    close: {
        color: colors.primary,
        cursor: 'pointer'
    },
    btn: {
        fontSize: 12,
        fontWeight: 'bold',
        ['@media (max-width:960px)']: {
            width: '100%',
            marginTop: 10
        }
    },
    btnWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: `25px 0px`,
        ['@media (max-width:960px)']: {
            flexDirection: 'column'
        }
    },
    detailRow: {
        display: 'flex',
        paddingTop: 10,
        gap: 30
    },
    title: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey
    },
    value: {
        fontSize: 14,
        fontWeight: 500
    },
    companyRow: {
        paddingTop: 40
    },
    email: {
        color: colors.textPrimary
    }
})
