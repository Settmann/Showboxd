const apikey = { "apikey": "46194291-7a88-4a88-9d81-9cf6a13a4f41" };

async function fetchData() {
  const tvShows = [];
  const token = await login();
  const seriers =  await fetchShow(token);
  return seriers;
}

async function login(){
  try {
    const response = await fetch('https://api4.thetvdb.com/v4/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apikey)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message}`)
    }

    const json = await response.json();
    return json.data.token;
  } catch (error){
    console.error('POST error:', error.message);
  }
}

async function fetchShow(token){
  try {
    const response = await fetch('https://api4.thetvdb.com/v4/series', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message}`)
    }

    const series = await response.json();
    //for every obj in series.data we need to fetch the episode lists
    await Promise.all(
      series.data.map(async (show) => {
        const episodes = await fetchEpisodes(token, show.id);
        show.episodes = episodes;
      })
    );
    //clean shows
    const cleanedSeries = cleanUpShows(series.data);
    return cleanedSeries;
  } catch (error){
    console.error('POST error:', error.message);
  }
}

async function fetchEpisodes(token, id){
  try {
    const response =  await fetch(`https://api4.thetvdb.com/v4/series/${id}/episodes/default`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}`,
                 'Content-Type': 'application/json' 
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message}`)
    }

    const episodes = await response.json();
    //clean episodes
    const cleanedEpisode = cleanUpEpidoes(episodes.data.episodes);
    return cleanedEpisode;

  } catch (error){
    console.error('POST error:', error.message);
  }
}

function cleanUpShows(shows){
  shows = shows.map(({ id, name, image, firstAired, episodes, overview }) => ({ id, name, image, firstAired, episodes, overview }));
  return shows;
}

function cleanUpEpidoes(episodes){
  episodes = episodes.map(({ id, name, aired, runtime, overview, image, number, seasonNumber }) => ({ id, name, aired, runtime, overview, image, number, seasonNumber }));
  return episodes;
}

module.exports = { fetchData }