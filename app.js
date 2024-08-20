require('dotenv').config();
require('express-async-errors');

//Extra Security Packages 
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xxs-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express');
const app = express();

//Connect DB
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')
//routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
//Security Middleware for deployment 
//this one to trust heroku 
app.set('trust proxy', 1);
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `windowMS` (here, per 15 minutes).
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());


// routes
// app.get('/', (req, res) => {
//   res.send('jobs api');
// });
app.use('/api/V1/auth', authRouter)
app.use('/api/V1/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
