import 'dotenv/config';


const config = {
            // @ts-ignore
    port: process.env.PORT,
    mongoose: {
      // url: process.env.MONGODB_URL + (process.env.NODE_ENV) + "?retryWrites=true&w=majority",
      // @ts-ignore
        url: process.env.MONGODB_URL ,
        options: {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
    },
};

export default config;