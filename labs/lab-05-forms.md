# Lab Five - Forms and Validation

## Checkout the Lab Branch

- In a terminal:

```
git checkout lab-05-form-validation-start
git pull
```

If not running, start the `npm start` task.  Otherwise, restart the running tasks to pick up any changes in the lab-05-form-validation-start branch.

&nbsp;
### Check it out!

- Let's look at the progress that has already been completed on the application by the rest of the team.
  - The component files needed to create and edit employees, timesheets, and timeunits have been created for you.  This lab will walk you through the implementation of some of those features.
  - You'll also notice that **React Router** has been added to some of our previous components. More on that later.

&nbsp;
### Add the Routes for Creating and Updating

- Before we can do anything, we need to add more routes to our application and tie them together with the appropriate handlers.
- Open **/src/App.js** and add the routes below under the 'Switch' tag (on the same level as your other routes):


```
<Route path='/employees/detail/:_id' component={EmployeesDetail} />
<Route path='/employees/create' component={EmployeesCreate} />
 
<Route exact path='/employees/:user_id/timesheets/detail/:_id' component={TimesheetsDetail} />
  
<Route path='/employees/:user_id/timesheets/detail/:timesheet_id/timeunits/create' component={TimeunitsCreate} />
<Route path='/employees/:user_id/timesheets/detail/:timesheet_id/timeunits/detail/:_id' component={TimeunitsDetail} />

```

> Take the time to check out the path declarations and how they are adding route params that are dynamically replaced.


&nbsp;
### Add Edit Employee Functionality

- Now let's set up a way to edit an employee.

&nbsp;
###### Before we get started, take the time to look at the custom form components already implemented for us.

- The first component we need is a form to contain all of our employee's properties.
- Open **/src/components/employees/EmployeeForm.js**.

- Let's review the ```props``` of this component:
  - employee : the employee we will be editing
  - handleSave: the callback to call when the user submits the form
  - history: provided by ```react-router```, this will allow the component to manipulate app's route

- Next we need to act when the user clicks the cancel or save buttons.
- First, add both buttons to the ```render()``` method of the EmployeeForm - these should be the final child elements of the ```<form>```.

```javascript

<Button bsStyle="success" onClick={this.handleSave} disabled={!this.validateAll()}> Save </Button>
<LinkContainer to="/employees">
  <Button bsStyle="danger"> Cancel </Button>
</LinkContainer>

```

- LinkContainer is a component that will allow us to easily reroute when clicked.
- The save button will call ```this.handleSave```, which is the next function we should define.
- Here's what ```handleSave``` should look like:

```javascript
handleSave(){
    if(this.validateAll()) {
      this.props.handleSave({
        username: this.state.username.value,
        email: this.state.email.value,
        firstName: this.state.firstName.value,
        lastName: this.state.lastName.value,
        admin: this.state.admin.value,
        _id: this.props.employee._id
      });
    }
  }
```

- If all the fields in the form are valid, we're calling the function that was passed down to us as the ```handleSave``` prop.
- We haven't defined ```validateAll()``` yet, so let's do that next.  Here's what it should look like:

```javascript
validateAll(){
    return (
      this.state.username.value
      && this.state.email.value
      && this.state.firstName.value
      && this.state.lastName.value
      && this.state.admin.value !== null
    );
  }
```

- Here, we're simply checking that we have values for all the fields.  Our other handler functions will update the state appropriately as the user changes field values.  But what if the ```EmployeeForm``` is being used to edit an existing employee?
- We already know that this component can receive an ```employee``` in its props, what we need to do is update the state to reflect that employee's values.
- The ```componentWillReceiveProps``` is a nice place to do that.  Here's what it should look like:

```javascript
  componentWillReceiveProps(nextProps) {
    this.state = {
      username: {value: nextProps.employee.username, valid: null},
      email: {value: nextProps.employee.email, valid: null},
      firstName: {value: nextProps.employee.firstName, valid: null},
      lastName: {value: nextProps.employee.lastName, valid: null},
      admin: {value: nextProps.employee.admin, valid: null}
    };
  }
```

- This function is called when the parent component updates this component's props.  The new props are passed as an argument, so we use that to update the component's state.  The component will then render as necessary.

- Now it's time to update our `render()` method to include the fields that our coworkers forgot to include!  Looks like we don't have fields for email or firstName.  Well, if you want something done right...  Let's add them:

```javascript
<FormGroup
      controlId="email"
      validationState={this.getEmailValidationState()}
    >
      <ControlLabel>Email</ControlLabel>
      <FormControl
        type="email"
        value={this.state.email.value}
        placeholder="Enter email"
        onChange={(e) => this.handleEmailChange(e.target.value)}
      />
      <FormControl.Feedback />
    </FormGroup>
    
    <FormGroup
      controlId="firstName"
      validationState={this.getFirstNameValidationState()}
    >
      <ControlLabel>First Name</ControlLabel>
      <FormControl
        type="text"
        value={this.state.firstName.value}
        placeholder="Enter firstName"
        onChange={(e) => this.handleFirstNameChange(e.target.value)}
      />
      <FormControl.Feedback />
</FormGroup>
```

> Notice that we are not actually implementing the save function. That is left for the component that uses this form to implement and pass it in as a prop.

&nbsp;
## Add the Form into an Employee Detail Component

- Now let's actually use the form we just built.
- Open **/src/components/employees/EmployeesDetail.js**
- Let's setup our proptTypes, first.   We already have the ```history``` prop, but we need to include an ```employee``` prop as well, like so:

```javascript
EmployeesDetail.propTypes = {
  employee: PropTypes.object.isRequired,
  history: PropTypes.object
};
```

-  Next, let's hook up to the Redux architecture.  The only thing we'll need from the Redux state is the employee, like so:

```javascript
function mapStateToProps(state) {
  return {
    employee: state.employees.employee
  }
}
```

-  This component will also need the ability to update the Redux state through using the ```EmployeeActions```, like so:

```javascript
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(EmployeeActions, dispatch)
  };
}
```

- Next, let's update the render function to include the ```EmployeeForm```, and pass it all the props it needs:

```javascript
render() {
    return (
      <Grid>
        <Row>
          <PageHeader>Employees Detail</PageHeader>
        </Row>
        <Row>
          <EmployeeForm employee={this.props.employee} actions={this.props.actions} handleSave={this.handleSave}/>
        </Row>
      </Grid>
    );
  }
```
- Notice that we're passing ```EmployeeForm``` a reference to ```this.handleSave```, which we still need to define:

```javascript
handleSave(employee){
  this.props.actions.updateEmployee(employee).then(() => {
    this.props.history.push('/employees');
  });
}
```
- Finally, we need to build the constructor.  Go ahead and do that now, then we'll look at each part:

```javascript
constructor(props) {
  super(props);

  const id = props.match.params._id;
  props.actions.getEmployee(id);

  this.handleSave = this.handleSave.bind(this);
}
```

- ```super(props)``` must be the first line in any react constructor
- Then, we grab the employee id from the URL parameter, and use it to retrieve that employee.
- Finally, we're forcing ```this``` to always be this component when ```handleSave``` is called by the child component.

&nbsp;
## Test the Employee Detail Component

- Open **/src/components/employees/EmployeesDetail**
- Update the test labeled ```should instantiate the Employees Detail Component ```:

```javascript
  it('should instantiate the Employees Detail Component', function () {
    const component = renderer.create(
      <MemoryRouter><EmployeesDetail store={mockStore}/></MemoryRouter>
    );

      const stringVal = JSON.stringify(component);
      expect(stringVal).toMatch(/Employees Detail/);

  });
```

- Run the tests and verify that they pass before moving on to the next section.

## Add navigation to the Employee Detail Component

- We have an Employee Detail route, but there's no way to get to it yet.
- We're going to add functionality so that when you click an **EmployeeRow**, the router will transition to the appropriate detail route for the employee.


- Open **/src/components/employees/EmployeeRow.js**

- Add the `showDetail()` method to the **EmployeeRow**

```javascript
  showDetail(employee) {
    if(employee.deleted) {
      console.log('You cannot edit a deleted employee.');
      return;
    }

    this.props.history.push('/employees/detail/' + employee._id);
  }
```

- Now add an `onClick()` handler to the `<tr/>` in the `render()` method.

```javascript
<tr className={rowClass} onClick={() => {this.showDetail(employee)}}>
```
- Open your app and click on an employee... did it work!?!?!?


## Extra credit
Are you a true champion?  Make it possible to create a new employee.


&nbsp;
### Commit your changes to Git - congrats, you are a React/Redux Master.

```
git add .
git commit -m 'We are validating forms'
```
