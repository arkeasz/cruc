import express from 'express';
import * as config from './config/index.js';
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cors from 'cors'

const app = express();
const PORT = config.PORT || 3000;

connectDB();

app.use(cors())
app.use(express.json());
app.use('/api/tasks', router);

app.listen(PORT, () =>   {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
})
