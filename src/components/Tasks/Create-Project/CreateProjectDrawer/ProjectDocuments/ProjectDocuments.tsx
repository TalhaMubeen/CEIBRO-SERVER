import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsGrid } from 'react-icons/bs';
import colors from '../../../../../assets/colors';
import InputText from '../../../../Utills/Inputs/InputText';
import HorizontalBreak from '../../../../Utills/Others/HorizontalBreak';
import ProjectDocumentHeader from './ProjectDocumentHeader'
import ProjectDocumentList from './ProjectDocumentList'

const ProjectDocuments = () => {

    const classes = useStyles()

    return (
        <>
            <Grid container alignItems="flex-start">
                <ProjectDocumentHeader/>

                {/* <Grid item xs={12} className={classes.titleWrapper}>
                    <Typography className={classes.title}>
                        Group name
                    </Typography>
                    <HorizontalBreak/>
                </Grid> */}


                <Grid item xs={12} className={classes.groupsWrapper}>
                    <ProjectDocumentList/>
                </Grid>

            </Grid>
        </>
    )
}

export default ProjectDocuments


const useStyles = makeStyles({
    titleWrapper: {
        paddingTop: 20,
    },
    title: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey,
        paddingBottom: 10
    },
    groupsWrapper: {

    }
})

