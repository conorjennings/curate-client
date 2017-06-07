import React from 'react';
import FlatButton from 'material-ui/FlatButton';

// Theme import required to get Material-UI working

class Delete extends React.Component {
    render() {
        return <FlatButton label="Delete" onClick={this.props.handleClick}/>
    }
}

export default Delete;
