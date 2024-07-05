import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Carousel from 'react-material-ui-carousel';
import CarouselSlide from 'react-material-ui-carousel';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3c52b2'
        }
    }
})

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    Button: {
        "&:hover": {
            backgroundColor: "#fff !important"
        }
    },
    title: {
        flexGrow: 1,
    },
}));



export default function ProdCardCarousel({productC}) {
    const [pictures, setPictures] = useState(productC.images)
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            {/* <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        清动订馆平台
                    </Typography>
                    <Button color="inherit">首页</Button>
                    <Button color="inherit">历史订单</Button>
                    <Tooltip disableFocusListener disableTouchListener title="登录账号">
                        <Button color="inherit">未登录</Button>
                    </Tooltip>
                </Toolbar>
            </AppBar> */}

            <Carousel>
                {pictures.map(({ image, title }) => (
                    <CarouselSlide key={image}>
                        <Card>
                            <CardMedia
                                image={image}
                                title={title}
                                style={{
                                    height: 0,
                                    paddingTop: '25%',
                                }}
                            />
                            <CardContent>
                                <Typography>{title}</Typography>
                            </CardContent>
                        </Card>
                    </CarouselSlide>
                ))}
            </Carousel>
        </ThemeProvider>
    );
} 