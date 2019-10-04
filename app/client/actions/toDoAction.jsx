
import {
    HANDLE_EDITING_STATE,
    DELETE_ITEM,
    ADD_ITEM,
    HANDLE_STATE,
    HANDLE_PRIORITY,
    HANDLE_POSITION
} from "./../constants/actionTypes";

export function handleEditingStateAction(data){
    return {
        type: HANDLE_EDITING_STATE,
        id: data.id,
        content: data.content,
        status: data.status,
        editing: data.editing,
        position: data.position,
        priority: data.priority
    }
}

export function handleStateAction(id){
    return {
        type: HANDLE_STATE,
        id
    }
}

export function handlePositionAction(id, currentPosition, newPosition){
    return {
        type: HANDLE_POSITION,
        id, currentPosition, newPosition
    }
}

export function deleteItemAction(id){
    return {
        type: DELETE_ITEM,
        id
    }
}

export function addItemAction(){
    return {
        type: ADD_ITEM
    }
}

export function handlePriorityAction(id, priority){
    return {
        type: HANDLE_PRIORITY,
        id, priority
    }
}















