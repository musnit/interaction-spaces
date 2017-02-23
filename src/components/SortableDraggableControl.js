import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, InputGroup, Button, Image } from 'react-bootstrap';
import _ from 'lodash';
import SortableDraggable from '~/src/components/draggable/SortableDraggable'

export default class SortableDraggableControl extends Component {
  constructor(props) {
    super(props);
    this.moveItem = this.moveItem.bind(this);
    this.findItem = this.findItem.bind(this);
  }

  moveItem(id, atIndex) {
    let currentItems = _.map(this.props.input.value, _.clone)
    const { item, index } = this.findItem(id);
    const itemAtIndex = currentItems[atIndex];
    currentItems[atIndex] = item;
    currentItems[index] = itemAtIndex;

    this.props.input.onChange(currentItems);
  }

  findItem(id) {
  	const item = this.props.input.value.filter(i => i.id === id)[0];

  	return {
      item,
      index: this.props.input.value.indexOf(item)
  	}
  }

  render () {
    const {
    	input,
    	meta,
    	showPlusIcon,
    } = this.props;

    return (
      <FormGroup controlId={input.name} validationState={meta.error ? 'error' : meta.success? 'success' : null}>
        <div style={{margin: '0 auto', width: '330px', position: 'relative'}}>
        <div style={{position: 'absolute',left: '-120px', top: '20px', bottom: '20px'}}>
          <div style={{textAlign: 'center', color:"#225284", marginBottom: '20px', fontSize: '12px', width: '78px', fontWeight: 'bold'}}>Most Important</div>
          <div style={{borderLeft: '2px dashed #225284', height: 'calc(100% - 100px)', marginLeft: '34px'}}></div>
          <div style={{textAlign: 'center', color:"#225284", marginTop: '20px', fontSize: '12px', width: '78px', fontWeight: 'bold'}}>Least Important</div>
        </div>
        {
        	this.props.input.value.map(item =>
            <div style={{marginBottom: '40px', marginTop: '10px'}} key={item.id}>
          		<SortableDraggable
                id={item.id}
                description={item.description}
                name={item.name}
                moveItem={this.moveItem}
                findItem={this.findItem}
          		/>
            </div>)
        }
        </div>
      </FormGroup>
    );
  }
}
