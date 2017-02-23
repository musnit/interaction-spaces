import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, InputGroup} from 'react-bootstrap';
import { Checkbox } from 'react-bootstrap';

export default class FieldFormControl extends Component {

  render () {
    const { placeholder, type, input, meta, icon, className} = this.props;
    const control = 
      <Checkbox 
        checked={input.value} 
        value={input.value} 
        className={className}
        onChange={input.onChange}>
        {this.props.children}
      </Checkbox>;
    return (
      <FormGroup controlId={input.name} validationState={meta.error ? 'error' : meta.success? 'success' : null}>
        {control}
        {<FormControl.Feedback />}
      </FormGroup>
    );
  }
}
