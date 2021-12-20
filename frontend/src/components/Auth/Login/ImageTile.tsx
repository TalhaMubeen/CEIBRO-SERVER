import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import assets from '../../../assets/assets'
import colors from '../../../assets/colors';

const ImageTile = () => {
    const classes = useStyles()
    
    return (
        <div className={`${classes.imageTile} image-tile`}>
            <div className={classes.logoWrapper}>
                {/* <img src={assets.visual} alt="login"  style={{ width: '150px', height: '60px' }}/> */}
            </div>
        </div>
    )
}

export default ImageTile


const useStyles = makeStyles(theme => ({
    logoWrapper: {
        paddingLeft: 40,
        paddingTop: 40
    },
    descriptionWrapper: {
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 19,
        textAlign: 'center'
    },
    description: {
        textAlign: 'center',
        fontSize: 24,
        color: colors.white,
        fontWeight: 600
    },
    imageTile: {
        width: '100%',
        height: '100vh',
        background: `url(${assets.visual})`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundSize: '100% 100vh',
        backgroundRepeat: 'no-repeat'
    }

}))
