require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');

const controllers = require('./controllers');

app.use(Express.json());
app.use(require('./middleware/headers')); //

app.use('/user', controllers.userController);

app.use(require("./middleware/validate-session")); //

app.use('/log', controllers.logController);

dbConnection.authenticate()
    .then(() => dbConnection.sync()) // .sync({force: true}) <= drops and resets database tables
    .then(() => {
        app.listen(3001, ()=>{
            console.log(`[Server]: App is listening on 3001.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });
