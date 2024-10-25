import mongoose from 'mongoose'
import app from './app'
import { fetchAndSaveData } from './modules/photo/photo.service'
import config from './config/config';

const setupDataFetching = (): void => {
            // @ts-ignore
    fetchAndSaveData();
    
    setInterval(() => {
            // @ts-ignore
        fetchAndSaveData();
    }, 60000);
}

const ConnectToMongoDB = async () => {
    try {
        // @ts-ignore
        await mongoose.connect(config.mongoose.url).then(()=>{
            console.log('Connected to MongoDB...');
            server = app.listen(config.port, ()=>{
                console.log(`Listening on port ${config.port}`)
                setupDataFetching()
            })
        })
    } catch (err: any){
        console.log(err.message)
        setTimeout(ConnectToMongoDB, 5000)
    }
}

let server: any;
ConnectToMongoDB();

const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
};
  
const unexpectedErrorHandler = (error: string) => {
console.log(error);
exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
console.log('SIGTERM received');
if (server) {
    server.close();
}
});