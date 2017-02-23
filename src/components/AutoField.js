import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import {
  sequelizeTypeMapping,
  typeComponentMapping,
  readOnlyTypeComponentMapping,
} from '../defaultMappings';
import { namify } from '../helpers/text';
import FieldFormControl from './FieldFormControl';
import FieldDisplay from './FieldDisplay';
import LabelValue from './LabelValue';

const defaultSpec = { type: 'string' };

const selectFormState = (reduxFormState, form, key) => {
  return key && reduxFormState && reduxFormState[form] &&
    reduxFormState[form].values &&
    reduxFormState[form].values[key];
};

class AutoField extends Component {
  render() {
    const { field, reduxFormState, dispatch, ...propsSpec } = this.props;
    const context = this.context;

    const formSpec = context.fieldSpec && context.fieldSpec.fields &&
      context.fieldSpec.fields[field] ||
      {};
    const modelSpec = context.model && context.model[field] || {};
    const mappedType = sequelizeTypeMapping[modelSpec.type];
    if (mappedType) {
      modelSpec.type = mappedType;
    }
    const starSpec = context.fieldSpec && context.fieldSpec.fields &&
      context.fieldSpec.fields['*'] ||
      {};

    const spec = Object.assign({}, defaultSpec, modelSpec, formSpec, starSpec, propsSpec);
    const readOnly = context.fieldSpec.readOnly || spec.readOnly;

    const typeComponent = readOnly
      ? readOnlyTypeComponentMapping[spec.type]
      : typeComponentMapping[spec.type];

    const defaultComponent = readOnly? LabelValue : FieldFormControl;

    spec.component = spec.component || typeComponent || defaultComponent;
    spec.label = spec.label || namify(field);

    const { dependant, noLabel, label, ...forwardedProps } = spec;

    forwardedProps.placeholder = forwardedProps.placeholder || 'Enter ' + label;

    if (spec.realtimeValidation) {
      forwardedProps.validate = spec.validation;
    }

    const dependantState = selectFormState(
      reduxFormState,
      context.form,
      dependant,
    );

    const hidden = !dependantState && dependant;

    const Component = readOnly? FieldDisplay : Field;
    return !hidden ? (
        <Component name={field} className={'field_' + field} {...forwardedProps}>
          {!spec.noLabel && spec.label}
        </Component>
      ) : <span></span>;
  }
}

AutoField.contextTypes = {
  fieldSpec: React.PropTypes.object,
  model: React.PropTypes.object,
  form: React.PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  return { reduxFormState: state.form };
}

AutoField = connect(mapStateToProps, undefined)(AutoField);

export { AutoField };
