import React from 'react'
import { Button, Grid, makeStyles, TextField } from '@material-ui/core'
import { BiTrash } from 'react-icons/bi'
import colors from '../../assets/colors'
import { Create, Delete } from '@material-ui/icons'

const Dashboard = () => {

    const classes = useStyles()

    const image = "https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg"

    return (
        <Grid container>
        <Grid xs={12} md={2} className={classes.imageWrapper}>
            <div className={classes.imageInnerWrapper}>
                <img src={image} className={classes.userImage}  />
                <div className={classes.imageIconWrapper}>
                    <Create className={classes.editPic}/>
                    <Delete className={classes.trashPic} />
                </div>
            </div>
        </Grid>
        <Grid xs={12} md={6}>
            <Grid container>
                <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Username" variant="outlined" />
                </Grid>

                <Grid item xs={12} md={6} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Name" variant="outlined" />
                </Grid>

                <Grid item xs={12} md={6} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Surname" variant="outlined" />
                </Grid>

                <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Email" variant="outlined" />
                </Grid>
                
                <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Contact" variant="outlined" />
                </Grid>
                
                <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Password" variant="outlined" />
                </Grid>
                
                <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Confirm Password" variant="outlined" />
                </Grid>

                <Grid item xs={12} className={classes.rowWrapper}>
                    <Button variant="contained" color="primary" size="medium">Update</Button>
                    <Button variant="text" className={classes.delete} size="medium">
                        <BiTrash/> Delete Account
                    </Button>
                </Grid>

                <Grid item xs={12} className={classes.rowWrapper}>
                    <hr className={classes.break}/>
                </Grid>



                <Grid item xs={12} md={6} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Company" variant="outlined" />
                </Grid>

                <Grid item xs={12} md={6} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Vat" variant="outlined" />
                </Grid>

                <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Location" variant="outlined" />
                </Grid>
                
                <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Contact" variant="outlined" />
                </Grid>

            </Grid>                    
        </Grid>
        <Grid xs={12} md={4}>Connection Seciton</Grid>
    </Grid>
    )
}

export default Dashboard

const useStyles = makeStyles({
    rowWrapper: {
        padding: "10px 20px"
    },
    delete: {
        color: colors.btnRed
    },
    break: {
        border: 0,
        borderTop: `1px solid ${colors.white}`
    },
    imageWrapper: {
        padding: 20
    },
    userImage: {
        width: '100%',
        borderRadius: 5
    },
    imageInnerWrapper: {
        position: 'relative'
    },
    imageIconWrapper: {
        position: 'absolute',
        bottom: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%'
    },
    editPic: {
        background: colors.primary,
        color: colors.white,
        fontSize: 18
    },
    trashPic: {
        background: colors.btnRed,
        color: colors.white,
        fontSize: 18
    }
})
