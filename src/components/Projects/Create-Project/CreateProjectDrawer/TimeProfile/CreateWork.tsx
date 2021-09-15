import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListIcon from '@material-ui/icons/List';
import { Grid, ListItemIcon, makeStyles, Typography } from '@material-ui/core';
import InputText from '../../../../Utills/Inputs/InputText';
import SelectDropdown from '../../../../Utills/Inputs/SelectDropdown';
import { Close } from '@material-ui/icons';
import colors from '../../../../../assets/colors';
import InputSwitch from '../../../../Utills/Inputs/InputSwitch'

const CreateWork = () => {
  const [open, setOpen] = React.useState(false);

  const classes = useStyle()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.btn}
        onClick={handleClickOpen}
      >
        Add new work
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="customized-dialog-title" className="customized-title" >
          <Typography className={classes.headerTitle}>
            Add work
          </Typography>
          <div className={classes.headerAction} onClick={handleClose}>
            <Close/>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container className={classes.body}>
            <Grid item xs={12}>
              <InputText placeholder="Select/Add work"/>
            </Grid>

            <Grid item xs={12} className={classes.rolesWrapper}>
              <SelectDropdown title="Role"/>
            </Grid>

            <Grid item xs={12} className={classes.rolesWrapper}>
              <InputSwitch label="Add time"/>
            </Grid>

            <Grid item xs={12} className={classes.rolesWrapper}>
              <InputSwitch label="Quantity"/>
            </Grid>

            <Grid item xs={12} className={classes.rolesWrapper}>
              <InputSwitch label="Comment"/>
            </Grid>

            <Grid item xs={12} className={classes.rolesWrapper}>
              <InputSwitch label="Photo"/>
            </Grid>


          </Grid>
          {/* <InputText/>
          <SelectDropdown title="Role"/> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateWork

const useStyle = makeStyles({
  btn: {
      fontSize: 12,
      fontWeight: 'bold',
      fontStyle: 'normal'
  },
  body: {
    // maxWidth: 500,
    // width: 500    
  },
  meta: {
    marginTop: 10
  },
  titleWrapper: {
    
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 500
  },
  headerAction: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 500,
    color: colors.primary
  },
  actionButton: {
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'normal'
  },
  rolesWrapper: {
    marginTop: 10
  }

})