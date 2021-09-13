import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import colors from '../../../assets/colors';
import HorizontalBreak from '../Others/HorizontalBreak';

const GroupChip = () => {
    const classes = useStyles()
    return (
        <div >
            <div className={classes.groupChip}>
                <div className={classes.title}>
                    <KeyboardArrowDownIcon/>
                    <Typography className={classes.titleText}>
                        Electrikud
                    </Typography>
                </div>
                <div className={classes.action}>
                    <MoreVertIcon/>
                </div>
            </div>
            <HorizontalBreak/>
        </div>
    )
}

export default GroupChip

const useStyles = makeStyles({
    groupChip: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 15
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    action: {
        color: colors.primary

    },
    titleText: {
        fontSize: 14,
        fontWeight: 500
    }
})
