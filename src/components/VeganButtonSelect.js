import React from 'react';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'react-material-icons/icons/action/favorite';

const VeganButtonSelect = (props) => (
  <div className="form-group">
  <IconButton tooltip="vegan" onClick={props.onClick}>
    <FavoriteIcon
      color={ props.vegan ? 'red' : 'black'}
      hoverColor='red'/>
     </IconButton>
  </div>
);

VeganButtonSelect.propTypes = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  vegan: React.PropTypes.bool.isRequired
};

export default VeganButtonSelect;
