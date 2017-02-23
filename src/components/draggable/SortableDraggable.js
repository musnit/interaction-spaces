import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import SortableDraggableButton from './SortableDraggableButton'

const source = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findItem(props.id).index,
    };
  },
};

const target = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findItem(overId);
      props.moveItem(draggedId, overIndex);
    }
  },
};

let SortableDraggable = (props) => props.connectDragSource(props.connectDropTarget(
	<div><SortableDraggableButton canEdit={false} showPlus={false} name={props.name} description={props.description} isDragging={props.isDragging}/></div>
));

const sourceCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const targetCollect = (connect) => {
	return {
		connectDropTarget: connect.dropTarget(),
	}
}

SortableDraggable = DragSource('block', source, sourceCollect)(SortableDraggable);
export default DropTarget('block', target, targetCollect)(SortableDraggable);