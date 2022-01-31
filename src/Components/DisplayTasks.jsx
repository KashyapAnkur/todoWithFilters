import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    updatePriority, 
    deleteAll, 
    deleteTodo, 
    resetTodo,
    applyFilter 
} from '../actions/actions';
import { DateRangePicker } from 'rsuite';
import { 
    Form, 
    Row, 
    Col, 
    Table,
    Spinner
} from 'react-bootstrap';
import { SVGDelete } from '../Components/SVG/SVG';
import ConfirmModal from './ConfirmModal/ConfirmModal';

export const DisplayTasks = () => {
    let t = 0;
    const state = useSelector(state => state.todos);
    const defaultState = useSelector(state => state.todosDefault);
    const dispatch = useDispatch();
    const [isSaving, setIsSaving] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [deleteData, setDeleteData] = useState({});
    
    const [date, setDate] = useState(new Date());
    const [dateRange, setDateRange] = useState(null);
    const [filters, setFilters] = useState([]);

    let assignedToDropdown = [];
    if(defaultState.length > 0) {
        defaultState.forEach((i) => {
            assignedToDropdown.push(i.taskAssignedTo);
        });
        assignedToDropdown = [...new Set(assignedToDropdown)];
    }
    let priorityDropdown = [];
    if(defaultState.length > 0) {
        defaultState.forEach((i) => {
            priorityDropdown.push(i.taskPriority);
        });
        priorityDropdown = [...new Set(priorityDropdown)];
    }
    
    const handlePriorityChange = (e, todo) => {
        setIsSaving(true);
        let temp = [...state];
        temp.forEach((t) => {
            if(t.taskId === todo.taskId) {
                t.taskPriority = e.target.value;
            }
        });
        dispatch(updatePriority(temp));
        t = setTimeout(() => {
            setIsSaving(false);
            clearTimer();
        },800);
    }

    const handleStatusChange = (e, todo) => {
        setIsSaving(true);
        let temp = [...state];
        temp.forEach((t) => {
            if(t.taskId === todo.taskId) {
                t.taskStatus = e.target.value;
            }
        });
        dispatch(updatePriority(temp));
        t = setTimeout(() => {
            setIsSaving(false);
            clearTimer();
        },800);
    }

    const clearTimer = () => {
        clearTimeout(t);
    }

    const deleteConfirm = (data) => {
        if(data.length > 0) {
            setDeleteData({
                messageTitle: "Confirm Delete",
                message: "Are you sure you want to delete all Todos?",
                leftBtnText: "Cancel",
                righttBtnText: "Delete All"
            });
            setIsModal(true);
        } else {
            setDeleteData({
                messageTitle: "Confirm Delete",
                message: "Are you sure you want to delete this Todo?",
                leftBtnText: "Cancel",
                righttBtnText: "Delete",
                dataToDelete: data
            });
            setIsModal(true);
        }
    }

    const handleDelete = () => {
        if(deleteData.dataToDelete.taskId) {
            dispatch(deleteTodo(deleteData.dataToDelete));
            setIsModal(false);
        } else {
            dispatch(deleteAll());
            setIsModal(false);
        }
    }

    const handleFilters = (e) => {
        switch(e.target.name) {
            // case "specificDate": {
            //     setDate(e.target.value);
            //     break;
            // }
            case "taskPriority": {
                if(e.target.value){
                    let temp = [...filters];
                    let obj = {
                        filterType: e.target.name,
                        filterName: e.target.value
                    };
                    let exists = "n";
                    temp.forEach((item) => {
                        if(item.filterType === e.target.name) {
                            exists = "y";
                        }
                    })
                    if(exists === "y") {
                        temp.forEach((item) => {
                            if(item.filterType === e.target.name) {
                                item.filterName = e.target.value;
                            }
                        });
                    } else {
                        temp.push(obj);
                    }
                    setFilters(temp);
                } else {  // clear filter
                    let temp = [...filters];
                    let index = 0;
                    temp.forEach((item,i) => {
                        if(item.taskPriority === e.target.name) {
                            index = i;
                        }
                    });
                    temp.splice(index, 1);
                    setFilters(temp);
                }
                break;
            }
            case "taskAssignedTo_PENDING": {
                if(e.target.value){
                    let temp = [...filters];
                    let obj = {
                        filterType: e.target.name,
                        filterName: e.target.value
                    };
                    let exists = "n";
                    temp.forEach((item) => {
                        if(item.filterType === e.target.name) {
                            exists = "y";
                        }
                    })
                    if(exists === "y") {
                        temp.forEach((item) => {
                            if(item.filterType === e.target.name) {
                                item.filterName = e.target.value;
                            }
                        });
                    } else {
                        temp.push(obj);
                    }
                    setFilters(temp);
                } else {  // clear filter
                    let temp = [...filters];
                    let index = 0;
                    temp.forEach((item,i) => {
                        if(item.taskAssignedTo === e.target.name) {
                            index = i;
                        }
                    });
                    temp.splice(index, 1);
                    setFilters(temp);
                }
                break;
            }
            // case "dateRangePicker": {
            //     console.log(e.target.value);
            //     break;
            // }
            default: {};
        }
    }

    React.useEffect(() => {
        if(filters.length > 0) {
            dispatch(resetTodo());
            let temp = [...defaultState];
            let filteredArray = [];
            for(let i = 0; i < temp.length; i++) {
                for(let j = 0; j < filters.length; j++) {
                    if(filters[j].filterType === "taskPriority") {
                        if(temp[i].taskPriority === filters[j].filterName) {
                            filteredArray.push(temp[i]);
                        }
                    }
                }
            }
            dispatch(applyFilter(filteredArray));
        } else {
            dispatch(resetTodo());
        }
    }, [filters]);

    if(state.length < 1) return <h1>No data</h1>
    return(
        <div className="displayTodoSection">
            <ConfirmModal
                isModal={isModal}
                setIsModal={setIsModal}
                deleteConfirm={deleteConfirm}
                handleDelete={handleDelete}
                deleteData={deleteData}
            />
            <Form>
                <Row>
                    <Col className="col-3">
                        <Form.Control
                            className="input"
                            placeholder="Enter task date"
                            name="specificDate"
                            type="date"
                            value={date}
                            onChange={handleFilters}
                        />
                    </Col>
                    <Col>
                        <Form.Select
                            name="taskPriority"
                            className="select" 
                            aria-label="Choose task priority"
                            onChange={handleFilters}
                        >
                            <option value="">Task priority</option>
                            {priorityDropdown.map((i, index) => (
                                <option key={index} value={i}>
                                    {i}
                                </option>    
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select
                            name="taskAssignedTo"
                            className="select" 
                            aria-label="Choose assigned to"
                            onChange={handleFilters}
                        >
                            <option value="">Assigned To</option>
                            {assignedToDropdown.map((i) => (
                                <option value={i}>
                                    {i}
                                </option>    
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <DateRangePicker
                            className="dateRangePickerCustom"
                            format="yyyy-MM-dd"
                            placeholder="Select Date Range"
                            name="dateRangePicker"
                            onChange={handleFilters}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                {isSaving ?
                                <tr>
                                    <td colspan="9">
                                        Saving&nbsp;
                                        <Spinner animation="border" size="sm" />
                                    </td>
                                </tr> :
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Assigned to</th>
                                    <th>Priority</th>
                                    <th>Task Minutes</th>
                                    <th>Status</th>
                                    <th>
                                        <span 
                                            className="deleteBtn"
                                            onClick={() => deleteConfirm([])}
                                        >
                                            <SVGDelete
                                                width={22}
                                                height={22}
                                            />
                                        </span>
                                    </th>
                                </tr>}
                            </thead>
                            <tbody>
                                {state.length > 0 && 
                                    state.map((todo, index) => (
                                        <tr key={index}>
                                            <td>{todo.taskId}</td>
                                            <td>{todo.taskTitle}</td>
                                            <td>{todo.taskDescription}</td>
                                            <td>{todo.taskDate}</td>
                                            <td>{todo.taskAssignedTo}</td>
                                            <td>
                                                <Form.Select 
                                                    name="taskPriority"
                                                    className={`
                                                        ${todo.taskPriority === "Low" ? (
                                                            'taskPriorityLow'
                                                        ) : (
                                                            todo.taskPriority === "High" ? (
                                                                'taskPriorityHigh'
                                                            ) : (
                                                                'taskPriorityUrgent'
                                                            )
                                                        )}
                                                    `}
                                                    value={todo.taskPriority}
                                                    aria-label="Choose task priority"
                                                    onChange={(e) => handlePriorityChange(e, todo)}
                                                >
                                                    <option value="Low">Low</option>
                                                    <option value="High">High</option>
                                                    <option value="Urgent">Urgent</option>
                                                </Form.Select>
                                            </td>
                                            <td>{todo.taskDuration}</td>
                                            <td>
                                                <Form.Select 
                                                    name="taskStatus"
                                                    className={`
                                                        ${todo.taskStatus === "Completed" ?
                                                            'taskStatusCompleted' : 'taskStatusPending'
                                                        }
                                                    `}
                                                    aria-label="Choose task status"
                                                    onChange={(e) => handleStatusChange(e, todo)}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Completed">Completed</option>
                                                </Form.Select>
                                            </td>
                                            <td>
                                            <span 
                                                className="deleteBtn"
                                                onClick={() => deleteConfirm(todo)}
                                            >
                                                <SVGDelete
                                                    width={14}
                                                    height={14}
                                                />
                                            </span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Form>
        </div>
    )
};