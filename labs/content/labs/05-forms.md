---
title: Forms and Validation
index: 5
---

# Lab Five - Forms and Validation

## `cd` to the fifth lab

* In a terminal:

```
cd ../ # presuming still in first lab
cd lab-05-form-validation
yarn start
```

### Check it out!

* Let's look at the progress that has already been completed on the application by the rest of the team.
  * The component files needed to create and edit employees, timesheets, and timeunits have been created for you. This lab will walk you through the implementation of some of those features.
  * You'll also notice that **React Router** has been added to some of our previous components. More on that later.

### Add the Routes for Creating and Updating

* Before we can do anything, we need to add more routes to our application and tie them together with the appropriate handlers.
* Open **src/App.js** and add the routes below under the 'Switch' tag (on the same level as your other routes):

```jsx:title=src/App.js
<Route path='/employees/detail/:_id' component={EmployeesDetail} />
<Route path='/employees/create' component={EmployeesCreate} />

<Route exact path='/employees/:user_id/timesheets/detail/:_id' component={TimesheetsDetail} />

<Route path='/employees/:user_id/timesheets/detail/:timesheet_id/timeunits/create' component={TimeunitsCreate} />
<Route path='/employees/:user_id/timesheets/detail/:timesheet_id/timeunits/detail/:_id' component={TimeunitsDetail} />

<Route path='/timesheets/create' component={TimesheetsCreate} />
```

> Take the time to check out the path declarations and how they are adding route params that are dynamically replaced.

### Add Edit Employee Functionality

* Now let's set up a way to edit an employee.

###### Before we get started, take the time to look at the custom form components already implemented for us.

* The first component we need is a form to contain all of our employee's properties.
* Open **src/components/employees/EmployeeForm.js**.

* Let's review the `props` of this component:

  * employee : the employee we will be editing
  * handleSave: the callback to call when the user submits the form
  * history: provided by `react-router`, this will allow the component to manipulate app's route

* Next we need to act when the user clicks the cancel or save buttons.
* First, add both buttons to the `render()` method of the EmployeeForm - these should be the final child elements of the `<form>`.

```jsx:title=src/components/employees/EmployeeForm.js
<Button bsStyle="success" onClick={this.handleSave} disabled={!this.validateAll()}> Save </Button>
<LinkContainer to="/employees">
  <Button bsStyle="danger"> Cancel </Button>
</LinkContainer>
```

* LinkContainer is a component that will allow us to easily reroute when clicked.
* The save button will call `this.handleSave`, which is the next function we should define.
* Here's what `handleSave` should look like:

```jsx
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

* If all the fields in the form are valid, we're calling the function that was passed down to us as the `handleSave` prop.
* We haven't defined `validateAll()` yet, so let's do that next. Here's what it should look like:

```jsx
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

* Here, we're simply checking that we have values for all the fields. Our other handler functions will update the state appropriately as the user changes field values. But what if the `EmployeeForm` is being used to edit an existing employee?
* We already know that this component can receive an `employee` in its props, what we need to do is update the state to reflect that employee's values.
* The `componentWillReceiveProps` is a nice place to do that. Here's what it should look like:

```jsx
componentWillReceiveProps(nextProps) {
  this.setState({
    username: {value: nextProps.employee.username, valid: null},
    email: {value: nextProps.employee.email, valid: null},
    firstName: {value: nextProps.employee.firstName, valid: null},
    lastName: {value: nextProps.employee.lastName, valid: null},
    admin: {value: nextProps.employee.admin, valid: null}
  });
}
```

* This function is called when the parent component updates this component's props. The new props are passed as an argument, so we use that to update the component's state. The component will then render as necessary.

* Now it's time to update our `render()` method to include the fields that our coworkers forgot to include! Looks like we don't have fields for email or firstName. Well, if you want something done right... Let's add them:

```jsx
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

## Add the Form into an Employee Detail Component

* Now let's actually use the form we just built.
* Open **/src/components/employees/EmployeesDetail.js**
* Let's setup our propTypes, first. We already have the `history` prop, but we need to include an `employee` prop as well, like so:

```jsx
EmployeesDetail.propTypes = {
  employee: PropTypes.object.isRequired,
  history: PropTypes.object,
};
```

* Next, let's hook up to the Redux architecture. The only thing we'll need from the Redux state is the employee, like so:

```jsx
const mapStateToProps = state => {
  return {
    employee: state.employees.employee,
  };
};
```

* This component will also need the ability to update the Redux state through using the `EmployeeActions`, like so:

```jsx
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(EmployeeActions, dispatch),
  };
};
```

* Next, let's update the render function to include the `EmployeeForm`, and pass it all the props it needs:

```jsx
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

* Notice that we're passing `EmployeeForm` a reference to `this.handleSave`, which we still need to define:

```jsx
handleSave(employee){
  this.props.actions.updateEmployee(employee).then(() => {
    this.props.history.push('/employees');
  });
}
```

* Finally, we need to build the constructor. Go ahead and do that now, then we'll look at each part:

```jsx
constructor(props) {
  super(props);

  const id = props.match.params._id;
  props.actions.getEmployee(id);

  this.handleSave = this.handleSave.bind(this);
}
```

* `super(props)` must be the first line in any react constructor
* Then, we grab the employee id from the URL parameter, and use it to retrieve that employee.
* Finally, we're forcing `this` to always be this component when `handleSave` is called by the child component.

&nbsp;

## Test the Employee Detail Component

* Open **/src/components/employees/EmployeesDetail.test.js**
* Update the test labeled `should instantiate the Employees Detail Component`:

```jsx
it('should instantiate the Employees Detail Component', () => {
  const component = mount(
    <MemoryRouter>
      <EmployeesDetail store={mockStore} />
    </MemoryRouter>
  );

  expect(component).toIncludeText('Employees Detail');
});
```

* Run the tests and verify that they pass before moving on to the next section.

## Add navigation to the Employee Detail Component

* We have an Employee Detail route, but there's no way to get to it yet.
* We're going to add functionality so that when you click an **EmployeeRow**, the router will transition to the appropriate detail route for the employee.

- Open **/src/components/employees/EmployeeRow.js**

- Add the `showDetail()` method to the **EmployeeRow**

```jsx
showDetail(employee) {
  if(employee.deleted) {
    console.log('You cannot edit a deleted employee.');
    return;
  }

  this.props.history.push('/employees/detail/' + employee._id);
}
```

* Now add an `onClick()` handler to the `<tr/>` in the `render()` method.

```jsx
<tr className={rowClass} onClick={() => {this.showDetail(employee)}}>
```

* Open your app and click on an employee... did it work!?!?!?

### Add Edit Timesheet Functionality

* Now that we can edit employees, let's try to create and edit timesheets.
* Click on a timesheet - our routing is in place, and we're correctly navigating to the timesheet page, but it's empty!

###### Now let's take the time to look at the Timesheet form component and give it some new powers.

* The first component we need is a form to contain all of our timesheet's properties.
* Open **src/components/timesheets/TimesheetForm.js**.
* You'll notice there are a bunch of validation functions in here. For example:
* This function will be called when the user selects a new employee. Once the user does so, the field will be marked as valid in the component's state.

```jsx:title=src/components/timesheets/TimesheetForm.js
handleEmployeeChange(value) {
  let isValid = false;
    if(value){
       isValid = true;
    }
  return this.setState({ user_id: {value: value, valid: isValid }});
}
```

Let's hook our component up to our validation functions by returning this from our `render()` method

```jsx
return (
  <form>
    <FormGroup controlId="name" validationState={this.getNameValidationState()}>
      {!this.props.timesheet._id && (
        <div>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={e => this.handleEmployeeChange(e.target.value)}
          >
            <option value="" disabled selected>
              Select an employee
            </option>
            {this.props.employees.map(employee => {
              return <option value={employee._id}>{employee.username}</option>;
            })}
          </FormControl>
        </div>
      )}
      <ControlLabel>Name</ControlLabel>
      <FormControl
        type="text"
        value={this.state.name.value}
        placeholder="Enter name"
        onChange={e => this.handleNameChange(e.target.value)}
      />
      <FormControl.Feedback />
    </FormGroup>
    <FormGroup
      controlId="description"
      validationState={this.getDescriptionValidationState()}
    >
      <ControlLabel>Description</ControlLabel>
      <FormControl
        type="text"
        value={this.state.description.value}
        placeholder="Enter description"
        onChange={e => this.handleDescriptionChange(e.target.value)}
      />
      <FormControl.Feedback />
    </FormGroup>
    <FormGroup
      controlId="beginDate"
      validationState={this.getBeginDateValidationState()}
    >
      <ControlLabel>Begin Date</ControlLabel>
      <FormControl
        type="text"
        value={this.state.beginDate.value}
        placeholder="YYYY-MM-DD"
        onChange={e => this.handleBeginDateChange(e.target.value)}
      />
      <FormControl.Feedback />
    </FormGroup>
    <FormGroup
      controlId="endDate"
      validationState={this.getEndDateValidationState()}
    >
      <ControlLabel>End Date</ControlLabel>
      <FormControl
        type="text"
        value={this.state.endDate.value}
        placeholder="YYYY-MM-DD"
        onChange={e => this.handleEndDateChange(e.target.value)}
      />
      <FormControl.Feedback />
    </FormGroup>
    <Button
      bsStyle="success"
      onClick={this.handleSave}
      disabled={!this.validateAll()}
    >
      {' '}
      Save{' '}
    </Button>&nbsp;
    <LinkContainer to="/employees/all/timesheets">
      <Button bsStyle="danger"> Cancel </Button>
    </LinkContainer>
  </form>
);
```

* There are still two functions that need to be implemented: `componentWillReceiveProps` and `handleSave`.
* Here's what your `componentWillReceiveProps` function should look like:

```jsx
componentWillReceiveProps(nextProps) {
  this.setState({
    name: {value: nextProps.timesheet.name, valid: null},
    description: {value: nextProps.timesheet.description, valid: null},
    beginDate: {value: nextProps.timesheet.beginDate, valid: null},
    endDate: {value: nextProps.timesheet.endDate, valid: null}
  });
}
```

* And here's the function that runs when the user clicks the save button, `handleSave`:

```jsx
handleSave(){
 if(this.validateAll()) {
   this.props.handleSave({
     name: this.state.name.value,
     description: this.state.description.value,
     beginDate: this.state.beginDate.value,
     endDate: this.state.endDate.value,
     user_id: this.props.timesheet.user_id ?  this.props.timesheet.user_id : this.state.user_id.value,
     _id: this.props.timesheet._id
   });
 }
}
```

* What is `this.validateAll()` doing?

## Add the Form into an Timesheet Detail Component

* Now let's actually use the form we just built.
* Open **src/components/timesheets/TimesheetsDetail.js**
* Take a look at that cool `constructor` method - how is it retrieving the timesheet to be viewed?
* We have two jobs to complete here!
  1.  Implement the dang `render` method
  2.  Implement the dang `handleSave` method
* Here's what your `render` method should look like:

```jsx:title=src/components/timesheets/TimesheetsDetail.js
render() {
  return (
    <Grid>
      <Row>
        <PageHeader>Timesheet Detail</PageHeader>
      </Row>
      <Row>
        <TimesheetForm timesheet={this.props.timesheet} actions={this.props.actions} handleSave={this.handleSave}/>
      </Row>
      { //Show timeunits after the getTimesheet() call finishes loading the timesheet
        this.props.timesheet && this.props.timesheet._id &&
        <Row>
          <Timeunits timesheet={this.props.timesheet} actions={this.props.actions}/>
        </Row>
      }
    </Grid>
  );
}
```

* Notice - we're only displaying a timesheet's timeunits once it's been retrieved.
* Here's what your `handleSave` method should look like:

```jsx
handleSave(timesheet){
  this.props.actions.updateTimesheet(timesheet).then(() => {
    this.props.history.push(`/employees/all/timesheets`);
  });
}
```

* Things to notice:

  * This looks great
  * After the `updateTimesheet` action completes, we're just sending the user back to the timesheet list

#### Just one more thing before you can use the `TimesheetsDetail` component

* Just kidding! You should be able to click a timesheet to view its details, and save.

## Add ability to create a new timesheet

* Navigate to **src/components/timesheets/TimesheetsCreate.js**.
* Let's create a constructor and talk about it:

```jsx:title=src/components/timesheets/TimesheetsCreate.js
constructor(props) {
  super(props);
  this.props.employeeActions.listEmployees();
  this.handleSave = this.handleSave.bind(this);
}
```

* This should all look pretty familiar, although you might be asking yourself... why are we retrieving all the employees? It's because the timesheet will have a select field whose options are all the existing employees!
* Next, let's implement our `handleSave` method:

```jsx
handleSave(timesheet){
  this.props.actions.createTimesheet(timesheet).then(() => {
    this.props.history.push('/employees/all/timesheets');
  });
}
```

* Finally, let's add our render method:
* Return to your app - now you should be able to create new timesheets!

```jsx
render() {
  return (
    <Grid>
      <Row>
        <PageHeader>Timesheet Create</PageHeader>
      </Row>
      <Row>
        <TimesheetForm employees={this.props.employees} handleSave={this.handleSave}/>
      </Row>
    </Grid>
  );
}
```

## Extra credit

Are you a true champion? Make it possible to create a new employee. Hint: look at how it works in timesheets!

### Commit your changes to Git - congrats, you are a React/Redux Master.

```
git add .
git commit -m 'We are validating forms'
```
