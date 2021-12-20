import { makeStyles, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import * as React from 'react';
import colors from '../../assets/colors';

interface IAppProps {
}

const InputInvite: React.FunctionComponent<IAppProps> = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <div className={classes.iconWrapper}>
                <Search />
                <Typography className={classes.horizontalBreak}>
                    |
                </Typography>
            </div>
            <div className={classes.inputWrapper}>
                <input 
                    type="text"
                    className={`emptyBorder ${classes.input}`}
                    placeholder="Enter email or name surname"
                />
            </div>
            <div className={classes.btnWrapper}>
                <button className={`custom-btn ${classes.btn}`}>
                    <Typography className={classes.btnText}>
                        Invite
                    </Typography>
                </button>
            </div>
        </div>
    )
};

export default InputInvite;

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flex: 1,
        background: colors.white,
    },
    iconWrapper: {
        flex: 2,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingLeft: 2,
        border: `1px solid ${colors.mediumGrey}`,
        borderRight: 'none'
    },
    horizontalBreak: {
        color: colors.mediumGrey
    },
    inputWrapper: {
        flex:  7,
        border: `1px solid ${colors.mediumGrey}`,
        borderRight: 'none',
        borderLeft: 'none',
        paddingRight: 5
    },
    input: {
        height: 35,
        flex: 1,
        width: '100%'
    },
    btnWrapper: {
        flex: 2,
        display: 'flex',
    },
    btn: {
        flex: 1,
        background: colors.primary,
        color: colors.white,
        borderColor: colors.primary,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        cursor: 'pointer'
    },
    btnText: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})
