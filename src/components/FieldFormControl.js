import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, InputGroup, Modal, Button} from 'react-bootstrap';
import SortableDraggableButton from '~/src/components/draggable/SortableDraggableButton';

export default class FieldFormControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOverlay: false,
    };
  }

  render () {
    const { placeholder, type, componentClass, input, meta, icon, className, hasOverlay, defaultValue } = this.props;
    let control;

    if (!hasOverlay) {
      control =
        <div>
          {this.props.children && <ControlLabel>{this.props.children}</ControlLabel>}
          {meta.error && (
            <div className="field-error">{"* " + meta.error}</div>
          )}
          {icon && <div className='field-icon-holder'>
            <img className='field-icon' src={icon} />
          </div>}
          <FormControl className={`${icon? 'iconned ' + className : className}`} type={type}
            componentClass={componentClass} placeholder={placeholder} value={input.value} onChange={input.onChange} />
        </div>
    } else {
      control = <Modal
          show={this.state.showOverlay}
          onHide={() => this.setState({ showOverlay: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select {this.props.children}</Modal.Title>
          </Modal.Header>
          <div style={{width: '400px', marginBottom: '50px', marginTop: '20px'}}><FormControl className={`${icon? 'iconned ' + className : className}`} type={type}
            componentClass={componentClass} placeholder={placeholder} value={input.value} onChange={input.onChange} /></div>
          <Modal.Footer>
            <Button onClick={() => this.setState({ showOverlay: false })}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
    }

    return (
      <FormGroup controlId={input.name} validationState={meta.error ? 'error' : meta.success? 'success' : null}>
        { hasOverlay && <SortableDraggableButton
          name={this.props.children}
          canEdit={input.value != null}
          showPlus={input.value == null}
          description={input.value}
          onClick={() => this.setState({ showOverlay: true })}
          />
        }
        {control}
        {<FormControl.Feedback />}
      </FormGroup>
    );
  }
}
