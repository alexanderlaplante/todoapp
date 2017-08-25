import * as mongoose from 'mongoose';
import * as q from 'q';

global.Promise = q.Promise; // use the q promise library

export function connect(done) {
    mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true }); // Since mongoose and mongodb have gone through a lot of changes, we need
                                                                         // to tell mongoose to use the most current connect method, which is MongoClient
    mongoose.connection.config['autoIndex'] = false; // setting to false boosts performance
    mongoose.connection.on('connected', err => {
        if (err) console.error("Error connecting to the database");
        done();
    });
}
