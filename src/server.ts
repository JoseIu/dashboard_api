import expresApp from './app';

const PORT = process.env.PORT || 3000;

const server = expresApp.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});

export default server;
