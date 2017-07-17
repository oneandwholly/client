import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const FILE_FIELD_NAME = 'files';

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}

class AddNewPost extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  onSubmit(data) {
    const setRedirectToTrue = function() {
      this.setState({ redirect: true });
    }
    this.props.upload(data, setRedirectToTrue.bind(this));
  }

  render() {
    const {
      handleSubmit,
      reset,
    } = this.props;
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <label htmlFor={FILE_FIELD_NAME}>Files</label>
          <Field
            name={FILE_FIELD_NAME}
            component={renderDropzoneInput}
          />
          <label>description:</label>
          <Field name="description" component="textarea" type="text" />
        </div>
        <div>
          <button type="submit">
            Submit
          </button>
          <button onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

const form = reduxForm({
  form: 'simple',
})(AddNewPost);

export default connect(null, actions)(form);
