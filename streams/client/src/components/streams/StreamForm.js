import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

// Field is a react component, reduxForm is a function same as connect

class StreamForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    // This syntax will take in input objects and add all key value pairs as properties to input element
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
    // Instead of {...formProps.input}

    // <input onChange={formProps.input.onChange} value={formProps.input.value}/>;
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    // console.log(this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        {/* checkbox, text input, dropdown etc. 
        whenever use it should provide props */}
        {/* Field is about hooking up the Redux Form infrastructure, if need to show content, we need component prop. Everytime Field call component, will pass in props*/}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        {/* Doesn't know what to do with label prop and will by default pass to renderInput function */}
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;

  // When valid - returns an empty object, if not returns an object that has key-value pair for each field
};

export default reduxForm({
  form: "streamForm",
  validate
})(StreamForm);

// Redux form will take the name property and look at the errors obj that returned from validate, if a field has a same name as property in the object, redux form will take the error message and pass it to renderInput function

// Connect takes separate arguments, reduxForm receives a single obj where we put different configuration
