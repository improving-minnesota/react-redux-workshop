---
title: Forms and Validation
index: 5
---

# Lab Five - Forms and Validation

## Switch to Lab05

* In a terminal:

```
cd ../ # presuming still in previous lab
cd lab-05
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

* The first component we need is a form to contain all of our employee's properties.
* Open **src/employees/EmployeeForm.js**.

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
      { ({ isValid, errors, touched, handleReset, handleSubmit }) => (
        <Form>
        
        </Form>
      )}
    </Formik>
  );
}
```

> This block defines the `Formik` Higher-Order-Component (HOC) - this is a wrapper around a child `Form` which adds behaviors to make it more capable than it is by itself.
  This component takes initial values to populate the form with (or reset the form to if the user wants to reset) as well as hooks to call functions for validation and submission.
  Within the `Formik` component is something called a "render prop" - this is a more advanced pattern that is used by some third-party libraries to allow you to define content
  to be nested inside third-party components while still retaining the ability to apply custom logic, styles, etc like you could in your own React code.
  
> Note the five render props being passed down - 'isValid', 'errors', 'touched', 'handleReset', and 'handleSubmit'. These are all values and functions provided by Formik. The first two give us access
  to the validation state of the form (true or false) and what errors exist in the form, 'touched' tells us what fields the user has interacted with, and the last two are event handlers that can be called to submit or reset the form. Formik provides
  a *ton* more props for more advanced scenarios, but we don't need them here.
  
* Great! We have an empty form...probably need to add some content in there.

* A helpful member of your team has created a reusable component for Forms that takes care of wrapping an input element with an appropriate label and validation logic. Let's just reuse that! Hooray for reusable shared components!

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

```jsx:title=src/employees/EmployeeForm.js
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

* We're simply checking that we have values for a few fields. Formik will automatically call this as the user inputs data and will reflect those errors back to the user via our **FieldWrapper** components.
* Until now we've assumed that the user is creating a new employee record. What if the `EmployeeForm` is being used to edit an existing employee?
* We already know that this component can receive an `employee` in its props, what we need to do is update the form to reflect that employee's values.
* The `Formik` component gives us the `initialValues` prop to do this. Replace the empty declaration you currently have with the following:

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
* Open **/src/employees/EmployeeDetail.js**
* Let's setup our local state, first. We will need to set the initial state of our employee object, like so:

```jsx
  state = {
    employee: null
  };
```

* Next, let's fetch the employee data. We'll want to call the API when the component mounts and set the local state with the employee object. We can use the `axios` library to help us make HTTP requests.

```jsx
  async componentDidMount() {
    const { match } = this.props;
    const { _id } = match.params;
    const { data: employee } = await Axios.get(url(_id));
    this.setState({ employee });
  }
```

* We use react-router to give us the parameters that `match`-ed from the `Route` - in this instance, we'll get the employee ID from the URL. We use that to fetch the corresponding employee record.

* Next, let's update the render function to include the `EmployeeForm`, and pass it all the props it needs:

```jsx
render() {
  return (
    <div>
      <h1>Employee Detail</h1>
      <EmployeeForm
        employee={this.props.employee}
        handleSave={this.handleSave}
      />
    </div>
  );
}
```

* Notice that we're passing `EmployeeForm` a reference to `this.handleSave`, which we still need to define:

```jsx
handleSave = (values) => {
    const { history } = this.props;

    const result = values._id ? this.onUpdate(values) : this.onCreate(values);
    result.then(() => {
      history.push('/employees');
    });
};
```

* When handleSave is called we'll:
  - Check to see if the record being saved already has an ID - if yes it's an update, if not it's a create.
  - We call the corresponding handler function to begin the appropriate async function
  - Once complete, we'll tell react-router to send the user back to the "/employees" route so they see the table.

* Finally, we'll implement the `onUpdate` and `onCreate` functions, to persist the employee with our PUT and POST APIs.

```jsx
 onUpdate = async employee => {
    const response = await Axios.put(url(employee._id), employee);
    return response.data;
  };

  onCreate = async employee => {
    const response = await Axios.post(url(employee._id), employee);
    return response.data;
  };
```

&nbsp;

## Test the Employee Detail Component

* Open **/src/employees/EmployeeDetail.test.js**
* Use jest.mock to mock our API calls
* Add a test to verify the component renders as expected:

```jsx
jest.mock('axios', () => ({
  get: jest.fn(),
  put: jest.fn(),
  post: jest.fn()
}));

describe('<EmployeeDetail />', () => {
  it('should instantiate the Employee Detail Component', () => {
    const component = mount(<EmployeeDetail />);
    component.setState({ employee: { _id: 1 } });

    expect(component).toIncludeText('Employee Detail');
  });
});
```

* Run the tests and verify that they pass before moving on to the next section.

## Add navigation to the Employee Detail Component

* We have an Employee Detail route, but there's no way to get to it yet.
* We're going to add functionality so that when you click an **EmployeeRow**, the router will transition to the appropriate detail route for the employee.

- Open **/src/employees/EmployeeRow.js**

- Add the `showDetail()` method to the **EmployeeRow**

```jsx
showDetail = () => {
  const { history, employee } = this.props;
   
   if (employee.deleted) {
     console.log('You cannot edit a deleted employee.');
     return;
   }

   history.push(`/employees/detail/${employee._id}`);
};
```

* This first checks to see if the employee has been deleted and prevents viewing it if so
* Then it uses the **history** prop provided by `react-router` to change the current URL programmatically (and thus change the matched route)

* Now add an `onClick()` handler to the `<tr/>` in the `render()` method.

```jsx
<tr className={employee.deleted ? 'deleted' : ''} onClick={this.showDetail}>
```

* Open your app and click on an employee... did it work!?!?!?

## Add ability to create a new Employee

* Navigate to **src/employees/Employees.js**.
* Let's add a new Button the user can click to create an Employee. Add this next to the `EmployeeTable`:

```jsx
<Link to="/employees/detail">
  <Button bsStyle="primary">
    New Employee
  </Button>
</Link>
```

* What's going on here? We're using a **react-router** `Link` element which, when clicked, will send the user to the Route that causes the EmployeeDetail component to render. Inside the Link we specify a component to render that is clickable.

* That's it! We already made our EmployeeDetail component smart enough to know that, if it wasn't given an Employee object with an ID set, that we were creating a new one. Cool!

## Extra credit

The **ProjectDetail** component has been implemented already. Can you get it hooked up to allow Project create/update? How about adding Delete/Restore to the ProjectTable?

Are you a true champion? Figure out how to add validation to prevent the user from creating an Employee with the same name or username as an existing Employee.

Hint: You might be tempted to drag data down to use it in child components, but it's sometimes easier to leave data up high and pass down worker functions from a parent to a child component.

### Commit your changes to Git - congrats, you are a Forms Master.

```
git add .
git commit -m "We are validating forms"
```
