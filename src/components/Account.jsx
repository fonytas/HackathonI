import React, { Component } from 'react';
import {withStyles} from "material-ui/styles/index";
import firebase, {auth} from "../firebase";
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper,
    TextField
} from "material-ui";
import Save from '@material-ui/icons/Save';
import {Link, withRouter} from "react-router-dom";
import {Alert} from "react-bootstrap";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    logoutButton:{

        marginRight: 20
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
        fontSize: 20,

    },
    button: {
        margin: theme.spacing.unit,
    },

    bootstrapRoot: {
        padding: 0,
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        marginBottom: theme.spacing.unit*2,
    },

});


class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            displayName: "",
            newPassword: "",
            currentPassword: "",
            confirmPassword: "",
            open: false,

        }
        this.handleChange = this.handleChange.bind(this);
    }

    // handleClickOpen = () => {
    //     this.setState({ open: true });
    // };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentWillMount(){
        var user = firebase.auth().currentUser;

        if (!user) {
            // User is signed in.
            this.props.history.push('/login');
        } else {
            // No user is signed in.
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        // console.log(this.state.displayName)
    };

    saveChange = () => {
        this.setState({ open: false });

        var user = firebase.auth().currentUser;


        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            this.state.currentPassword
        );

        var newPassword = this.state.newPassword;
        var confirmPassword = this.state.confirmPassword;
        var email = this.state.email;

        user.reauthenticateWithCredential(credential).then(function() {
            // User re-authenticated.
            console.log("User re-authenticated.")
            if (newPassword && confirmPassword){
                if (newPassword === confirmPassword){
                    user.updatePassword(newPassword).then(function() {
                        // Update successful.
                        console.log("Password updated")

                    }).catch(function(error) {
                        // An error happened.
                        console.log(error)
                        alert(error.message)

                    });
                }
                else{
                    alert("Password mismatch")
                }
            }

            if (email){
                user.updateEmail(email).then(function() {
                    // Update successful.
                    console.log("Email updated!")
                }).catch(function(error) {
                    // An error happened.
                    alert(error.message)
                });
            }

        }).catch(function(error) {
            // An error happened.
            alert(error.message)

        });


        if (this.state.displayName){
            user.updateProfile({
                displayName: this.state.displayName,
                photoURL: ""
            }).then(function() {
                console.log("Username updated!")
            }).catch(function(error) {
            });
        }




        // window.location.assign('/')
        console.log("DONE")

    }

    handleUpdate = () => {
        this.setState({ open: true });
        this.saveChange



    }





    render(){
        const classes = this.props.classes;
        return(

            <Grid container className={classes.container} >
                <Grid item xs={12} >
                    <Paper className={classes.paper} >

                        <TextField
                            onChange={this.handleChange('displayName')}
                            className={classes.textField}
                            defaultValue={auth.currentUser.displayName}
                            label="Username"
                            id="displayName"
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
                                className: classes.bootstrapFormLabel,
                            }}
                        />

                        <br />

                        <TextField
                            onChange={this.handleChange('email')}
                            className={classes.textField}
                            defaultValue={auth.currentUser.email}
                            label="Email"
                            id="email"
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
                                className: classes.bootstrapFormLabel,
                            }}
                        />
                        <br/>

                        {/*<TextField*/}
                            {/*onChange={this.handleChange('currentPassword')}*/}
                            {/*className={classes.textField}*/}
                            {/*// defaultValue={}*/}
                            {/*label="Current Password"*/}
                            {/*id="currentPassword"*/}
                            {/*type="password"*/}
                            {/*InputProps={{*/}
                                {/*disableUnderline: true,*/}
                                {/*classes: {*/}
                                    {/*root: classes.bootstrapRoot,*/}
                                    {/*input: classes.bootstrapInput,*/}
                                {/*},*/}
                            {/*}}*/}
                            {/*InputLabelProps={{*/}
                                {/*shrink: true,*/}
                                {/*className: classes.bootstrapFormLabel,*/}
                            {/*}}*/}
                        {/*/>*/}

                        <br/>

                        <TextField
                            onChange={this.handleChange('newPassword')}
                            className={classes.textField}
                            // defaultValue={}
                            label="New Password"
                            id="newPassword"
                            type="password"
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
                                className: classes.bootstrapFormLabel,
                            }}
                        />

                        <br/>

                        <TextField
                            onChange={this.handleChange('confirmPassword')}
                            className={classes.textField}
                            // defaultValue={}
                            label="Confirm new password"
                            id="confirmPassword"
                            type="password"
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
                                className: classes.bootstrapFormLabel,
                            }}
                        />

                        <br />







                        <Button onClick={() =>  window.location.assign('/')} className={classes.button} variant="raised" size="small">
                            Cancel
                        </Button>

                        <Button onClick={this.handleUpdate} className={classes.button} variant="raised" size="small" color="secondary">
                            <Save className={classes.leftIcon} />
                            Save Changes
                        </Button>


                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to make theses change ?
                                    <br/>
                                    Please confirm theses changes.

                                </DialogContentText>
                                <TextField
                                    
                                    onChange={this.handleChange('currentPassword')}
                                    className={classes.textField}
                                    // defaultValue={}
                                    label="Current Password"
                                    id="currentPassword"
                                    type="password"
                                    // InputProps={{
                                    //     disableUnderline: true,
                                    //     classes: {
                                    //         root: classes.bootstrapRoot,
                                    //         input: classes.bootstrapInput,
                                    //     },
                                    // }}
                                    // InputLabelProps={{
                                    //     shrink: true,
                                    //     className: classes.bootstrapFormLabel,
                                    // }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Disagree
                                </Button>
                                <Button onClick={this.saveChange} color="primary" autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>



                    </Paper>

                </Grid>
            </Grid>


        )
    }

}


export default withStyles(styles)(Account);
