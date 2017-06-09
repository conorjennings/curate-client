import React from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';
import $ from 'jquery';
import validator from 'validator';
import store from '../index';

const url = process.env.REACT_APP_API_URL

class ChangePasswordPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      ajaxError: '',
      validationErrors: {},
      user: {
        oldPw: '',
        newPw: '',
        newConfirm: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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

    if(validator.equals(user.newPw, user.newConfirm)) {
      delete validationErrors['passwordMatch']
    }

    this.setState({
      user,
      validationErrors
    });
  }

  //  create an AJAX request for Sign Up
   changePasswordAjax(oldPw, newPw) {

    const currentStore = store.getState()
    const id = currentStore.session.user.id
    const token = currentStore.session.user.token

    // console.log('token looks like ', token)
    // console.log('old pw looks like ', oldPw)
    // console.log('new ps looks like ', newPw)
    // console.log('id looks like ', id)

    return $.ajax({
          url: url + '/change-password/' + id,
          method: 'PATCH',
          headers: {
            Authorization: 'Token token=' + token
          },
          data: {
            passwords: {
              old: oldPw,
              new: newPw
            }
          }
        })
        // .then((resp) => {console.log('this is the response ', resp)})
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
    const oldPw = this.state.user.oldPw;
    const newPw = this.state.user.newPw;
    const newConfirm = this.state.user.newConfirm;

    const errors = { oldPw:
                       { result: validator.isEmpty(oldPw),
                         message: "existing password required"
                       },
                     newPw:
                       { result: validator.isEmpty(newPw),
                         message: "new password required"
                       },
                     newConfirm:
                       { result: validator.isEmpty(newConfirm),
                         message: "new password confirmation required"
                       },
                     passwordMatch:
                       { result: !validator.equals(newPw, newConfirm),
                         message: "provided new passwords do not match"
                       }
                   }

     for ( let key in errors) {
       if (errors[key].result) {
         validationErrors[key]=errors[key].message
        //  console.log('validationErrors looks like ', validationErrors)
         this.setState({ validationErrors })
       }
     }
    //  console.log('this.state.validationErrors', this.state.validationErrors)

      function emp(obj) {
        for(let key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }
    if(emp(this.state.validationErrors)) {
      this.changePasswordAjax(oldPw, newPw)
        .then(() => this.context.router.history.goBack()).then(() => this.context.router.history.push("/dashboard"))
        .catch((error) => {this.setState({ ajaxError : 'incorrect current password. try again.' })})
    }
    }

    handleCancel() {
    this.context.router.history.goBack()
    this.context.router.history.push("/dashboard")
    }

  /**
   * Render the component.
   */
  render() {
    return (
      <ChangePasswordForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        user={this.state.user}
        validationErrors={this.state.validationErrors}
        handleCancel={this.handleCancel}
        ajaxError={this.state.ajaxError}
      />
    );
  }

}

ChangePasswordPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ChangePasswordPage;
