import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ImageTile from './ImageTile'
import './login.css'
import LoginForm from './LoginForm'

import { LoginInterface } from '../../../interfaces/Login.interface'



const Login: React.FC<LoginInterface> = () => {
    const classes = useStyles()
    
    return (
        <Grid container className={classes.login}>
            <Grid item xs={12} md={4}>
                <LoginForm />
            </Grid>

            <Grid item xs={12} md={8} className={classes.tileWrapper}>
                <ImageTile/>
            </Grid>
        </Grid>
    )
}

export default Login



const useStyles = makeStyles(theme => {
    return {
    login: {
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column'
        }
    },
    tileWrapper: {
        position: 'relative'
    },
    // formTile: {
    //     display: 'inline-block',
    //     margin: 'auto',
    //     textAlign: 'center'
    // }
}})