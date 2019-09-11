'use strict';

import './_main.sass';
import $ from 'jquery';
import './../../src/jquery.scrollbar.min.js';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// Redux
import { bindActionCreators } from 'redux';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

import * as toDoAction from './../../actions/toDoAction';
const ASC = 'ascending';
const DSC = 'descending';

const draggingOverStyle = {
    borderColor: '#8c1cff',
    backgroundColor: '#250e35',
};

function sortList(a, b, order = ASC) {

    //console.log('a', a);

    const diff = a.position - b.position;

    if (order === ASC) {
        return diff;
    }

    return -1 * diff;
}

class Main extends Component {

    constructor(props){
        super(props);

        const closedItemsCounter = this.props.toDoProps.toDoList.filter(item => item.status == 1).length;
        const allItemsCounter = this.props.toDoProps.toDoList.length;

        this.state = {
            toDoList: this.props.toDoProps.toDoList,
            editingArr: this.props.toDoProps.editingArr,
            closedItemsCounter,
            allItemsCounter,
            localItemChangesArr: [],
        };

        this.addNewItem  = this.addNewItem.bind(this);
    }

    componentDidMount(){
        $('.main__list').scrollbar({
           /* "showArrows": true,
            "scrollx": "advanced",
            "scrolly": "advanced"*/
        });
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.toDoProps.toDoList !== this.state.toDoList) {

            const toDoList =  nextProps.toDoProps.toDoList;
            const editingArr =  nextProps.toDoProps.editingArr;

            this.setState({
                toDoList,
                editingArr,
                closedItemsCounter: toDoList.filter(item => item.status == 1).length,
                allItemsCounter: toDoList.length,
            });
        }
    }


    addNewItem(){
        this.props.toDoAction.addItemAction();
    }

    delete(id){
        this.props.toDoAction.deleteItemAction(id);
    }

    handleStatus(id){
        console.log('handleStatus() -> id: ', id);
        this.props.toDoAction.handleStateAction(id);
    }

    edit(...args){
        //id, content, status, priority, editing, position


        let id = args[0];
        let content = args[1];
        let status = args[2];
        let priority = args[3];
        let editing = args[4];
        let position = args[5];
        let data;
        let index;

        const localItemChangesArr = this.state.localItemChangesArr;

        if(localItemChangesArr.length){
            index = localItemChangesArr.map(item => item.id).indexOf(id);

            if(index != -1){

                content = localItemChangesArr[index].content || content;
                priority = localItemChangesArr[index].priority;

            }

        }

        // 6
        data = {
            id,
            content,
            status,
            priority,
            editing,
            position
        };

        //console.log('edit() -> data: ', data);

        this.props.toDoAction.handleEditingStateAction(data);
    }

    handleContent(...args){
        //this, id, content, status, priority, editing, $this

        let id = args[0];
        let content = args[1];
        let $this = args[2];

        const localItemChangesArr = this.state.localItemChangesArr;

        if(localItemChangesArr.length && localItemChangesArr.map(item => item.id).indexOf(id) != -1){
            const index = localItemChangesArr.map(item => item.id).indexOf(id);
            const newArr = [...localItemChangesArr];
            newArr[index].content = $this.target.value;
            this.setState(prevState => ({
                localItemChangesArr: newArr
            }));

        }else{

            content = $this.target.value;

            this.setState({
                localItemChangesArr: [...localItemChangesArr, {id, content}]
            });

        }
    }

    handlePriority(...args){
        // id, priority

        let id = args[0];
        let priority = args[1];
        let $this = args[2];

        const newPriority = +$this.target.getAttribute('data-priority');

        //console.log('handlePriority() -> newPriority: ', newPriority);

        const localItemChangesArr = this.state.localItemChangesArr;

        if(localItemChangesArr.length && localItemChangesArr.map(item => item.id).indexOf(id) != -1){
            const index = localItemChangesArr.map(item => item.id).indexOf(id);
            const newArr = [...localItemChangesArr];
            newArr[index].priority = newPriority;
            this.setState(prevState => ({
                localItemChangesArr: newArr
            }));

        }else{

            priority = newPriority;

            this.setState({
                localItemChangesArr: [...localItemChangesArr, {id, priority}]
            });

        }

        //this.props.toDoAction.handlePriorityAction(id, $this.target.getAttribute('data-type'));
    }

    onDragUpdate = (update, provided) => {

        //console.log('update: ', update);

    };

    onDragEnd = (result, provided) => {
        // the only one that is required

        const {destination, source, draggableId, type} = result;
        const realId = draggableId - 1;

        let direction;

        if(!destination){
            return;

        }else {

            const newPosition = destination.index;
            const currentPosition = this.state.toDoList.filter(item => item.id == realId)[0].position;

            if(newPosition != currentPosition){
                this.props.toDoAction.handlePositionAction(realId, currentPosition, newPosition);
            }

        }
    };

    render(){

        const tagsCloud = this.props.basicProps.tagsCloud;

        const tagsList = tagsCloud.map((item, index) =>
            <span className="tag" key={index}>#{item}{index < tagsCloud.length -1 ? ',' : '' }</span>
        );

        const progressPercent = Math.round((this.state.closedItemsCounter / this.state.allItemsCounter) * 100);

        const toDoList = this.props.toDoProps.toDoList;

        const sortedList = toDoList.sort(sortList);

        const list = (sortedList || []).map((item, index) => {

            const {id, content, status, priority, editing, position} = item;

            const classStatus = status ? 'completed ' : '';
            const classPriority = priority ? 'important' : '';

            const complete_mark_path = status ?
                'M 16.5 16.602 L 36.5 36.602 M 36.5 16.602 L 16.5 36.602' :
                'M14.1 27.2l7.1 7.2 16.7-16.8';

            const contentField = editing ?
                (
                    <div>
                        <ul className="main__item__priority__list">
                            <li className="main__item__priority__item default" title="default" data-priority="0" onClick={this.handlePriority.bind(this, id, priority)} />
                            <li className="main__item__priority__item important" title="important" data-priority="1" onClick={this.handlePriority.bind(this, id, priority)} />
                        </ul>
                         <textarea className="main__item__content editing"
                                   defaultValue={content}
                             //value={this.state.editingArr.filter(item => item.id == id)[content]}
                                   onChange={this.handleContent.bind(this, id, content)}
                         />
                    </div>

                ) :
                (<p className="main__item__content">{content}</p>);

            return (
                <Draggable key={id} draggableId={id + 1} index={index}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={"main__item " + classStatus + classPriority}
                        >
                            <div className="main__item__inner">
                                <span className="main__item__complete" onClick={this.handleStatus.bind(this, id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                        <path fill="none" d={complete_mark_path} />
                                    </svg>
                                </span>
                                <span className="main__item__counter">{index + 1}.</span>
                                {contentField}
                            </div>
                            <div className="main__item__inner">
                                <span className="btn btn--edit" onClick={this.edit.bind(this, id, content, status, priority, editing, position)}>{editing ? 'Save' : 'Edit'}</span>
                                <span className="btn btn--delete" onClick={this.delete.bind(this, id)}>x</span>
                            </div>
                        </div>

                    )}
                </Draggable>
            )
        });

        return(
            <main className="main">
                <div className="main__wrap">
                    <div className="main__head">
                        <div className="row">
                            <h2 className="main__head__title">#To do</h2>
                            <div className="main__head__inner">
                                <div className="main__progress__top">
                                    <span className="label">Progress:</span>
                                    <span className={"counter__number" + (progressPercent == 100 ? ' success ' : '')}>{this.state.closedItemsCounter}/{this.state.allItemsCounter}</span>
                                </div>
                                <div className="main__progress__field">
                                    <div className="main__progress__fill" style={{'width' : progressPercent + '%'}}></div>
                                </div>
                                <div className="main__progress__bottom">
                                    <span className={"counter__percent" + (progressPercent == 100 ? ' success ' : '')}>{progressPercent}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main__container">
                        <div className="row">

                            <DragDropContext
                                //onBeforeDragStart={this.onBeforeDragStart}
                                //onDragStart={this.onDragStart}
                                onDragUpdate={this.onDragUpdate}
                                onDragEnd={this.onDragEnd}
                            >
                                <Droppable droppableId="droppable-5" type="toDoList" isCombineEnabled>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={snapshot.isDraggingOver ? draggingOverStyle : {}}
                                            {...provided.droppableProps}
                                            className='main__list'
                                        >
                                            {list}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>

                    <div className="main__footer">
                        <div className="row">
                            <div className="main__footer__inner">
                                <div className="main__footer__tags">
                                    {tagsList}
                                </div>
                                <span className="main__footer__new" onClick={this.addNewItem}>+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => ({
    toDoProps: state.toDoReducer,
    basicProps: state.defaultReducer,
});

const mapDispatchToProps = (dispatch) => ({

    toDoAction: bindActionCreators(toDoAction, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(Main)

Main.propTypes = {
    basicProps: PropTypes.shape({
        author: PropTypes.string,
        tagsCloud: PropTypes.array,
    }),
    toDoProps: PropTypes.shape({
        editingArr: PropTypes.array,
        toDoList: PropTypes.array,
    }),
};
