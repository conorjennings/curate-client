import React from 'react';
import LoginForm from '../components/LoginForm';
import $ from 'jquery';
import validator from 'validator';
import { sessionService } from 'redux-react-session';
import store from '../index';


class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      validationErrors: {},
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */

   changeUser(event) {
     const field = event.target.name;
     const user = this.state.user;
     const validationErrors = this.state.validationErrors;
     user[field] = event.target.value;
     if(!validator.isEmpty(user[field])) {
       delete validationErrors[field]
     }

     this.setState({
       user
     });
   }

   signInAjax(email, password) {
    // create an AJAX request Sign In
   return $.ajax({
     url: '/sign-in',
     method: 'POST',
     data: {
       credentials: {
         email,
         password
       }
     }
   })
 }



   /**
    * Process the form.
    *
    * @param {object} event - the JavaScript event object
    */

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    const validationErrors = this.state.validationErrors;
    const email = this.state.user.email;
    const password = this.state.user.password;

    const errors = { email:
                       { result: validator.isEmpty(email),
                         message: "email required"
                       },
                     password:
                       { result: validator.isEmpty(password),
                         message: "password required"
                       }
                   }

   for ( let key in errors) {
     if (errors[key].result) {
       validationErrors[key]=errors[key].message
       console.log('validationErrors looks like ', validationErrors)
       this.setState({ validationErrors })
     }
   }
   console.log('this.state.validationErrors', this.state.validationErrors)

   function emp(obj) {
     for(let key in obj) {
         if(obj.hasOwnProperty(key))
             return false;
     }

     return JSON.stringify(obj) === JSON.stringify({});
   }

   if(emp(this.state.validationErrors)) {
      this.signInAjax(email, password).then((resp) => {
        sessionService.saveSession(resp.user.token);
        sessionService.saveUser(resp.user)
      }).then(console.log('store.getState() ', store.getState()))
    }
  }

  /**
   * Render the component.
   */
  render() {
    return (
          <LoginForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            user={this.state.user}
            validationErrors={this.state.validationErrors}/>
    );
  }

}

export default LoginPage;
