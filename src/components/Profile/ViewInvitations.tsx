import { Avatar, Button, Dialog, DialogTitle, Grid, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import colors from '../../assets/colors';
import NameAvatar from '../Utills/Others/NameAvatar';
import InvitationsList from './InvitationsList';

interface IViewInvitationsProps {
}

const ViewInvitations: React.FunctionComponent<IViewInvitationsProps> = (props) => {
    
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const handleToggle = () => {
        setOpen(!open)
    }

    return (
        <>
            <Button color="primary" onClick={handleToggle} variant="outlined">View</Button>
            <Dialog onClose={handleToggle} open={open}>
                <DialogTitle>
                    <div className={classes.titleWrapper}>
                        <Button className={classes.acceptBtn} color="primary" variant="text">Accept all</Button>
                        <Button className={classes.declineBtn} variant="text">Decline all</Button>
                    </div>
                </DialogTitle>
                <InvitationsList/>
            </Dialog>
        </>
  )
};

export default ViewInvitations;

const useStyles = makeStyles({
    titleWrapper: {
        width: 400,
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${colors.mediumGrey}`,
        paddingBottom: 10
    },
    acceptBtn: {
        fontSize: 14,
        fontWeight: 500
    },
    declineBtn: {
        fontSize: 14,
        fontWeight: 500,
        color: colors.btnRed
    }
})
