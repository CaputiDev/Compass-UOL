import app from '../app.js';

const port = 3050;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
