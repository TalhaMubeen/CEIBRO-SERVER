import { Grid } from '@material-ui/core'
import React from 'react'
import InputText from '../../../../Utills/Inputs/InputText'
import InputTextArea from '../../../../Utills/Inputs/InputTextArea'
import InputSwitch from '../../../../Utills/Inputs/InputSwitch'

const ProjectOverViewForm = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <InputText 
                    placeholder="Enter Project title"
                />
            </Grid>

            <Grid item xs={12} style={styles.inputWrapper}>
                <InputText 
                    placeholder="Enter a location address"
                />
            </Grid>

            <Grid item xs={12} style={styles.inputWrapper}>
                <InputTextArea
                    placeholder="Enter a location address"
                />
            </Grid>

            <Grid item xs={12} style={styles.inputWrapper}>
                <InputSwitch label="Add time"/>
            </Grid>

            <Grid item xs={12} style={styles.inputWrapper}>
                <InputSwitch label="Quantity"/>
            </Grid>

            <Grid item xs={12} style={styles.inputWrapper}>
                <InputSwitch label="Comment"/>
            </Grid>

            <Grid item xs={12} style={styles.inputWrapper}>
                <InputSwitch label="Photo"/>
            </Grid>


        </Grid>
    )
}

export default ProjectOverViewForm

const styles = {
    inputWrapper: {
        marginTop: 15
    }
}
