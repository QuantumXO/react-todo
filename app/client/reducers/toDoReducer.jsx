
'use strict';

import defaultToDoList from './../data/defaultToDoList.json';

import {
    HANDLE_EDITING_STATE,
    DELETE_ITEM,
    ADD_ITEM,
    HANDLE_STATE,
    HANDLE_POSITION
} from "./../constants/actionTypes";

let toDoLocalStorage = JSON.parse(localStorage.getItem('toDoList')) || null;

const toDoListLocalStorage = toDoLocalStorage ? toDoLocalStorage.toDoList : null;
const toDoEditingLocalStorage = toDoLocalStorage ? toDoLocalStorage.editingArr : null;

const initialState = {
    toDoList: toDoListLocalStorage ? toDoListLocalStorage : defaultToDoList,
    editingArr: toDoEditingLocalStorage ? toDoEditingLocalStorage : [],
};

export default function toDoReducer(state = initialState, action) {

    switch (action.type) {

        case HANDLE_EDITING_STATE:

            return handleEditingState(state, action);

        case DELETE_ITEM:
            return deleteItem(state, action);

        case ADD_ITEM:
            return addItem(state, action);

        case HANDLE_STATE:
            return handleState(state, action);

        case HANDLE_POSITION:
            return handlePosition(state, action);

        default:
            return state;
    }

}

function handleEditingState(state, action){
    let editingArr = state.editingArr;
    let index;

    const newArr = state.toDoList.map(item => {

        if(item.id == action.id){

            if(item.editing){
                // Save

                item.content = action.content;
                item.status = action.status;
                item.priority = action.priority;

                index = state.toDoList.indexOf(item);

                editingArr.splice(index, 1);

            }else {
                editingArr.push(item);
            }

            item.editing = !item.editing;
        }

        return item;
    });

    const newState = {...state, toDoList: newArr, editingArr};

    localStorage.setItem('toDoList', JSON.stringify(newState));

    return newState;
}

function deleteItem(state, action) {

    const newState = Object.assign({}, state, {
        toDoList: [...state.toDoList.filter(item => item.id !== action.id)],
    });

    localStorage.setItem('toDoList', JSON.stringify(newState));

    return newState;
}

function addItem(state, action) {

    const newId = state.toDoList[state.toDoList.length - 1].id + 1;

    let newItem = {
        "id": newId,
        "status": 0,
        "editing": false,
        "priority": 0,
        "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    };

    const newState = {
        ...state,
        toDoList: [...state.toDoList, newItem],
    };

    localStorage.setItem('toDoList', JSON.stringify(newState));

    return newState;
}

function handleState(state, action) {

    const newArr = state.toDoList.map(item => {

        if(item.id == action.id){

            item.status = !item.status;
        }

        return item;
    });

    const newState = {...state, toDoList: newArr};

    localStorage.setItem('toDoList', JSON.stringify(newState));

    return newState;
}

function handlePosition(state, action) {

    const currentActiveItemPosition = action.currentPosition;
    const newActiveItemPosition = action.newPosition;

    const newArr = state.toDoList.map((item, index) => {

        const itemPosition = item.position;

        if(item.id == action.id){

            item.position = newActiveItemPosition;

        }else{

            if(
                currentActiveItemPosition < newActiveItemPosition &&
                itemPosition <= newActiveItemPosition &&
                itemPosition > currentActiveItemPosition
            ){
                item.position = itemPosition - 1;

            }else if(
                currentActiveItemPosition > newActiveItemPosition &&
                itemPosition < currentActiveItemPosition &&
                itemPosition >= newActiveItemPosition
            ){
                item.position = itemPosition + 1;

            }else{
                item.position = itemPosition
            }

        }

        return item;

    });

    const newState = {...state, toDoList: newArr};

    localStorage.setItem('toDoList', JSON.stringify(newState));

    return newState;
}








