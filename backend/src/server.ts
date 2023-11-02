
import express from 'express';
import router from './router';
import {NODE_PORT} from './config';

const app = express();
app.use(express.json());
app.use('/api',router);


app.listen(NODE_PORT, () => {
    console.log(`Server running at http://localhost:${NODE_PORT}`);
});


