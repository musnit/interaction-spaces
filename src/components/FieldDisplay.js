import React, { Component } from 'react';
import { ControlLabel } from 'react-bootstrap';

export default class FieldDisplay extends Component {

  render () {
    const { hideIfEmpty, component, children, name, value, ...forwardedProps } = this.props;
    const fieldValue = value;
    const formValue = this.context.values[name];
    const valueProp = fieldValue || formValue;
    const Component = component;
    const hide = hideIfEmpty && !valueProp;
    return hide? <span></span> : <Component value={valueProp} {...forwardedProps} >
        {children}
      </Component>;
  }
}

FieldDisplay.contextTypes = {
  values: React.PropTypes.object,
};
