
const addTodo = todo => 
    ({ type: "todo/add", todo: todo });

const updatePriority = updatedData => 
    ({ type: "todo/updatePriority", updatedData: updatedData});

const deleteAll = () => 
    ({ type: "todo/deleteAll" });

const deleteTodo = dataToDelete => 
    ({ type: "todo/deleteTodo", dataToDelete: dataToDelete });

const resetTodo = () => 
    ({ type: "todo/reset" });

const applyFilter = filteredArray => 
    ({ type: "todo/applyFilter", filteredArray: filteredArray });

export { 
    addTodo,
    updatePriority,
    deleteAll,
    deleteTodo,
    resetTodo,
    applyFilter
};