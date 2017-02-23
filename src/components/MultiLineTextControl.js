import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, InputGroup, Button, Image } from 'react-bootstrap';
import _ from 'lodash';

export default class MultiLineControl extends Component {
	constructor(props) {
    super(props);
  }

  onChangeText(event, index) {
  	// normally redux form handles getting the value from the event
  	// BUT, we want to the reshape value
  	let newFieldValue = event.nativeEvent.srcElement.value;
  	let lines = [
  		...this.props.input.value.splice(0, index),
  		newFieldValue,
  		...this.props.input.value.splice(index+1)
  	]

  	this.props.input.onChange(lines);
  }

  addLines() {
  	let lines = [...this.props.input.value, '']
  	this.props.input.onChange(lines);
  }

  renderControls() {
  	return this.props.input.value.map((line, index) => 
  		<FormControl
        className={this.props.className}
        style={{marginTop: '10px'}}
        key={index}
      	placeholder={this.props.placeholder} 
      	value={line} 
      	onChange={(event) => this.onChangeText(event, index)} />
  	);
  }
 
  render () {
    const { 
    	input, 
    	meta, 
    	icon, 
    	canAddLines, 
    	addMoreText,
    	showPlusIcon,
    } = this.props;
    return (
      <FormGroup controlId={input.name} validationState={meta.error ? 'error' : meta.success? 'success' : null}>
        {this.props.children && <ControlLabel>{this.props.children}</ControlLabel>}
        {icon && <div className='field-icon-holder'>
          <img className='field-icon' src={icon} />
        </div>}
        {meta.error && (
          <div className="field-error">{"* " + meta.error}</div>
        )}
        {this.renderControls()}
        { canAddLines && 
        	<Button 
        		className="btn-label"
        		onClick={() => this.addLines()}>
        			{ showPlusIcon && <Image style={{marginRight: '8px'}}src="/images/add.png"/> }
        			{addMoreText || 'Add More'}
        	</Button>}
        {<FormControl.Feedback />}
      </FormGroup>
    );
  }
}
