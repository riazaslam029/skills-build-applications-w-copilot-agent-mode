import type { Item } from '../types';

const items: Item[] = [];
let nextId = 1;

export function listItems(): Item[] {
  return [...items];
}

export function addItem(name: string): Item {
  const item: Item = {
    id: nextId++,
    name,
    createdAt: new Date().toISOString(),
  };

  items.unshift(item);
  return item;
}
