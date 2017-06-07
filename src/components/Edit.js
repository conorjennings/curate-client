import React from 'react';
import FlatButton from 'material-ui/FlatButton';

// Theme import required to get Material-UI working

class Edit extends React.Component {
    render() {
        return <FlatButton label="Edit" onClick={this.props.handleEdit} />
    }
}

export default Edit;
