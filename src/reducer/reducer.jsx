const initialState = { todos: [], todosDefault: []};

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case "todo/add": {
            let temp = [...state.todos];
            temp.push(action.todo);
            return { todos: temp, todosDefault: temp };
        }
        case "todo/updatePriority": {            
            return { todos: action.updatedData, todosDefault: action.updatedData };
        }
        case "todo/deleteAll" : {
            return { todos: [], todosDefault: [] };
        }
        case "todo/deleteTodo": {
            let temp = state.todos.filter( (todo) => todo.taskId !== action.dataToDelete.taskId );
            return { todos: temp, todosDefault: temp};
        }
        case "todo/reset": {
            return { todos: state.todosDefault, todosDefault: state.todosDefault };
        }
        case "todo/applyFilter": {
            return { todos: action.filteredArray, todosDefault: state.todosDefault };
        }
        default: 
            return state;
    }
}

export default Reducer;