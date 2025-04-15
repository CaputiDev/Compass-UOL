import app from '../app.js';
import database from '../database/db.js';

const port = 3050;
const pgport = 5050;
database.sync({alter:true});

app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Server running at http://localhost:${port}/`);
    // eslint-disable-next-line
    console.log(`pgAdmin running at http://localhost:${pgport}`)
});
