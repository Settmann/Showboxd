const DB = require('../mongodb/connect');
const { fetchData } = require('./fetchdata');
const path = require('path');
const db = new DB();

const occupyDB = async () => {
  const shows = await fetchData();
  try {
    const db = new DB();
    await db.connect('showboxd', 'tvshows');
    await db.deleteMany({});
    await db.createMany(shows);
    await db.createIndex('tvshows', { 
      id: 1, 
      name: 1
    });
  } catch (e) {
      console.error('could not seed');
      console.error(e);
  } finally {
      if (db) {
        db.close();
      }
      process.exit();
  }
};

occupyDB();
