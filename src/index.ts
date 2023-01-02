import express, { json } from 'express';
import { AppDataSource } from './data-source';
import apiRouter from './routes/router';

AppDataSource.initialize().then(async () => {
    const { PORT } = process.env;
    const app = express();

    app.use(json());

    app.use('/api', apiRouter);

    app.listen(PORT, () => {
        console.log('Hello!');
    }).on('error', (error) => {
        console.error(error);
    });
}).catch((error) => console.log(error));