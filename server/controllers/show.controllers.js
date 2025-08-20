const DB = require('../mongodb/connect');

const db = new DB();

const getAllShows = async (req,res) => {
  try {
    await db.connect('showboxd', 'tvshows');
    const shows = await db.readAll();
    res.status(200).json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  try{
    const { id } = req.params;
    await db.connect('cluster0', 'movies');
    const result = await db.findMovieById(id);
    if (result){
      res.status(200).json(result);
    }else{
      res.status(404).json({ 'status': 404, 'error': 'Failed to find movie' }); 
    }
  } catch (e){
    res.status(500).json({ 'status': 500, 'error': e.message });
  }
};



module.exports = {
  getAllShows
};

