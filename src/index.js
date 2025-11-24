import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the application!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;






