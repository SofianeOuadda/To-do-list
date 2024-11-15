import { withMSW } from 'msw-storybook-addon'; // Assurez-vous d'importer le décorateur MSW
import { rest } from 'msw';  // Importation correcte de 'rest'

// Ce décorateur applique MSW à toutes les stories
export const decorators = [
  withMSW,
];

export const parameters = {
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
      rest.post('http://localhost:5000/tasks/', (req, res, ctx) => {
        const { title } = req.body;
        return res(
          ctx.status(201),
          ctx.json({ id: Math.random(), title, done: false })
        );
      }),
    ],
  },
};
