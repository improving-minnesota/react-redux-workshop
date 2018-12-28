---
title: Forms and Validation
index: 5
---

# Lab Five - Forms and Validation

## Switch to the Lab05 branch

* In a terminal:

```
git checkout lab-05
yarn start
```

### Check it out!

* While we were working on the last lab, the rest of the team was adding lots of new stuff to the app
* Before proceeding, let's look at the progress that has been made:
  * The component files needed to create and edit employees, timesheets, and timeunits have been created for you. This lab will walk you through the implementation of some of those features.
  * You'll also notice that **React Router** has been added to some of our previous components. More on that later.

### Add the Routes for Create/Update

* Before we can do anything, we need to add more routes to our application and tie them together with the appropriate handlers.
* Open **src/App.js** and update the Routes under the 'Switch' tag to match the following:

```jsx:title=src/App.js
<Route exact path="/projects" component={Projects} />
<Route exact path="/projects/detail/:_id?" component={ProjectsDetail} />

<Route exact path="/employees" component={Employees} />
<Route exact path="/employees/detail/:_id?" component={EmployeeDetail} />

<Route exact path="/timesheets" component={Timesheets} />
<Route exact path="/timesheets/detail/:_id?" component={TimesheetsDetail} />

<Route
  exact
  path="/timesheets/detail/:timesheet_id/timeunits/detail/:_id?"
  component={TimeunitsDetail}
/>

<Redirect to="/employees" />
```

> Take the time to check out the path declarations and how they are adding route params that are dynamically replaced.

### Formik? What's this Formik thing?

If we really wanted to, we could absolutely create our own user input/validation framework from scratch in React, but why reinvent the wheel when there's awesome libraries out there that do the heavy lifting for us.
In the real world, you'll almost certainly use one of several popular User Input/Form libraries such as [Redux Form](https://redux-form.com), [React Final Form](https://github.com/final-form/react-final-form), or [Formik](https://jaredpalmer.com/formik).
For this example application, we're using Formik.

Formik is a wrapper around Forms that takes care of some basic considerations like setup/reset/teardown, validation, and state management. It's a very lightweight solution which means it's easy to setup and very fast, but it doesn't do as much for you as others like `redux-form` which can lead to some boilerplate (but way less than you'd have doing it all yourself!)

### Add Create/Edit Employee Functionality

* Now let's set up a way to edit an employee.

###### Before we get started, take the time to look at the custom form components already implemented for us.

* The first component we need is a form to contain all of our employee's properties.
* Open **src/components/employees/EmployeeForm.js**.

* Let's review the `props` of this component:

  * employee : the employee we will be editing
  * handleSave: the callback to call when the user submits the form

* We need to define the Form element and integrate it with Formik so we get all of the helpful validation and support mechanisms.

```jsx
render() {
  const { employee } = this.props;

  return (
    <Formik
      initialValues={{}}
      validate={ this.validate }
      onSubmit={ this.handleSave }
    >
      { ({ isValid, errors, handleReset, handleSubmit }) => (
        <Form>
        
        </Form>
    </Formik>
  );
}
```

> This block defines the `Formik` Higher-Order-Component (HOC) - this is a wrapper around a child `Form` which adds behaviors to make it more capable than it is by itself.
  This component takes initial values to populate the form with (or reset the form to if the user wants to reset) as well as hooks to call functions for validation and submission.
  Within the `Formik` component is something called a "render prop" - this is a more advanced pattern that is used by some third-party libraries to allow you to define content
  to be nested inside third-party components while still retaining the ability to apply custom logic, styles, etc like you could in your own React code.
  
> Note the four render props being passed down - 'isValid', 'errors', 'handleReset', and 'handleSubmit'. These are all values and functions provided by Formik. The first two give us access
  to the validation state of the form (true or false) and what errors exist in the form, the last two are event handlers that should be called to submit or reset the form. Formik provides
  a *ton* more props for more advanced scenarios, but we don't need them here.
  
* Great! We have an empty form...probably need to add some content in there.

* A helpful member of your team has created a reusable component for Forms that takes care of wrapping the user input element with an appropriate label and validation logic. Let's just reuse that! Hooray for reusable shared components!

```jsx
<FieldWrapper type="text" name="username" label="Username" invalid={errors.username} touched={touched.username} />
<FieldWrapper type="text" name="email" label="Email" invalid={errors.email} touched={touched.email} />
<FieldWrapper type="text" name="firstName" label="First Name" invalid={errors.firstName} touched={touched.firstName} />
<FieldWrapper type="text" name="lastName" label="Last Name" invalid={errors.lastName} touched={touched.lastName} />
<FieldWrapper type="checkbox" name="admin" label="Admin" invalid={errors.admin} touched={touched.admin} />
```

* Here we're defining five fields - the `FieldWrapper` component takes a few props:
  * `type` is used to define what type of form field to render - text, checkbox, select menu, etc
  * `name` is a unique name within the form for the value of each field
  * `label` is the text to show next to the field so the user knows what it is
  * `invalid` is a hint to the field whether Formik's validation has any problems with the value in that field. It will be an error message if a validation issue was found
  * `touched` is a hint to the field as to whether the user has interacted with it yet

* Lastly we need to give the ability for the user to Save or Reset the form.

* At the very bottom of the `Form` element, we can add another nice reusable Form component somebody on our team created - the `FormControls` component. This contains a submit and reset button.

```jsx:title=src/components/employees/EmployeeForm.js
<FormControls
  allowSubmit={isValid}
  onSubmit={handleSubmit}
  onReset={handleReset}
/>
```

* Note how we're using another Formik-supplied value here `isValid` - this tells us whether the entire form has passed validation. Once it has, we'll enable the save button.

* There, our Form is complete. However, we need to finish implementing what should happen when the Form detects a submission.
* We've already told the `Formik` component to call `handleSave` in this situation. Here's what the `handleSave` function should look like:

```jsx
handleSave = (values) => {
  this.props.handleSave(values);
};
```

> Notice that we are not actually implementing the save function. That is left for the component that uses this form to implement and pass it in as a prop.

* `Formik` will let the user click the Submit button once the form is valid, passing the values from the form into our save handler, which then calls the handleSave prop passed down from Redux.
* We haven't defined `validate()` yet, so let's do that next. Here's what it should look like:

```jsx
validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }

  return errors;
};
```

* We're simply checking that we have values for all the fields. Our other handler functions will update the state appropriately as the user changes field values. But what if the `EmployeeForm` is being used to edit an existing employee?
* We already know that this component can receive an `employee` in its props, what we need to do is update the form to reflect that employee's values.
* The `Formik` components gives us the `initialValues` hook to do this. Replace the empty declaration you currently have with the following:

```jsx
initialValues={ {
  username: employee.username || '',
  email: employee.email || '',
  firstName: employee.firstName || '',
  lastName: employee.lastName || '',
  admin: employee.admin || '',
  _id: employee._id
} }
```

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
const mapStateToProps = (state, props) => {
  const { match } = props;
  const { _id } = match.params;
  return {
    employee: state.employees.employees.find(employee => employee._id === _id)
  };
};
```

* We use react-router to give us the parameters that `match`-ed from the `Route` - in this instance, we'll get the employee ID from the URL. We use that to find the corresponding employee record. If none exists, then we'll get `undefined`

* This component will also need the ability to update the Redux state through using the `EmployeeActions`, like so:

```jsx
const mapDispatchToProps = {
  onCreate: EmployeeActions.createEmployee,
  onUpdate: EmployeeActions.updateEmployee,
  getEmployee: EmployeeActions.getEmployee
};
```

* Next, let's update the render function to include the `EmployeeForm`, and pass it all the props it needs:

```jsx
render() {
  return (
    <div>
      <h1>Employees Detail</h1>
      <EmployeeForm
        employee={this.props.employee}
        actions={this.props.actions}
        handleSave={this.handleSave}
      />
    </div>
  );
}
```

* Notice that we're passing `EmployeeForm` a reference to `this.handleSave`, which we still need to define:

```jsx
handleSave = (values) => {
  const { onCreate, onUpdate, history } = this.props;

  const result = values._id ? onUpdate(values) : onCreate(values);
  result.then(() => {
    history.push('/employees');
  });
};
```

* Finally, we need to build a lifecycle hook so we can retrieve data as necessary when this component mounts. Go ahead and do that now, then we'll look at each part:

```jsx
componentDidMount() {
  const { match, getEmployee } = this.props;
  const id = match.params._id;
  getEmployee(id);
}
```

* First, we grab the `match` prop which is provided by **react-router** - this contains any URL path/request params that we can use
* We then use the ID we find in the path to retrieve the corresponding Employee

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
  iconst { history, employee } = this.props;
   
   if (employee.deleted) {
     console.log('You cannot edit a deleted employee.');
     return;
   }

   history.push(`/employees/detail/${employee._id}`);
}
```

* Now add an `onClick()` handler to the `<tr/>` in the `render()` method.

```jsx
<tr className={employee.deleted ? 'deleted' : ''} onClick={this.showDetail}>
```

* Open your app and click on an employee... did it work!?!?!?

## Add ability to create a new Employee

* Navigate to **src/components/employees/Employees.js**.
* Let's add a new Button the user can click to create an Employee. Add this next to the `EmployeeTable`:

```jsx
<Link to="/employees/detail">
  <Button floated="right" primary>
    New Employee
  </Button>
</Link>
```

* What's going on here? We're using a **react-router** `Link` element which, when clicked, will send the user to the Route that causes the EmployeeDetail component to render. Inside the Link we specify a component to render that is clickable.

* That's it! We made our EmployeeDetail component smart enough to know that, if it wasn't given an Employee object with an ID set, that we were creating a new one. Cool!

## Extra credit

Are you a true champion? Figure out how to add validation to prevent the user from creating an Employee with the same name or username as an existing Employee.

Hint: You might be tempted to drag data down to use it in child components, but it's sometimes easier to leave data up high and pass down worker functions from a parent to a child component.

### Commit your changes to Git - congrats, you are a React/Redux Master.

```
git add .
git commit -m 'We are validating forms'
```
