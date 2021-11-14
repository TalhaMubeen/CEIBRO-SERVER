import React from 'react'
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, makeStyles, TextField } from '@material-ui/core'
import { BiTrash } from 'react-icons/bi'
import colors from '../../assets/colors'
import { Create, Delete } from '@material-ui/icons'
import Requests from './Requests'
import { useMediaQuery } from 'react-responsive'

const Dashboard = () => {

    const classes = useStyles()

    const image = "https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg"

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)'})

    const ActionBtns = () => (
        <Grid item xs={12} className={classes.rowWrapper}>
            <Button variant="contained" color="primary" size="medium">Update</Button>
            <Button variant="text" className={classes.delete} size="medium">
                <BiTrash className={classes.deleteIcon} /> Delete Account
            </Button>
        </Grid>
    )

    return (
        <Grid container>
        <Grid item xs={12} md={2} className={classes.imageWrapper}>
            <div className={classes.imageInnerWrapper}>
                <img src={image} className={classes.userImage}  />
                <div className={classes.imageIconWrapper}>
                    <Create className={classes.editPic}/>
                    <Delete className={classes.trashPic} />
                </div>
            </div>
        </Grid>
        {isTabletOrMobile && <Requests/>}
        <Grid item xs={12} md={6}>
            
            <Grid container>

                <Grid item xs={12} md={6} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Name" variant="outlined" />
                </Grid>

                <Grid item xs={12} md={6} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Surname" variant="outlined" />
                </Grid>

                <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Contact email" variant="outlined" />
                </Grid>
                
                <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Contact number" variant="outlined" />
                </Grid>
                
                <Grid item xs={12} className={`${classes.rowWrapper} ${classes.passwordRow}`}>
                    <TextField type="password" fullWidth size="small" id="outlined-basic" label="Password" variant="outlined" />
                </Grid>
                
                <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField type="password" fullWidth size="small" id="outlined-basic" label="Confirm password" variant="outlined" />
                </Grid>

                {!isTabletOrMobile && <ActionBtns/>}

                <Grid item xs={12} className={classes.rowWrapper}>
                    <hr className={classes.break}/>
                </Grid>
                <Grid item xs={12} md={6} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Company" variant="outlined" />
                </Grid>

                <Grid item xs={12} md={6} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="VAT" variant="outlined" />
                </Grid>

                <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Location" variant="outlined" />
                </Grid>
                
                <Grid item xs={12} className={classes.rowWrapper}>
                    <TextField fullWidth size="small" id="outlined-basic" label="Contact number" variant="outlined" />
                </Grid>

                <Grid item xs={12} className={classes.rowWrapper}>
                    <FormGroup>
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    defaultChecked 
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />} label="Currently representing company" />
                    </FormGroup>
                </Grid>

                {isTabletOrMobile && <ActionBtns/>}

            </Grid>                    
        </Grid>
        {!isTabletOrMobile && <Requests/>}
    </Grid>
    )
}

export default Dashboard

const useStyles = makeStyles({
    rowWrapper: {
        padding: "10px 20px"
    },
    delete: {
        color: colors.btnRed,
    },
    deleteIcon: {
        fontSize: 20
    },
    break: {
        border: 0,
        borderTop: `1px solid ${colors.white}`
    },
    imageWrapper: {
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
    },
    passwordRow: {
        marginTop: 20
    },
    root: {
        color: colors.darkYellow,
        '&$checked': {
          color: colors.darkYellow,
        },
      },
    checked: {},
})
