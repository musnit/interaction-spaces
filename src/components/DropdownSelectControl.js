import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, InputGroup} from 'react-bootstrap';
import Select, { Creatable } from 'react-select';

const themes = {
  default: {
    main: {},
    label: {},
    value: {},
  },
  mini: {
    main: {},
    label: {
      color: 'rgb(173,173,173)',
      fontSize: 12,
      textTransform: 'uppercase',
      marginBottom: 0
    },
    value: {
      fontSize: 14,
    }
  },
};

export default class DropdownSelectControl extends Component {

  onChange(val) {
    if (val != undefined && val.value != undefined) {
      this.props.input.onChange(val.value);
    } else {
      this.props.input.onChange(val)
    }
  }

  render () {
    const { theme, value, options, children, input, meta, placeholder, className, ...forwardedProps } = this.props;

    const styles = themes[theme || 'default'];

    if (!this.props.creatable) {
      var SelectComponent = Select;
    } else {
      var SelectComponent = Creatable;
    }

    const label = children && <ControlLabel style={styles.label}>{children}</ControlLabel>;

    if (!input) {
      const option = options && options.find(option => option.value === value);
      const optionText = option && option.label;
      return <FormGroup style={styles.main}>
        {label}
        <div style={styles.value}>{optionText}
        </div>
      </FormGroup>
    }

    return (
      <FormGroup controlId={input.name} validationState={meta.error ? 'error' : meta.success? 'success' : null}>
        {label}
        {meta.error && (
          <div className="field-error">{"* " + meta.error}</div>
        )}
        <SelectComponent
          inputProps={{id:input.name, className: className}}
          name={input.name}
          value={input.value}
          onChange={(val) => this.onChange(val)}
          placeholder={<span>{placeholder}</span>}
          options={options}
          {...forwardedProps}
        />
        {<FormControl.Feedback />}
      </FormGroup>
    );
  }
}
