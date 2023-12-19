require('express-async-errors');

const express = require('express');
const app = express();

const helmet = require('helmet')
app.use(helmet())

const connectDB = require('./database/connectDB');

require('dotenv').config();
app.use(express.json());

// cors 
const cors = require('cors');
app.use(cors());

// routes
const laptops_router = require('./routes/products/laptops-routes');
const mobiles_router = require('./routes/products/mobiles-routes');
const earbuds_router = require('./routes/products/earbuds-routes');
const overears_router = require('./routes/products/overears-routes');
const slider_router = require('./routes/products/slider-routes');
const auth_router = require('./routes/auth/auth-routes');
const address_router = require('./routes/address/address-routes');
const visa_router = require('./routes/payment/payment-routes');
const transaction_router = require('./routes/transactions/transactions-routes');

app.use('/api/v1/laptops', laptops_router);
app.use('/api/v1/mobiles', mobiles_router);
app.use('/api/v1/earbuds', earbuds_router);
app.use('/api/v1/overears', overears_router);
app.use('/api/v1/slider', slider_router);
app.use('/api/v1/auth', auth_router);
app.use('/api/v1/address', address_router);
app.use('/api/v1/visa', visa_router);
app.use('/api/v1/transactions', transaction_router);


// not found route
const notFound = require('./middleware/not-found');
app.use(notFound);

// error-handler 
const handleErrorMiddleware = require('./middleware/errorHandler');
app.use(handleErrorMiddleware);

// connect DB + spin up the server
runServer();
async function runServer() {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(5000, '192.168.1.5', () => console.log('Server Listening'));
    }
    catch (e) {
        console.log(e.message);
    }
} 
