import cors from 'cors';
import express from 'express';
import { createItemRouter } from './routes/items';

const app = express();
const port = Number(process.env.PORT) || 8000;
const frontendOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

// The item API lives in a separate router so the server stays easy to scan.
app.use('/api/items', createItemRouter());

app.use((_request, response) => {
  response.status(404).json({ message: 'Not found' });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
