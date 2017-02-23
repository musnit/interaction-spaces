import React, { Component, PropTypes } from 'react';

export const Columns = ({ title, children, columnStyle = {}, columnContainerStyle = {} }) => {
  if (!children.map) {
    children = [children];
  }
  const columnWidth = 100 / children.length + '%';
  return (
    <div className="columns">
      <div style={Object.assign({ display: 'flex', flexDirection: 'row' }, columnContainerStyle)}>
        {
          children.map(
            (child, index) => (
              <div
                key={index}
                style={
                  Object.assign({
                    width: columnWidth,
                    paddingLeft: '25px',
                    paddingRight: '25px',
                  }, columnStyle)
                }
              >
                {child}
              </div>
            ),
          )
        }
      </div>
    </div>
  );
};
