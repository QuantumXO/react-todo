
const initialState = {
    author: 'Author',
    tagsCloud: ['React', 'To Do List', 'Drag & Drop', 'Redux', 'localStorage'],
};

export default function defaultReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }

}
