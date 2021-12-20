
import { Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../../assets/colors'
import taskActions from '../../../redux/action/task.action'
import { RootState } from '../../../redux/reducers'
import TaskDrawerHeader from './TaskDrawerHeader'
import TaskDrawerMenu from './TaskDrawerMenu'
import CreateTaskBody from './CreateTaskBody'
import CreateTaskFooter from './CreateTaskFooter'

const CreateTaskDrawer = () => {
    const drawerOpen = useSelector((store:RootState) => store.task.drawerOpen)
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleClose = () => {
        dispatch(taskActions.closeDrawer())
    }

    return (    
        <Drawer onClose={handleClose} open={drawerOpen} anchor="right">
            <div className={classes.outerWrapper}>
                <TaskDrawerHeader/>
                <TaskDrawerMenu/>
                <CreateTaskBody/>
                <CreateTaskFooter/>
            </div>
          </Drawer>
    )
}
export default CreateTaskDrawer

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
