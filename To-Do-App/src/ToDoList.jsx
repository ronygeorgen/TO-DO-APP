import React, {useState} from "react"
import "./styleTo-do-list.css"
function ToDoList(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_,i) => i!== index );
        setTasks(updatedTasks);
    }

    function moveTaskUp(index){
        if(index > 0){
        const updatedTasks = [...tasks];
        [updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]];
        setTasks(updatedTasks);
        }

    }

    function moveTaskDown(index){
        if(index < tasks.length-1){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index+1]] = [updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function startEditing(index){
        setEditingIndex(index);
        setEditingText(tasks[index]);
    }

    function handleEditChange(event){
        setEditingText(event.target.value);
    }

    function saveEdit(){
        if(editingText.trim() !== ""){
            const updatedTasks = [...tasks];
            updatedTasks[editingIndex] = editingText;
            setTasks(updatedTasks);
            setEditingIndex(null);
        }
    }

    function cancelEdit(){
        setEditingIndex(null);
    }

    return (
        <>
        <div className="background-container">
          <div className="bubble">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="bubble">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="bubble">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="bubble">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="bubble">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
        <div className="content-container" >
        <div className="to-do-list">
        <h1>To Do App</h1>
        <div className="input-group">
            <input  type="text"  name="text" autocomplete="off" className="input"  value={newTask} onChange={handleInputChange} placeholder=" " />
            <label className="user-label">Enter Task....</label>

        <button className="add-button" onClick={addTask}>ADD</button>
        </div>
        <ol>
            {tasks.map((task, index) => 
                <li key={index}>
                    {editingIndex === index ? (
                        <div className="edit-container">
                            <input type="text" value={editingText} onChange={handleEditChange} className="edit-input" />
                            <button className="icon-button save" onClick={saveEdit} title="Save">&#10004;</button>
                            <button className="icon-button cancel" onClick={cancelEdit} title="Cancel">&#10006;</button>
                        </div>
                    ): (
                        <>
                        <span className="text">{task}</span>
                        <div className="button-group">
                            <button className="icon-button move" onClick={() => moveTaskUp(index)} title="Move Up">&#9650;</button>
                            <button className="icon-button move" onClick={() => moveTaskDown(index)} title="Move Down">&#9660;</button>
                            <button className="icon-button edit" onClick={() => startEditing(index)} title="Edit">&#9998;</button>
                            <button className="icon-button delete" onClick={() => deleteTask(index)} title="Delete">&#10006;</button>
                        </div>
                    </>
                    )}
              </li>
            )}
        </ol>
    </div>
        </div>
    </>
      );

}
export default ToDoList