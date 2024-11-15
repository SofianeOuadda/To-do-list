import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des tâches", error);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await axios.post('http://localhost:5000/tasks/', { title });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une tâche", error);
    }
  };

  const toggleTaskDone = async (id, done) => {
    try {
      const response = await axios.patch(`http://localhost:5000/tasks/${id}`, { done: !done });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de la tâche", error);
    }
  };

  const updateTask = async (id, title) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, { title });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche", error);
    }
  };

  const filteredTasks = filterActive
    ? tasks.filter((task) => !task.done)
    : tasks;

    const deleteAllCompletedTasks = async () => {
      try {
        const completedTasks = tasks.filter(task => task.done);
        for (const task of completedTasks) {
          await axios.delete(`http://localhost:5000/tasks/${task.id}`);
        }
        setTasks(tasks.filter(task => !task.done));
      } catch (error) {
        console.error("Erreur lors de la suppression des tâches terminées", error);
      }
    };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className='info'>
        <label>
          <input
            type="checkbox"
            checked={filterActive}
            onChange={() => setFilterActive(!filterActive)}
          />
          Show only tasks to do
        </label>

        <button className="deleteAll" onClick={deleteAllCompletedTasks}>
        Supprimer les taches faites
      </button>
      </div>

      <TodoForm addTask={addTask} />
      <TodoList
        tasks={filteredTasks}
        toggleTaskDone={toggleTaskDone}
        editTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
