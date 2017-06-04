import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const LoginForm = ({
  onSubmit,
  onChange,
  validationErrors,
  user
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign In</h2>

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={validationErrors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={validationErrors.password}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Sign In" primary />
      </div>

      <CardText>No not have an account? <Link to={'/sign-up'}>Create one</Link>.</CardText>
    </form>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
