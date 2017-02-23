import React, { Component, PropTypes } from 'react';

export const TwoColumn = ({ title, children }) => {
  return (
    <div className="two-column">
      <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '25px', paddingRight: '25px' }}>
        {children}
      </div>
    </div>
  );
};

export const TwoColumnLeft = ({ children }) => {
  return (
    <div
      className="two-column-left"
      style={
        { width: '50%', marginLeft: '0px', marginRight: 'auto', height: '100%', paddingRight: '20px' }
      }
    >
      {children}
    </div>
  );
};

export const TwoColumnRight = ({ children }) => {
  return (
    <div
      className="two-column-right"
      style={
        { width: '50%', marginRight: '0px', marginLeft: 'auto', height: '100%', paddingLeft: '20px' }
      }
    >
      {children}
    </div>
  );
};
