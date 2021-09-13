import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';
import InputText from '../../../../Utills/Inputs/InputText';
import SelectDropdown from '../../../../Utills/Inputs/SelectDropdown';

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
        Add a member
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <div className={classes.body}>
            <div>
              <InputText placeholder="Search or/and add email"/>
            </div>
            <div className={classes.meta}>
              <SelectDropdown title="Role"/>
            </div>
            <div className={classes.meta}>
              <SelectDropdown title="Group"/>
            </div>
            {/* <div></div> */}
          </div>
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
  body: {
    width: 280
  },
  meta: {
    marginTop: 10
  }

})