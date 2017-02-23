import React, { Component, PropTypes } from 'react';
import './SortableDraggableButton.css';

export default (props) => {
	let containerClass = 'sortable-draggable-container';
	if (props.showPlus) {
		containerClass = containerClass + ' hasPlus';
	}
	if (props.isDragging) {
		containerClass = containerClass + ' isDragging';
	}
	return <button 
		className={containerClass}
		type="button" onClick={props.onClick}>
		<div className="inner-container">
			<div className="name">
				{props.showPlus && <span>+</span>}
				<span>{props.name}</span>
			</div>
			<div className="description">{props.description}</div>
			{ props.canEdit && <img className="edit" src='/images/edit.png' /> }
		</div>
	</button>
}
