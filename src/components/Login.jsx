import React, { Component } from 'react';
import { auth } from '../firebase';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "material-ui";
import firebase from "../firebase";

const styles = theme => ({

    root: {
        flexGrow: 1,
      },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    signUpButton:{
        margin: theme.spacing.unit +5 ,
        color: '#9ba09e',
        textColor:'#5f0000',
    },
    button: {
        margin: theme.spacing.unit,
        fontSize: 12
    },
    facebook:{
        color: "#fff",
        margin: theme.spacing.unit + 5,
        fontSize: 12,
        backgroundColor: "#de4b39",
    }
});


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            isVerified : false,
            vertical: "top",
            horizontal: "center",
            openDialog: false,
            open: false,
            inputEmail: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClickOpenDialog = () => {
        this.setState({ openDialog: true });
    };

    handleCloseDialog = () => {
        this.setState({ openDialog: false });
    };

    resetPassword = () =>{
        this.setState({ openDialog: false });

        var user = firebase.auth();
        var emailAddress = this.state.inputEmail;

        user.sendPasswordResetEmail(emailAddress).then(function() {
            // Email sent.
        }).catch(function(error) {
            // An error happened.
        });
    }


    handleClose = () => {
        this.setState({ open: false });
    };

    onSubmit = state => (event) => {
        event.preventDefault();
        const { email, password } = this.state;


        auth.signInWithEmailAndPassword(email, password)
        .then(authUser => {
            if (!authUser.emailVerified){
                this.setState({ open: true, ...state });
            }else{
                window.location.assign('/');
            }

        })
        .catch(authError => {
            alert(authError);
        })
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    handleLogin = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    }


    render() {
        const { email, password,vertical, horizontal, openDialog, open} = this.state;
        const classes = this.props.classes;

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h1>Log in</h1>


                        <form onSubmit={this.onSubmit({ vertical: 'top', horizontal: 'center' })} autoComplete="off">
                            <TextField
                              id="email"
                              label="Email"
                              className={classes.textField}
                              value={email}
                              onChange={this.handleChange('email')}
                              margin="normal"
                              type="email"
                            />
                            <br />
                            <TextField
                              id="password"
                              label="Password"
                              className={classes.textField}
                              value={password}
                              onChange={this.handleChange('password')}
                              margin="normal"
                              type="password"
                            />

                            <br />
                            <Button  variant="raised" color="secondary" type="submit">Log in</Button>
                            <Button onClick={()=> this.props.history.push('/signup')} className={classes.signUpButton} variant="raised" type="submit">Sign Up</Button>


                            <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={open}
                                onClose={this.handleClose}
                                autoHideDuration={3000}
                                SnackbarContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">Please verify your email address first.</span>}
                            />


                        </form>

                        <Button  size="large" onClick={this.handleLogin} variant="raised" className={classes.facebook}>
                            Sign in with Google
                        </Button>

                        <br/>

                        <Button className={classes.button} onClick={this.handleClickOpenDialog}>Forget password ?</Button>
                        <Dialog
                            open={openDialog}
                            onClose={this.handleCloseDialog}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">Account Recovery</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Let's find your account! Enter your email.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    onChange={this.handleChange('inputEmail')}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCloseDialog} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={this.resetPassword} color="primary">
                                    Send
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </Paper>

                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Login);
