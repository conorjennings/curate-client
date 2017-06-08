import React from 'react';
import IconButton from 'material-ui/IconButton';
import SustainableIcon from 'react-material-icons/icons/action/cached';

const SustainableButtonSelect = (props) => (
  <div className="button">
  <IconButton tooltip="sustainable fashion" onClick={props.onClick}>
    <SustainableIcon
      color={ props.sustainable ? 'red' : 'black'}
      hoverColor='red'/>
     </IconButton>
  </div>
);

SustainableButtonSelect.propTypes = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  slow: React.PropTypes.bool.isRequired
};

export default SustainableButtonSelect;
