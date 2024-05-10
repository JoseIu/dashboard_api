import 'dotenv/config';
import express from 'express';

const PORT = process.env.PORT || 3000;
const expresApp = express();

expresApp.use(express.json());
expresApp.use(express.text());

expresApp.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
