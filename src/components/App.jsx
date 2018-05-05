import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import firebase, { auth } from '../firebase';

import { withStyles,MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';

import PrivateRoute from './PrivateRoute';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import Account from './Account';
import './index.css';

// const theme = createMuiTheme();

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#f05545',
            main: '#2f4f4f',
            dark: '#000',
            contrastText: '#f7f3ed',
        },
        secondary: {
            light: '#000',
            main:'#7f0000',
            dark: '#5f0000',
            contrastText: '#f7f3ed'
        },
    }
})

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    logoutButton:{
        
        marginRight: 20


    }

});




class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            authenticated: false,
            currentUser: null,

        };
    }


    componentWillMount() {
        console.log("will mount")


        auth.onAuthStateChanged(user => {

        if (user) {

            if (user.emailVerified){

                console.log("Email verified !")
                this.setState({
                        authenticated: true,
                        currentUser: user,
                        loading: false },
                    () => { this.props.history.push('/') }
                );
            }
            else {
                console.log("Email not verified !")
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false},
                    () => {  this.props.history.push('/login') }
                );
            }
        } else {
            this.setState({
                authenticated: false,
                currentUser: null,
                loading: false
            });
        }
        });
    }

    render () {
        const {classes} = this.props;
        const { authenticated, loading } = this.state;
        const content = loading ? (
            <div align="center">
                <CircularProgress size={80} thickness={5} />
            </div>
        ) : (
            <div>
                <PrivateRoute
                    exact
                    path="/"
                    component={Main}
                    authenticated={authenticated}
                    />


                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/account" component={Account}/>


            </div>

        );
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <AppBar position="static" color="secondary">
                        <Toolbar>
                            { authenticated &&
                            <Button className={classes.logoutButton} variant="raised" color="primary" onClick={() => auth.signOut()}>Log out</Button>
                            }
                            <Typography variant="title" color="inherit">
                                Simple Note
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    { content }
                </div>
            </MuiThemeProvider>
         );
    }
}



export default withRouter(withStyles(styles)(App));
