import React, { Component } from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";
// Field is a react component, reduxForm is a function same as connect

class StreamCreate extends Component {
  onSubmit = formValues => {
    // console.log(formValues) => {title:.., description:.. from field name -  WHY??????}
    this.props.createStream(formValues);
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createStream }
)(StreamCreate);

// Redux form will take the name property and look at the errors obj that returned from validate, if a field has a same name as property in the object, redux form will take the error message and pass it to renderInput function

// Connect takes separate arguments, reduxForm receives a single obj where we put different configuration
