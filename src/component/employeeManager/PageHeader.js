import React from 'react'
import { Paper, Card, Typography, makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader:{
        padding:theme.spacing(1),
        paddingBottom:theme.spacing(0),
        paddingRight:theme.spacing(10),
        display:'flex',
        marginBottom:theme.spacing(3),
        //marginRight:theme.spacing(5),
        color:'#ffcc00'
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        marginLeft:theme.spacing(35),
        color:'#424242'
        //3c44b1
    },
    
    pageTitle:{
        paddingLeft:theme.spacing(5),
        marginTop:theme.spacing(2),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    }
}))

export default function PageHeader(props) {

    const classes = useStyles();
    const { title, subTitle, icon } = props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h4"
                        component="div">
                        {title}</Typography>
                    <Typography
                        variant="h5"
                        component="div"><br/>
                        {subTitle}</Typography>
                </div>
            </div>
        </Paper>
    )
}
