import React, { Component } from 'react';
import {withStyles} from "material-ui/styles/index";
import firebase, {auth} from "../firebase";
import {Button, Grid, Paper, TextField} from "material-ui";
import Save from '@material-ui/icons/Save';
import {Link, withRouter} from "react-router-dom";

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
            displayName: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }


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

    handleUpdate = () => {

        var user = firebase.auth().currentUser;

        if (this.state.displayName === ""){
            this.setState({displayName: auth.currentUser.email})
        }


        user.updateProfile({
            displayName: this.state.displayName,
        }).then(function() {
            console.log("Username updated!")
        }).catch(function(error) {
        });



        user.updateEmail(this.state.email).then(function() {
            // Update successful.
            console.log("Email updated!")
        }).catch(function(error) {
            // An error happened.
        });


        window.location.assign('/')

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
                            id="bootstrap-input"
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
                            id="bootstrap-input"
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



                    </Paper>

                </Grid>
            </Grid>


        )
    }

}


export default withStyles(styles)(Account);
