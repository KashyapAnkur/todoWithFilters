import React, { useState } from 'react';
import './App.css';
import './assets/style.css';
import { Navbar } from './Components/Navbar';
import { AddTask } from './Components/AddTask';
import { DisplayTasks } from './Components/DisplayTasks';
import { useToasts } from "react-toast-notifications";
import { useDispatch } from 'react-redux';
import { addTodo } from './actions/actions';

function App() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const [ navBarItems, setNavBarItems ] = useState([
    { name: "Add new Task", isActive: true },
    { name: "Display Tasks", isActive: false }
  ]);
  
  const [activeTab, setActiveTab] = useState(navBarItems[0].name);

  const handleNav = (item) => {
    let temp = [...navBarItems];
    temp.forEach((i) => { i.isActive = false }); // first reset all to false
    temp.forEach((i) => {  // then make the clicked one true
      i.isActive = i.name === item.name ? !i.isActive : i.isActive;
    });
    setActiveTab(item.name);
    setNavBarItems(temp);
  }

  const handleSubmit = (data) => {
    if(Object.keys(data).length > 0) {
      let todo = {
        taskId: (new Date()).getTime(),
        taskTitle: data.taskTitle,
        taskDescription: data.taskDescription,
        taskDate: data.taskDate,
        taskAssignedTo: data.taskAssignedTo,
        taskPriority: data.taskPriority,
        taskDuration: data.taskDuration,
        isChecked: false,
        taskStatus:"Pending"
      };
      dispatch(addTodo(todo));
      addToast("Task added successfully!", {
        appearance: "success",
      });
    }
  }

  return (
    <div className="App">
      <Navbar
        navBarItems={navBarItems}
        handleNav={handleNav}
      />
      {(() => {
        if(activeTab === "Add new Task") {
          return <AddTask
              handleSubmit={handleSubmit}
          />
        } else {
          return <DisplayTasks />
        }
      })()}
    </div>
  );
}

export default App;