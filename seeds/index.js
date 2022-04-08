const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Camping is a fun recreational activity that allows you to enjoy the outdoors,usually amidst all that Mother Nature has to offer. People go camping in a forest, national park, in the woods, near a river or lake, and can stay there for one or more nights. There are private campgrounds as well that are privately owned by people who encourage campers to come and enjoy the nature with them. Camping trips can be fun when organized properly.',
            price
        })
        await camp.save();
    }
}

// seedDB()
seedDB().then(() => {
    mongoose.connection.close();
})