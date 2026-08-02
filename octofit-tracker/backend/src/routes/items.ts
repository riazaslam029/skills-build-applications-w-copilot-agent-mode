import { Router } from 'express';
import { addItem, listItems } from '../store/items';

export function createItemRouter() {
  const router = Router();

  router.get('/', (_request, response) => {
    response.json({ items: listItems() });
  });

  router.post('/', (request, response) => {
    // Keep the input check simple and explicit for beginners.
    const name = typeof request.body?.name === 'string' ? request.body.name.trim() : '';

    if (!name) {
      response.status(400).json({ message: 'Item name is required.' });
      return;
    }

    const item = addItem(name);
    response.status(201).json({ item });
  });

  return router;
}