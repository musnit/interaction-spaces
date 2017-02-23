import React, { Component, PropTypes } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Image,
  Button,
} from 'react-bootstrap';

export default props => {
  const { placeholder, input, meta, children, imageUrl } = props;
  return <FormGroup
    controlId={input && input.name}
    validationState={meta.error ? 'error' : meta.success ? 'success' : null}
  >
    {children && <ControlLabel>{children}</ControlLabel>}
    <div>
      <Image src={props.input.value ? props.input.value : placeholder} circle />
      <Button style={{marginLeft: 20}} onClick={_ => alert('in progress...')}>Upload Photo</Button>
    </div>
    {<FormControl.Feedback />}
  </FormGroup>
}
