import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import FavoriteIcon from 'react-material-icons/icons/action/favorite';

const ButtonSelect = (props) => (
  <div className="form-group">
  <h3>{props.name}</h3>
  <IconButton onClick={props.onClick}>
    <FavoriteIcon
      color={ props.vegan ? 'red' : 'black'}
      hoverColor='red'/>
     </IconButton>
  </div>
);

ButtonSelect.propTypes = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  vegan: React.PropTypes.bool.isRequired
};

export default ButtonSelect;
