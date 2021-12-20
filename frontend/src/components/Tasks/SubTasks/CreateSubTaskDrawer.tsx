import { Button, makeStyles, Dialog, DialogTitle, DialogContent, TextField, Grid } from '@material-ui/core'
import { useState } from 'react'
import DatePicker from '../../Utills/Inputs/DatePicker'
import InputText from '../../Utills/Inputs/InputText'
import InputTextArea from '../../Utills/Inputs/InputTextArea'
import SelectDropdown from '../../Utills/Inputs/SelectDropdown'

const CreateSubTaskDrawer = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleToggle = () => {
        setOpen(!open)
    }

    return (
        <>
            <Button className={classes.create} variant="outlined" size="medium" color="primary" onClick={handleToggle}>Add subtask</Button>
            <Dialog onClose={handleToggle} open={open}>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} className={`${classes.outerWrapper}`}>
                            <InputText placeholder="Enter a subtask title" />
                        </Grid>
                        <Grid item xs={12} className={`${classes.outerWrapper}`}>
                            <SelectDropdown title="Assigne" />
                        </Grid>
                        <Grid item xs={12} md={6} className={`${classes.outerWrapper}`}>
                            <DatePicker />
                        </Grid>
                        <Grid item xs={12} className={`${classes.outerWrapper}`}>
                            <InputTextArea placeholder="Enter subtask description"/>
                        </Grid>

                        <Grid item xs={12} className={`${classes.outerWrapper}`}>
                            <Button variant="contained" size="small" color="primary">Save Subtask</Button>
                            <Button variant="text" size="small" onClick={handleToggle} >Cancel</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>        
        </>
    )
}

export default CreateSubTaskDrawer

const useStyles = makeStyles({
    outerWrapper: {
        marginTop: 10
    },
    create: {
        marginTop: 10
    }
})