import React, { Component } from 'react';
import {Modal, FormGroup, FormControl, ControlLabel, InputGroup, Button} from 'react-bootstrap';
import InputRange from 'react-input-range';

import DefaultStyles from './slider.css';
import SortableDraggableButton from '~/src/components/draggable/SortableDraggableButton';


export default class SliderControl extends Component {
	constructor(props) {
    super(props);

		//First .value for nullcheck, second for usage.
		const startingState = props.input && props.input.value &&
			props.input.value.min && props.input.value || { min: 20, max: 50 };

    this.state = {
      value: startingState,
      showOverlay: false,
    };

  }

  onChange(value) {
		this.setState({ value: value })
  	this.props.input.onChange(value);
  }

	showOverlay = _ => {
		if(this.props.input && this.props.input.onChange &&
			this.props.input.value && !this.props.input.value.min) {
			this.props.input.onChange(this.state.value);
		}
		this.setState({ showOverlay: true });
	}

	closeOverlay = _ => {
		if(this.props.hasOverlay) {
			if(this.props.overlayClosed) {
				this.props.overlayClosed();
			}
			this.setState({ showOverlay: false });
		}
	}

  render () {
    const { placeholder, type, input, meta, icon, className, min, max, hasOverlay} = this.props;
    const formatValue = (value) => '£' + value + 'K';
    let control;
    if (!hasOverlay) {
      control =
        <div>
          <InputRange
            formatLabel={value => formatValue(value)}
            maxValue={max}
            minValue={min}
            value={this.state.value}
            onChange={value => this.onChange(value)} />
        </div>
    } else {
      control = <Modal
          show={this.state.showOverlay}
          onHide={this.closeOverlay}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select {this.props.children}</Modal.Title>
          </Modal.Header>
          <div style={{width: '500px', marginBottom: '50px', marginTop: '20px'}}>
            <InputRange
              formatLabel={value => '£' + value + 'K'}
              maxValue={max}
              minValue={min}
              value={this.state.value}
              onChange={value => this.onChange(value)} />
          </div>
          <Modal.Footer>
            <Button onClick={this.closeOverlay}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
    }

    return (
      <FormGroup controlId={input.name} validationState={meta.error ? 'error' : meta.success? 'success' : null}>
        { hasOverlay && <SortableDraggableButton
					name={this.props.children}
          canEdit={input.value.min != null || input.value.max != null}
          showPlus={input.value.min == null && input.value.max == null}
					description={input.value.min && input.value.max ?
            formatValue(input.value.min) + '-' + formatValue(input.value.max) :
            null}
						onClick={this.showOverlay}
        	/>
        }

        {control}
        {<FormControl.Feedback />}
      </FormGroup>
    );
  }
}
