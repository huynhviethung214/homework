const app = require('./app');
const config = require('./app/config');
const mongodb = require('./app/utils/mongodb.utils');

async function startServer() {
    try {
        await mongodb.connect(config.db.uri);
        console.log('Database Connected');

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    } catch (e) {
        console.log('Cannot connect to the database!', error);
        process.exit();
    }
}