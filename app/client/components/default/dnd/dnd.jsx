

'use strict';

import React, {Component} from 'react';

// DnD
import { useDrag } from 'react-dnd';
import Sortable, { ReactSortable } from 'react-sortablejs';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';

class DnDComponent extends Component {

    onBeforeDragStart = (start, provided) => {
        /*...*/
    };

    onDragStart = (start, provided) => {
        /*...*/
    };

    onDragUpdate = (update, provided) => {
        /*...*/
        console.log('update: ', update);
    };

    onDragEnd = (result, provided) => {
        // the only one that is required

        console.log('result: ', result);

        const {destination, source, draggableId, type} = result;

        if(!destination){
            return;

        }else {
            this.props.handlePositionFunc(draggableId, destination.index);
        }
    };

    render(){
        return(
            <DragDropContext
                onBeforeDragStart={this.onBeforeDragStart}
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}
            >
                <Droppable droppableId="droppable-1" type="PERSON">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                            {...provided.droppableProps}
                        >
                            <Draggable draggableId="0" index={0}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <h4>111111My draggable</h4>
                                    </div>

                                )}
                            </Draggable>
                            <Draggable draggableId="1" index={1}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <h4>222222My draggable</h4>
                                    </div>

                                )}
                            </Draggable>
                            <Draggable draggableId="2" index={2}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <h4>3333333333 draggable</h4>
                                    </div>

                                )}
                            </Draggable>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }

}

export default DnDComponent


















