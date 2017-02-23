import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, InputGroup} from 'react-bootstrap';

export default class TextAreaControl extends Component {

  render () {
    const { placeholder, type, input, meta, icon, className} = this.props;
    const control = <FormControl type={type} className={className}
      placeholder={placeholder} value={input.value} onChange={input.onChange} componentClass="textarea" />;
    return (
      <FormGroup controlId={input.name} validationState={meta.error ? 'error' : meta.success? 'success' : null}>
        {this.props.children && <ControlLabel>{this.props.children}</ControlLabel>}
        {meta.error && (
          <div className="field-error">{"* " + meta.error}</div>
        )}
        {icon && <div className='field-icon-holder'>
          <img className='field-icon' src={icon} />
        </div>}
        {control}
        {<FormControl.Feedback />}
      </FormGroup>
    );
  }
}
