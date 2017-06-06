import { sessionService } from 'redux-react-session';
import validator from 'validator';

export function processForm(event) {

    // this.state = {
    //   validationErrors: {},
    //   errors: {},
    //   user: {
    //     email: '',
    //     password: ''
    //   }
    // };


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
      console.log(resp)
      sessionService.saveSession(resp.user.token);
      sessionService.saveUser(resp.user)

    })
  }
}
