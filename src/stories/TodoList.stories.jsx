import React from 'react';
import TodoList from '../components/TodoList';
import { rest } from 'msw';  // Assurez-vous d'importer 'rest'

export default {
  title: 'Components/TodoList',
  component: TodoList,
};

const Template = (args) => <TodoList {...args} />;

export const Default = Template.bind({});
Default.args = {
  tasks: [
    { id: 1, title: 'Task 1 (mock)', done: false },
    { id: 2, title: 'Task 2 (mock)', done: true },
  ],
  toggleTaskDone: (id, done) => console.log(`Toggle task ${id} to ${!done}`),
  editTask: (id, newTitle) => console.log(`Edit task ${id} with new title "${newTitle}"`),
  deleteTask: (id) => console.log(`Delete task ${id}`),
};

// Optionnel : Définir des handlers pour cette story
Default.parameters = {
  msw: {
    handlers: [
      rest.get('http://localhost:5000/tasks/', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            { id: 1, title: 'Task 1 (mock)', done: false },
            { id: 2, title: 'Task 2 (mock)', done: true },
          ])
        );
      }),
    ],
  },
};
