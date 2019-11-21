import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;
    // const { id, userId, ...initialValues } = this.props.stream
    // Then - <StreamForm initialValues={ initialValues } />

    // Or import lodash => {_.pick(this.props.stream, 'title', 'description' )}

    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={{ title, description }}
          // StreamForm is wrapped by redux-form helper. If typed {{ title: "EDIT ME", descripiton: "CHANGE" }} - Field in streamForm will look at the initial values that we passed in - search for initial value's property's name that match with its name and set as initial values for the Field. {this.props.stream} is an object with "title" and "description" property
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
