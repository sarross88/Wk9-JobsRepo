require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//Extra Security Packages 


//Connect DB
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')
//routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

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
