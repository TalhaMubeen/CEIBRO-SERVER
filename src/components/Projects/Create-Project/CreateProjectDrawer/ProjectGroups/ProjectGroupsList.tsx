import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import colors from '../../../../../assets/colors';
import GroupChip from '../../../../Utills/GroupChip/GroupChip'

const ProjectGroupsList = () => {
    const classes = useStyles()
    return (
        <>
            <GroupChip/>
            <GroupChip/>
            <GroupChip/>
            <GroupChip/>
            <GroupChip/>
            <GroupChip/>
            <GroupChip/>
            <GroupChip/>
            <GroupChip/>
            <GroupChip/>
            <GroupChip/>
            <GroupChip/>
            <GroupChip/>
        </>
    )
}

export default ProjectGroupsList

const useStyles = makeStyles({
    
})
