import React from 'react';
import IconButton from 'material-ui/IconButton';
import SlowIcon from 'react-material-icons/icons/action/schedule';

const SlowButtonSelect = (props) => (
  <div className="form-group">
  <IconButton tooltip="slow fashion" onClick={props.onClick}>
    <SlowIcon
      color={ props.slow ? 'red' : 'black'}
      hoverColor='red'/>
     </IconButton>
  </div>
);

SlowButtonSelect.propTypes = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  slow: React.PropTypes.bool.isRequired
};

export default SlowButtonSelect;
