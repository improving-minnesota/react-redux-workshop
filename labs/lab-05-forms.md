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

## Run the application and see your work.

If you haven't already done so,
- In a terminal window run: `npm start` to fire off the build.
- Navigate to [http://localhost:3000](http://localhost:3000) in your favorite browser.
- What happens when you try to edit a timesheet?


### Add Edit Timesheet Functionality

- Our routing is in place, and we're correctly navigating to the timesheet page, but it's empty!
- First, let's look at how we're getting to the timesheet editor.  Open ```TimesheetRow.js``` and notice a few things.
  - As mentioned earlier, this component is importing some functionality from ```react-router``` like so:
    - ```import { withRouter } from 'react-router';```
  - Then, when exporting the component, we are doing so using ```withRouter```.
    -  ```export default withRouter(TimesheetRow);```
  - This wraps our component in a Router component, which will give it the ability to redirect to other routes.  
  - Take a look at the ```showDetail``` function, which runs when the user clicks on a timesheet row:
    -  ```this.props.history.push('/employees/' + timesheet.user_id + '/timesheets/detail/' + timesheet._id);```
    - This is the line that actually directs the user to the specific timesheet detail page.  Look at the routes we defined earlier to see which component should be displayed.
    

###### Now let's take the time to look at the Timesheet form component and give it some new powers.

- The first component we need is a form to contain all of our timesheet's properties.
- Open **/src/components/timesheets/TimesheetForm.js**.
- You'll notice there are a bunch of validation functions in here. For example:
```javascript
  handleEmployeeChange(value) {
    let isValid = false;
        if(value){
           isValid = true;
        }
        return this.setState({ user_id: {value: value, valid: isValid }});
    }
```

- This function will be called when the user selects a new employee.  Once the user does so, the field will be marked as valid in the component's state.
- Let's hook our component up to our validation functions by returning this from our ```render()``` method:

```javascript
    return (
      <form>
        <FormGroup
          controlId="name"
          validationState={this.getNameValidationState()}
        >
          {!this.props.timesheet._id &&
            <div>
              <ControlLabel>Username</ControlLabel>
              <FormControl
                componentClass="select"
                onChange={(e) => this.handleEmployeeChange(e.target.value)}
              >
                <option value="" disabled selected>Select an employee</option>
                  {
                    this.props.employees
                      .map((employee) => {
                          return <option value={employee._id}>{employee.username}</option>
                      })
                  }
              </FormControl>
            </div>
          }
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name.value}
            placeholder="Enter name"
            onChange={(e) => this.handleNameChange(e.target.value)}
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
            onChange={(e) => this.handleDescriptionChange(e.target.value)}
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
            onChange={(e) => this.handleBeginDateChange(e.target.value)}
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
            onChange={(e) => this.handleEndDateChange(e.target.value)}
          />
          <FormControl.Feedback />
        </FormGroup>

        <Button bsStyle="success" onClick={this.handleSave} disabled={!this.validateAll()}> Save </Button>&nbsp;
        <LinkContainer to="/employees/all/timesheets">
          <Button bsStyle="danger"> Cancel </Button>
        </LinkContainer>
      </form>
    )
```


- There are still two functions that need to be implemented: ```componentWillReceiveProps``` and ```handleSave```.
- Here's what your ```componentWillReceiveProps``` function should look like:
```javascript
  componentWillReceiveProps(nextProps) {
    this.state = {
      name: {value: nextProps.timesheet.name, valid: null},
      description: {value: nextProps.timesheet.description, valid: null},
      beginDate: {value: nextProps.timesheet.beginDate, valid: null},
      endDate: {value: nextProps.timesheet.endDate, valid: null}
    };
  }
```
- This means that, if the TimesheetForm is being used to view an existing timesheet, that the component's state values will reflect those in the existing timesheet.
- And here's the function that runs when the user clicks the save button, ```handleSave```:
 ```javascript
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
- What is ```this.validateAll()``` doing?

TODO: the rest

&nbsp;
## Add the Form into an Employee Detail Component

- Now let's actually use the form we just built.

- Before we get started, an **EmployeeMixin** with basic form validation has been implemented for you.
  - Open **client/src/mixins/employee.mixin.js** and look at everything in it:
    - Attaching the **EmployeeStore** to the component.
    - `validate()` `validateAll()` `hasErrors()` and `toggleAdmin()` method implementations.
    - Basic validation for our form


- Open **client/src/components/employee.detail.jsx**

- Add the following mixins:
  - **Router.Navigation** gives us access to the `transitionTo()` method.
  - **Router.State** give us access to the `getParams()` method
  - **EmployeeMixin** is the mixin that provides basic validation for our employee


```javascript
mixins: [
  Router.Navigation,
  Router.State,
  EmployeeMixin
],
```

- Next, let's provide a default state for the component:

```javascript
getInitialState: function () {
  return {
    saveText: 'Update',
    employee: {},
    errors: {}
  };
},
```

- The next step is hook our component up to our Flux architecture.

```javascript
onChange: function () {
  this.setState(this.store.getState());
},

componentWillMount: function () {
  this.store.addChangeListener(this.onChange);
},

componentWillUnmount: function () {
  this.store.removeChangeListener(this.onChange);
},
```

- If the user refreshes the page or navigates directly to the employee edit route, we need to get the employee from our REST service.

- We'll use the `componentDidMount` lifecycle event to make this call so the store's listeners have been registered.

```javascript
componentDidMount: function () {
  this.get();
},

get: function () {
  // get the employee from the store
  var employee = this.store.getState().employee;

  // if there isn't an employee in the store
  if (_.isEmpty(employee)) {

    // get the id from the url for this route and fire the action
    var employeeId = this.getParams()._id;
    EmployeeActions.get(employeeId);
  }
  else {
    // manually call the onChange method so that the component knows to update itself
    this.onChange();
  }
},
```

- We need to provide the **EmployeeForm** with a callback to call when the save button is clicked.
  - We'll first validate the entire form to make sure none of the inputs have validation errors.
  - If there aren't any errors, we'll fire the update action and transition back to the `employees` route.

```javascript
saveEmployee: function (event) {
  event.preventDefault();
  this.validateAll();

  if (!this.hasErrors()) {
    EmployeeActions.update(this.state.employee);
    this.transitionTo('employees');
  }
},

```

- Finally, we just need to use the form and pass it all of the props it is expecting in our `render()` method.

```javascript
render : function () {
  return (
    <EmployeeForm employee={this.state.employee}
      errors={this.state.errors}
      validateAll={this.validateAll}
      hasErrors={this.hasErrors}
      saveText={this.state.saveText}
      onSave={this.saveEmployee}
      validate={this.validate}
      toggleAdmin={this.toggleAdmin} />
  );
}
```

&nbsp;
## Test the Employee Detail Component

- Open **client/src/components/employee.detail.spec.js**
- Uncomment the spies and add the following suites:

```javascript
describe('getting the employee', function () {
  describe('and the employee exists on the store state', function () {
    beforeEach(function () {
      element.store.state.employee = {_id: 'abc123'};
      element.get();
    });

    it('should set the employee on the component state', function () {
      expect(element.state.employee._id).to.equal('abc123');
    });
  });

  describe('and the employee does NOT exist in the stored state', function () {
    beforeEach(function () {
      element.get();
    });

    it('should fire a get employee action', function () {
      expect(proxies['../../actions/employee.actions'].get).to.have.been.calledWith('abc123');
    });
  });
});

describe('saving an employee', function () {
  beforeEach(function () {
    element.saveEmployee({preventDefault: _.noop});
  });

  it('should validate the entire employee', function () {
    expect(spies.validateAll).to.have.been.called;
  });

  describe('and the employee passes validation', function () {
    beforeEach(function () {
      spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
    });

    afterEach(function () {
      spies.hasErrors.restore();
    });

    it('should fire an update action', function () {
      expect(proxies['../../actions/employee.actions'].update).to.have.been.called;
    });

    it('should transition back to the employee list', function () {
      expect(spies.transitionTo).to.have.been.calledWith('employees');
    });
  });
});
```

- Run the tests and verify that they pass before moving on to the next section.

## Add navigation to the Employee Detail Component

- We have an Employee Detail route, but there's no way to get to it yet.
- We're going to add functionality so that when you click an **EmployeeRow**, the router will transition to the appropriate detail route for the employee.


- Open **client/src/components/employees/employee.row.jsx**

- Add the `showDetail()` method to the **EmployeeRow**

```javascript
showDetail: function showDetail () {
  var employee = this.props.employee;
  if (employee.deleted) {
    console.log('You cannot edit a deleted employee.');
    return;
  }
  this.props.store.setState({employee: employee});
  this.transitionTo('employees.detail', {_id: employee._id});
},
```

- Now add an `onClick()` handler to the `<tr/>` in the `render()` method.

```javascript
<tr className={classNames} ref={employee._id} onClick={this.showDetail}>
```

- Let's test that clicking the row actually navigates to where it's supposed to:

- Open **client/src/components/employees/employee.row.spec.js**
- Add the following suites to the end of the **Employee Row Component** suite:

```javascript
describe('clicking the row', function () {
  describe('when the employee is deleted', function () {
    beforeEach(function () {
      employee = {
        _id: 'abc123',
        deleted: true
      };

      element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} store={EmployeeStore} />);
      element.showDetail();
    });
  });

  describe('when the employee is NOT deleted', function () {
    beforeEach(function () {
      employee = {
        _id: 'abc123',
        username: 'sterlingArcher',
        deleted: false
      };

      element = TestUtils.renderIntoDocument(<EmployeeRow employee={employee} store={EmployeeStore} />);
      spies.transitionTo = sinon.stub(element, 'transitionTo');
      element.showDetail();
    });

    afterEach(function () {
      spies.transitionTo.restore();
    });

    it('should set the employee on the stored state', function () {
      expect(element.props.store.getState().employee.username).to.equal('sterlingArcher');
    });

    it('should transition to the detail route', function () {
      expect(spies.transitionTo).to.have.been.calledWith('employees.detail', {_id: 'abc123'});
    });
  });
});
```

- Run the tests and verify that all of them pass before moving to the next section.

&nbsp;
## Run the application and see your work.

If you haven't already done so,
- In a terminal windows run: `gulp watch:dev` to fire off the build.
- In a separate terminal run: `gulp serve:dev` to serve the index.html.
- Navigate to [http://localhost:3000](http://localhost:3000) in your favorite browser.

- Try navigating to an employee detail by clicking on a row in the table and editing the employee. Did it save correctly?

![](img/lab05/edit.employee.png)


&nbsp;
## Add the Ability to Create an Employee

- Open **client/src/components/employees.create.jsx**
- Following the same steps you did for the **EmployeeDetail** component, implement and test the **EmployeeCreate** component.

```javascript
mixins : [
  Router.Navigation,
  Router.State,
  EmployeeMixin
],

onChange: function () {
  this.setState(this.store.getState());
},

componentWillMount: function () {
  this.store.addChangeListener(this.onChange);
},

componentWillUnmount: function () {
  this.store.removeChangeListener(this.onChange);
},

getInitialState: function () {
  return {
    saveText: 'Create',
    employee: {
      admin:false
    },
    errors: {}
  };
},

saveEmployee: function (event) {
  event.preventDefault();
  this.validateAll();

  if (!this.hasErrors()) {
    EmployeeActions.create(this.state.employee);
    this.transitionTo('employees');
  }
},

render : function () {
  return (
    <EmployeeForm employee={this.state.employee}
      errors={this.state.errors}
      validateAll={this.validateAll}
      hasErrors={this.hasErrors}
      saveText={this.state.saveText}
      onSave={this.saveEmployee}
      validate={this.validate}
      toggleAdmin={this.toggleAdmin} />
  );
}
```

- Now test it!!
- Open **client/src/components/employees.create.spec.js** and add the tests.
  - You'll have to uncomment the spies for them to work.

```javascript
describe('saving an employee', function () {
  beforeEach(function () {
    element.saveEmployee({preventDefault: _.noop});
  });

  it('should validate the entire employee', function () {
    expect(spies.validateAll).to.have.been.called;
  });

  describe('when the employee passes validation', function () {
    beforeEach(function () {
      spies.hasErrors = sinon.stub(element, 'hasErrors').returns(false);
    });

    afterEach(function () {
      spies.hasErrors.restore();
    });

    it('should fire a create action', function () {
      expect(spies.create).to.have.been.called;
    });

    it('should transition back to the employee list', function () {
      expect(spies.transitionTo).to.have.been.calledWith('employees');
    });
  });
});
```

- Now, we need a way to get there.  Let's add a button in the **Employees** component that navigates to the create employee route.

- Open **client/src/components/employees.jsx**

- Add the callback to navigate to the `employee.create` route:

```javascript
  createNew: function createNew () {
    this.transitionTo('employees.create');
  },
```


- In the `render()` method add the button below in place of the comment:

```javascript
<div className="row">
  <button className="ui right floated primary button pad-bottom" type="button" onClick={this.createNew}>
    New Employee
  </button>
</div>
```

- Then, lets test it, of course!:

- In **client/src/components/employees.spec.js** add:

```javascript
describe('clicking the new employee button', function () {
  it('should transition to the create employee route', function () {
    var button = TestUtils.findRenderedDOMComponentWithTag(element, 'button');
    TestUtils.Simulate.click(button);
    expect(spies.transitionTo).to.have.been.calledWith('employees.create');
  });
});
```

- Run the tests and watch them pass.

&nbsp;
## Run the application and see your work.

If you haven't already done so,
- In a terminal windows run: `gulp watch:dev` to fire off the build.
- In a separate terminal run: `gulp serve:dev` to serve the index.html.
- Navigate to [http://localhost:3000](http://localhost:3000) in your favorite browser.

- Click the create employee button.

![](img/lab05/employees.png)

- Attempt to create an employee. Did you get any validation errors?

![](img/lab05/validation.errors.png)


&nbsp;
### Commit your changes to Git and get ready for the next lab.

```
git add .
git commit -m 'We are validating forms'
```
