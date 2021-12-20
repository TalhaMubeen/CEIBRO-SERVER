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
import CreateWork from './CreateWork'
import colors from '../../../../../assets/colors';
import WorkTable from './WorkProfileTable'

const MemberDialog = () => {
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
        Create new Profile
      </Button>
      <Dialog maxWidth={"md"}
       open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="customized-dialog-title" className="customized-title" >
          <Typography className={classes.headerTitle}>
            Time Profile
          </Typography>
          <div className={classes.headerAction} onClick={handleClose}>
            Close
            <Close/>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container className={classes.body}>
            <Grid item xs={12}>
              <InputText placeholder="Enter a profile layout name"/>
            </Grid>

            <Grid item xs={12} className={classes.bulkWrapper}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ListIcon />}
                className={classes.actionButton}
              >
                  Bulk edit
              </Button>

              <CreateWork/>
            </Grid>

            <Grid item xs={12}>
              <WorkTable/>
            </Grid>

            
            
            {/* <div></div> */}
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

export default MemberDialog

const useStyle = makeStyles({
  btn: {
      fontSize: 12,
      fontWeight: 'bold',
      fontStyle: 'normal'
  },
  wrapper: {
    maxWidth: 800
  },
  body: {
    maxWidth: 800,
    width: 800    
  },
  meta: {
    marginTop: 10
  },
  titleWrapper: {
    
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 500
  },
  headerAction: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 500,
    color: colors.primary,
    cursor: 'pointer'
  },
  actionButton: {
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'normal'
  },
  bulkWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10
  }

})