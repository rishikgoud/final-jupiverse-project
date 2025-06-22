const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();


const app = express();
app.use(express.json());
const corsOptions = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:3000'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// Allow preflight requests
app.options('*', cors(corsOptions));


const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
