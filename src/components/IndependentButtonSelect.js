import React from 'react';
import IconButton from 'material-ui/IconButton';
import IndependentIcon from 'react-material-icons/icons/action/face';

const IndependentButtonSelect = (props) => (
  <div className="button">
  <IconButton tooltip="independent fashion" onClick={props.onClick}>
    <IndependentIcon
      color={ props.independent ? 'red' : 'black'}
      hoverColor='red'/>
     </IconButton>
  </div>
);

IndependentButtonSelect.propTypes = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  independent: React.PropTypes.bool.isRequired
};

export default IndependentButtonSelect;
