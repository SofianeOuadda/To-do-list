import React, { useState } from 'react';
import '../css/TodoList.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TodoList = ({ tasks, toggleTaskDone, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const handleEditSubmit = (taskId) => {
    if (newTitle.trim() !== '') {
      editTask(taskId, newTitle);
      setIsEditing(null);
      setNewTitle('');
    }
  };

  return (
    <div className="TodoList">
      {tasks.length === 0 ? (
        <p>No tasks yet! Add a new one above.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="TodoList-item">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTaskDone(task.id, task.done)}
                className="TodoList-checkbox"
              />
              {isEditing === task.id ? (
                <>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <button
                    className="edit"
                    onClick={() => handleEditSubmit(task.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`TodoList-item-title ${
                      task.done ? 'done' : ''
                    }`}
                  >
                    {task.title}
                  </span>

                  <button
                    className="edit"
                    onClick={() => {
                      setIsEditing(task.id);
                      setNewTitle(task.title);
                    }}
                  >
                    <FaEdit /> 
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    <FaTrashAlt /> 
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;