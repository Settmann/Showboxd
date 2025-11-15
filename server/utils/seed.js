const DB = require('../mongodb/connect');
const { fetchData } = require('./fetchdata');
const path = require('path');
const db = new DB();

const occupyDB = async () => {
  const shows = await fetchData();
  try {
    const db = new DB();
    await db.connect('showboxd', 'tvshows');
    //need to add a function that will only add new movies from the api. not erase everything and then call them all back
    //this would make it so that movies added but clients dont vannish
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
