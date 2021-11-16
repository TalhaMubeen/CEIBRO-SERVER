import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ImageTile from './ImageTile'
import './login.css'
import LoginForm from './LoginForm'

import { LoginInterface } from '../../../interfaces/Login.interface'
import { useMediaQuery } from 'react-responsive'
import assets from '../../../assets/assets'



const Login: React.FC<LoginInterface> = () => {
    const classes = useStyles()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)'}) 

    return (
        <Grid container className={classes.login}>
            <Grid item xs={12} md={6} lg={4} className={classes.form}>
                <LoginForm />
            </Grid>

            {!isTabletOrMobile && 
                <Grid item xs={12} md={6} lg={8} className={classes.tileWrapper}>
                    <ImageTile/>
                </Grid>
            }
        </Grid>
    )
}

export default Login



const useStyles = makeStyles(theme => {
    return {
    login: {
        display: 'flex',
        ['@media (max-width:960px)']: {
            flexDirection: 'column',
            height: '100vh'
        }
    },
    form: {
        height: '100vh',
        ['@media (max-width:960px)']: {
            background: `url(${assets.visual})`,
            backgroundSize: '100vw 100vh',
            backgroundRepeat: 'no-repeat'
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