import React, { Component, PropTypes } from 'react';
import { ControlLabel } from 'react-bootstrap';

const themes = {
  default: {
    label: {},
    value: {},
    main: {},
    childContainer: {},
  },
  mini: {
    label: {
      color: 'rgb(173, 173, 173)',
      fontSize: 12,
      textTransform: 'uppercase',
      marginBottom: 0
    },
    value: {
      fontSize: 14,
    },
    main: {
      marginBottom: 30
    },
    childContainer: {},
  },
  tightFields: {
    main: {
      marginBottom: 50,
    },
    childContainer: {
      marginBottom: -21,
    },
  }
};

export const VerticalSection = ({ title, subTitle, children, tightFields, theme }) => {
  let styles = themes[theme || 'default'];
  if (tightFields) {
    styles = Object.assign({}, styles, {
      childContainer: themes.tightFields.childContainer,
      main: Object.assign({}, styles.main, themes.tightFields.main)
    });
  }
  return (
    <div className="vertical-section" style={styles.main}>
      <ControlLabel style={styles.label}>{title}</ControlLabel>
      {subTitle && <div style={{marginBottom: '20px'}}>{subTitle}</div>}
      {children.map? children.map((child, key) => {
        return <div style={styles.childContainer} key={key}>
          {React.cloneElement(child, { inVerticalSection: true })}
        </div>
        })
        : <div style={styles.childContainer}>
          {React.cloneElement(children, { inVerticalSection: true })}
        </div>
      }
    </div>
  );
};
