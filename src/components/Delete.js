import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import FavoriteIcon from 'react-material-icons/icons/action/favorite';
import SlowIcon from 'react-material-icons/icons/action/schedule';
import SustainableIcon from 'react-material-icons/icons/action/cached';
import IndependentIcon from 'react-material-icons/icons/action/face';
import FlatButton from 'material-ui/FlatButton';

// Theme import required to get Material-UI working

class Delete extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <FlatButton label="Delete" onClick={this.props.handleClick}/>
    }
}

export default Delete;