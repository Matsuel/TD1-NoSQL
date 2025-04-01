import express, { type Application } from 'express';
import { connectToMongoDB } from './config/mongodb';
import { router } from './routes';

const app: Application = express();
app.use(express.json());

async function startServer() {
    await connectToMongoDB();

    app.listen(3000, "0.0.0.0", () => {
        console.log('🚀 Server is running on port 3000');
    });
}

startServer();

app.use(router);
