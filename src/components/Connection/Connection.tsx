import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import colors from '../../assets/colors';
import { INVITATIONS_LIST } from '../../constants/invitations.constants';
import NameAvatar from '../Utills/Others/NameAvatar';
import ViewProfile from './ViewProfile'
import taskActions from '../../redux/action/project.action'
import { useDispatch } from 'react-redux'
interface IConnectionsProps {
}

const Connections: React.FunctionComponent<IConnectionsProps> = (props) => {
    
    const classes = useStyles()
    const dispatch = useDispatch()

    const openTaskDrawer = () => {
        dispatch(taskActions.openDrawer())
    }

    return (
        <Grid container className={classes.wrapper}>
            {INVITATIONS_LIST && INVITATIONS_LIST.map(connection => {
                return (
                    <Grid item xs={12} className={classes.chipWrapper}>
                        <Grid container>
                            <Grid item xs={7} className={classes.userWrapper}>
                                <NameAvatar name={connection.name}/>
                                <div className={classes.nameWrapper}>
                                    <Typography className={classes.name}>
                                        {connection.name}
                                    </Typography>
                                    <Typography className={classes.subTitleText}>
                                        company
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={5} className={classes.btnWrapper}>
                                <Button className={classes.btn} variant="contained" size="medium" color="primary">Start conversation</Button>
                                <Button className={classes.btn} variant="contained" onClick={openTaskDrawer} size="medium" color="primary">Create task</Button>
                                <ViewProfile/>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            })}
        </Grid>
    )
};

export default Connections;

const useStyles = makeStyles({
    wrapper: {
        background: colors.white,
        padding: 20
    },
    chipWrapper: {
        paddingTop: 10
    },
    userWrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary
    },
    subTitleText: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey
    },
    nameWrapper: {
        paddingLeft: 10
    },
    btnWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    btn: {
        fontSize: 12,
        fontWeight: 'bold'
    }
})