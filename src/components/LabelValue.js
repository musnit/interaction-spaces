import React, { Component } from 'react';
import { ControlLabel, FormGroup } from 'react-bootstrap';

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
  boolean: {
    label: {
      color: '#333',
      textTransform: 'none',
      marginBottom: 0,
      fontSize: 14,
    },
  },
  inVerticalSection: {
    main: {
      marginBottom: 2,
    },
  }
};

export default class LabelValue extends Component {

  render () {
    const { value, children, theme, inVerticalSection } = this.props;

    let styles = themes[theme || 'default'];
    if(typeof value === 'boolean') {
      if(value === false) {
        return <span></span>;
      }
      styles = Object.assign({}, styles, {
        label: Object.assign({}, styles.label, themes.boolean.label)
      });
    }
    if (inVerticalSection) {
      styles = Object.assign({}, styles, {
        main: Object.assign({}, styles.main, themes.inVerticalSection.main)
      });
    }
    return (
      value? <FormGroup style={styles.main}>
        {children && <ControlLabel style={styles.label}>{children}</ControlLabel>}
        <div style={styles.value}>{value}</div>
      </FormGroup> : <span></span>
    );
  }
}
