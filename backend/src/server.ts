
import express from 'express';
import router from './router';
import {NODE_PORT} from './config';

const app = express();
app.use(express.json());
app.use('/api',router);


app.listen(3006 , '0.0.0.0', async () => {
    console.log(`Server running at http://0.0.0.0:${NODE_PORT}`);
});

