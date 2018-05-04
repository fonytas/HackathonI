import React, { Component } from 'react';
import {withStyles} from "material-ui/styles/index";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    logoutButton:{

        marginRight: 20


    }

});


class Account extends Component {

    render(){
        return(

            <p>HELLO</p>
        )
    }

}


export default withStyles(styles)(Account);
