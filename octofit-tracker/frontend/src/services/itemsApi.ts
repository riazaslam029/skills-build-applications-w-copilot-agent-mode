export type Item = {
  id: number;
  name: string;
  createdAt: string;
};

export type ItemsResponse = {
  items: Item[];
};

export type ItemResponse = {
  item: Item;
};

// This small service keeps fetch logic out of the React component.
export async function fetchItems(apiBaseUrl: string): Promise<ItemsResponse> {
  const response = await fetch(`${apiBaseUrl}/api/items`);

  if (!response.ok) {
    throw new Error('Unable to load items.');
  }

  return (await response.json()) as ItemsResponse;
}

// The service returns the server response shape so the UI stays simple.
export async function createItem(apiBaseUrl: string, name: string): Promise<ItemResponse> {
  const response = await fetch(`${apiBaseUrl}/api/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message || 'Unable to save the item.');
  }

  return (await response.json()) as ItemResponse;
}