import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import _ from 'lodash';

class AutoFormForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} id={this.props.form}>
        {this.props.children}
      </form>
    );
  }
}

AutoFormForm = reduxForm()(AutoFormForm);

class AutoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    return {
      values: this.props.initialValues,
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

AutoDisplay.childContextTypes = {
  values: React.PropTypes.object,
};

class AutoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    return {
      fieldSpec: this.props.spec,
      model: this.props.model,
      form: this.props.form,
    };
  }

  mapValues = (mapping, values) => {
    if (typeof mapping === 'function') {
      return mapping(values);
    }
    if (typeof mapping === 'string') {
      return _.get(values, mapping);
    }
    const results = {};
    Object.keys(mapping).forEach(mappingKey => {
      const mappingValue = mapping[mappingKey];
      const resultValue = _.get(values, mappingValue);
      const mappedResultValue = this.mapValues(mappingValue, values);
      let dependantActive = true;
      if (
        typeof mappingValue === 'string' &&
          this.props.spec.fields[mappingValue] &&
          this.props.spec.fields[mappingValue].dependant
      ) {
        const dependant = this.props.spec.fields[mappingValue].dependant;
        dependantActive = values[dependant];
      }
      const finalValue = dependantActive ? mappedResultValue : undefined;
      if (finalValue !== undefined) {
        results[mappingKey] = finalValue;
      }
    });
    if (Object.keys(results).length === 0) {
      return undefined;
    } else {
      return results;
    }
  };

  handleSubmit = values => {
    let errors = {};
    let fieldsWithValidation = Object
      .keys(this.props.spec.fields)
      .filter(field => 'validation' in this.props.spec.fields[field]);

    fieldsWithValidation.forEach(key => {
      let validations = this.props.spec.fields[key].validation;
      if (!Array.isArray(validations)) {
        validations = [ validations ];
      }
      validations.forEach(validation => {
        let error = validation(values[key], values);
        if (error) {
          errors[key] = error;
        }
      });
    });

    if (Object.keys(errors).length > 0) {
      // Not returning Promise.reject straight up since it seems that redux form is looking for this
      // particular error
      return Promise.resolve(errors).then(() => {
        throw new SubmissionError(errors);
      });
    } else {
      let updateValues = {};
      if (this.props.spec.fieldMapping) {
        updateValues = this.mapValues(this.props.spec.fieldMapping, values) ||
          {};
      } else {
        updateValues = Object.assign({}, values);
      }
      delete updateValues.autoFormMeta;
      return this.props.handleSubmit(updateValues);
    }
  };

  render() {
    let mappedInitialValues = {};
    if (this.props.spec.inverseFieldMapping) {
      mappedInitialValues = this.mapValues(
        this.props.spec.inverseFieldMapping,
        this.props.initialValues,
      );
    }

    return (
      this.props.spec.readOnly?
        <AutoDisplay initialValues={mappedInitialValues} >
          {this.props.children}
        </AutoDisplay> :
        <AutoFormForm
          ref={(c) => { this.form = c; }}
          form={this.props.form}
          onSubmit={values => this.handleSubmit(values)}
          onSubmitFail={(errors) => this.props.onSubmitFail(errors)}
          initialValues={mappedInitialValues}
        >
          {this.props.children}
        </AutoFormForm>
    );
  }
}

AutoForm.childContextTypes = {
  fieldSpec: React.PropTypes.object,
  model: React.PropTypes.object,
  form: React.PropTypes.string,
};

export { AutoForm };
