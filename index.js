const express = require('express');
const cors = require('cors');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('redis');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
});

// Initialize store.
let redisStore = new RedisStore({
    client: redisClient,
})

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('successfully connected'))
        .catch(e => {
            console.log(e);
            setTimeout(connectWithRetry, 5000);
        });
}

connectWithRetry();

app.enable("trust proxy");
app.use(cors({}));

// app.use(session({
//     store: redisStore,
//     secret: SESSION_SECRET,
//     cookie: {
//         secure: false,
//         resave: false,
//         saveUninitialized: false,
//         httpOnly: true,
//         maxAge: 60000,
//         expires: 60000
//     }
// }))


app.use(express.json());

app.get('/api/v1/', (req, res) => {
    res.send('<h2>dfsdfs</h2>');
    console.log('running');
})

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})