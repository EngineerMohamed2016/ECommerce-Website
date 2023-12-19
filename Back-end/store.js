const connectDB = require('./database/connectDB');
require('dotenv').config();
// data
const laptops = require('./data/laptops');
const mobiles = require('./data/mobiles');
const earbuds = require('./data/earbuds');
const overears = require('./data/overears');
const sliderImgs = require('./data/sliderImgs');

// collections
const LapsCollection = require('./models/products/laptop-model');
const MobsCollection = require('./models/products/mobile-model');
const EarbudsCollection = require('./models/products/earbud-model');
const OverearsCollection = require('./models/products/overear-model');
const SliderCollection = require('./models/products/slider-model');

// storing & deleting
const storeAtDB = async () => {
    try {
        // deleting
        await connectDB(process.env.MONGO_URI);
        await LapsCollection.deleteMany();
        await MobsCollection.deleteMany();
        await EarbudsCollection.deleteMany();
        await OverearsCollection.deleteMany();
        await SliderCollection.deleteMany();

        // storing
        await LapsCollection.create(laptops);
        await MobsCollection.create(mobiles);
        await EarbudsCollection.create(earbuds);
        await OverearsCollection.create(overears);
        await SliderCollection.create(sliderImgs);
        process.exit(1);
    }
    catch (e) {
        console.log(e.message);
    }
};
storeAtDB();