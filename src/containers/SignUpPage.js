import React from 'react';
import SignUpForm from '../components/SignUpForm';
import $ from 'jquery';
import validator from 'validator';
import { BrowserRouter } from 'react-router-dom';

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      validationErrors: {},
      user: {
        email: '',
        password: '',
        passwordConfirm: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    // Run field validations on initial state
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

    if(validator.equals(user.password, user.passwordConfirm)) {
      delete validationErrors['passwordMatch']
    }

    this.setState({
      user,
      validationErrors
    });
  }

   // create an AJAX request for Sign Up
   signUpAjax(email, password, passwordConfirm) {
    return $.ajax({
          url: '/sign-up',
          method: 'POST',
          data: {
            credentials: {
              email,
              password,
              passwordConfirm
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
    const passwordConfirm = this.state.user.passwordConfirm;

    const errors = { email:
                       { result: validator.isEmpty(email),
                         message: "email required"
                       },
                     password:
                       { result: validator.isEmpty(password),
                         message: "password required"
                       },
                     passwordConfirm:
                       { result: validator.isEmpty(passwordConfirm),
                         message: "password confirmation required"
                       },
                     passwordMatch:
                       { result: !validator.equals(password, passwordConfirm),
                         message: "provided passwords do not match"
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
      this.signUpAjax(email, password)
        .then((() => {  this.context.router.history.push("/sign-in")
        }))
      }
    }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        user={this.state.user}
        validationErrors={this.state.validationErrors}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignUpPage;
