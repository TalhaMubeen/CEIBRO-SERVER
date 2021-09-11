
import { Drawer } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import projectActions from '../../../redux/action/project.action'
import { RootState } from '../../../redux/reducers'

const CreateProjectDrawer = () => {
    const drawerOpen = useSelector((store:RootState) => store.project.drawerOpen)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(projectActions.closeDrawer())
    }

    return (
        <Drawer onClose={handleClose} open={drawerOpen} anchor="right">
            <div style={{ width: '80vw'}}>
                Helo world
            </div>
          </Drawer>
    )
}

export default CreateProjectDrawer
