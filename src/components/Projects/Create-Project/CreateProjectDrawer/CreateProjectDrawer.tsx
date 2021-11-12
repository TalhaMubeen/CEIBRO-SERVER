
import { Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../../../assets/colors'
import projectActions from '../../../../redux/action/project.action'
import { RootState } from '../../../../redux/reducers'
import ProjectDrawerHeader from './ProjectDrawerHeader'
import ProjectDrawerMenu from './ProjectDrawerMenu'
import CreateProjectBody from './CreateProjectBody'
import CreateProjectFooter from './CreateProjectFooter'

const CreateProjectDrawer = () => {
    const drawerOpen = useSelector((store:RootState) => store.project.drawerOpen)
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleClose = () => {
        dispatch(projectActions.closeDrawer())
    }

    return (    
        <Drawer onClose={handleClose} open={drawerOpen} anchor="right">
            <div className={classes.outerWrapper}>
                <ProjectDrawerHeader/>
                <ProjectDrawerMenu/>
                <CreateProjectBody/>
                <CreateProjectFooter/>
            </div>
          </Drawer>
    )
}

export default CreateProjectDrawer

const useStyles = makeStyles({
    outerWrapper: {
        width: 'calc(100vw - 200px)',
        backgroundColor: colors.lightGrey,
        height: '100vh',
        ['@media (max-width:960px)']: {
            width: '100vw'
        }
    }
})
