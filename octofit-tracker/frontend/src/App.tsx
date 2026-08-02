import { FormEvent, useEffect, useState } from 'react';
import { createItem, fetchItems, type Item } from './services/itemsApi';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    void loadItems();
  }, []);

  async function loadItems() {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await fetchItems(apiBaseUrl);
      setItems(data.items);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter an item name.');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');

    try {
      const data = await createItem(apiBaseUrl, trimmedName);
      setItems((currentItems) => [data.item, ...currentItems]);
      setName('');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="eyebrow">Octofit Tracker</div>
        <h1>Simple items list</h1>
        <p>
          A beginner-friendly multi-tier app: React on the front, Express on the back, and an
          in-memory store in the middle.
        </p>

        <form className="item-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Item name</label>
          <div className="form-row">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Example: Morning workout"
            />
            <button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Add item'}
            </button>
          </div>
        </form>

        {errorMessage ? <p className="message error">{errorMessage}</p> : null}
      </section>

      <section className="list-card">
        <div className="section-header">
          <h2>Saved items</h2>
          <button type="button" className="secondary-button" onClick={() => void loadItems()}>
            Refresh
          </button>
        </div>

        {isLoading ? <p className="message">Loading items...</p> : null}

        {!isLoading && items.length === 0 ? (
          <p className="message">No items yet. Add the first one above.</p>
        ) : null}

        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong>
              <span>{new Date(item.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}