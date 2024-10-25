import 'dotenv/config';


const config = {
            // @ts-ignore
    port: process.env.PORT,
    mongoose: {
            // @ts-ignore
        url: process.env.MONGODB_URL + (process.env.NODE_ENV) + "?retryWrites=true&w=majority",
        options: {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
    },
};

export default config;