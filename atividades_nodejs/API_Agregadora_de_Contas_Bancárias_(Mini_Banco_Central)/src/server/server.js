import app from '../app.js';

const port = 3050;
import database from '../database/db.js';

database.sync({})

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://localhost:${port}/`);
});
