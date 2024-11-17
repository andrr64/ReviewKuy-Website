import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Mendapatkan __dirname untuk ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001; // Port untuk aplikasi client

// Menyajikan file statis hasil build React client
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Client app is running at http://localhost:${port}`);
});
