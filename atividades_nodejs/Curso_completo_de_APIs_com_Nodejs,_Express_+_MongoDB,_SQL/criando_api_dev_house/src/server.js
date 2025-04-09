const app = require('./app');

const port = 3010;

app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}/`)
})