---
title: Capstone
index: 6
---

# Lab Six - Capstone

## `cd` to the sixth lab

* In a terminal:

```
cd ../ # presuming still in first lab
cd lab-06-capstone
yarn start
```

### Are we done yet?

The application is pretty much feature-complete at this point. Nice work!

...but then you notice that just about anybody can modify data. Not good.
We need to add some security to this app, fast!

### What do we need?

We need to restrict access by requiring the user log in using valid credentials.
The good news is that our server team has put together a nice login/logout capability.

**Note**: This is a *terrible* login/logout capability. Don't copy it!

### Build the Action Types for Auth

Our app is going to have to accept credentials, log the user in, and pull the current user from the server
so we can get info about them.

We need to define our types for Authentication actions.

* One type for when we get a copy of the user from the server and need to save it into State
* A second type to track whether we encountered an error when logging in so we can tell the user.


```javascript:title=AuthActionTypes.js
export const SET_USER = 'SET_USER';
export const ERROR = 'ERROR';
```

### Build the Actions

Now we need a way to fire off login & logout actions based on user interaction.

We need async actions for making API calls to the following endpoints:
* POST `/api/login`, request body of { username: value, password: value }
* POST `/api/logout`, no request body

Then we need actions:
* To handle getting a copy of the user after login & clearing the user after logout
* To track errors on login

```javascript:title=AuthActionCreator.js
export function setUser(user) {
  return {
    type: AuthActionTypes.SET_USER,
    user: user
  };
}

export function error(error) {
  return {
    type: AuthActionTypes.ERROR,
    error: error
  }
}

export const login = (credentials) => {
  return dispatch => {
    return Axios.post('/api/login', credentials)
      .then(function(res) {
        dispatch(setUser(res.data));
        console.log('Login successful');
        return true;
      })
      .catch(function(x) {
        console.log('There was an error logging in.');
        dispatch(error('Failed to login'));
      });
  };
};

export const logout = () => {
  return dispatch => {
    return Axios.post('/api/logout')
      .then(function(res) {
        dispatch(setUser(null));
        console.log('Logout successful');
        return true;
      })
      .catch(function(x) {
        console.log('There was an error logging out.');
      });
  };
};
```

### Build the Reducer

We need a reducer to handle our actions

* One case needs to save the new active User (which could be null if the user is logging out)
* A second case needs to save an error message if login failed.

```javascript:title=auth-reducer.js
switch (action.type) {
    case AuthActionTypes.SET_USER:
      return { ...state, user: action.user };
    case AuthActionTypes.ERROR:
      return { ...state, error: action.error };
    default:
      return state;
}
```

### Create a Login form

* We need a form that will accept a username and password as well as supply a "Login" button.
* Look at the existing forms in the rest of the app for examples.

  
```jsx:title=Login.js
class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: { value: '', valid: null },
      password: { value: '', valid: null }
    };
  }

  handleSubmit = () => {
    if (this.validateAll()) {
      this.props.authActions.login({
        username: this.state.username.value,
        password: this.state.password.value
      });
    }
  };

  getUsernameValidationState = () => {
    if (!this.state) return;
    if (this.state.username.valid === true) return 'success';
    else if (this.state.username.valid === false) return 'error';
  };

  handleUsernameChange = (value) => {
    let isValid = false;
    if (value) {
      isValid = true;
    }
    return this.setState({ username: { value: value, valid: isValid } });
  };

  getPasswordValidationState = () => {
    if (!this.state) return;
    if (this.state.password.valid === true) return 'success';
    else if (this.state.password.valid === false) return 'error';
  };

  handlePasswordChange = (value) => {
    let isValid = false;
    if (value) {
      isValid = true;
    }
    return this.setState({ password: { value: value, valid: isValid } });
  };

  validateAll = () => {
    return (
      this.state.username.value &&
      this.state.password.value !== null
    );
  };

  render() {
    return (
      <form>
        <FormGroup controlId="username" validationState={this.getUsernameValidationState()}>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username.value}
            placeholder="Enter username"
            onChange={e => this.handleUsernameChange(e.target.value)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="password" validationState={this.getPasswordValidationState()}>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password.value}
            placeholder="Enter username"
            onChange={e => this.handlePasswordChange(e.target.value)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button bsStyle="success" onClick={this.handleSubmit} disabled={!this.validateAll()}>
          Login
        </Button>&nbsp;
        {this.props.error && <strong>{this.props.error}</strong>}
      </form>
    );
  }
}

LoginForm.defaultProps = {
};

LoginForm.propTypes = {
};
```

* We'll need a function to handle submitting the login info for us, and a way to find out if there was an error on login.
* These could be passed down as props, but in this instance we'll grab them from Redux so we can practice that.

```jsx:title=Login.js
function mapStateToProps(state) {
  return {
    error: state.auth.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(AuthActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
```

### Add a Logout button

We want to let the user log out from the navbar, so we'll need to add a new link that can fire off the 'Logout' action.

* First, add a 'onLogout' prop to the Navigation component

  
```jsx:title=Navigation.js
NavBar.propTypes = {
  onLogout: PropTypes.func.isRequired
};
```
  
* Next, add a link to the NavBar with a click listener that calls the 'onLogout' prop

  
```jsx:title=Navigation.js
<Nav pullRight>
  <LinkContainer to="/logout">
    <NavItem eventKey={4} onClick={this.props.onLogout}>Logout</NavItem>
  </LinkContainer>
</Nav>
```
  
### Grab props to pass into Navigation

Now that Navigation needs a 'onLogout' function to call, we need to get that from Redux and pass it in.

* In **app.js**, connect the component to Redux and bind the AuthActions we created earlier

  
```jsx:title=App.js
function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(AuthActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
```
  

* Pass the 'logout' action from our AuthActions into Navigation as the 'onLogout' prop

  
```jsx:title=App.js
<Navigation onLogout={this.props.authActions.logout}/>
```

### Render login form until user successfully logs in

We have all the pieces in place, now we just need to prevent the user from accessing the application until they've logged in.

* In **app.js**, look for a good way to render our LoginForm anytime there isn't valid _User_ object in our Redux state.

  
```jsx:title=App.js
render() {
    if (!this.props.user) {
      return <LoginForm />
    }

    ...
```

### Try it out

Let's see if the app does what we want.

* Try accessing any route (employees, projects, etc) - you should be restricted to the login form.
* Try a bad login. Do you get an error message?
* Try a good login - can you access the app?
* Logout of the app - do you get sent back to the login form?

### Commit your changes to Git.

```
git add .
git commit -m "We are React masters"
```

## Extra Credit

* Unit tests! Our new and changed components need tests.

* Do you think we should test our actions & reducers? Any ideas on how to do it?

* Can you find a way to update the form validation state when login fails so the fields are styled appropriately?

* Is there a way to restructure the Login form as a presentational component?

* Try to figure out a way to tie in `react-router` to provide a `/login` route while still securing the other routes

`git add .` and `git commit -m "extra credit"` when you are done