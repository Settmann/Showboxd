const apikey = { apikey: "46194291-7a88-4a88-9d81-9cf6a13a4f41" };

async function fetchData() {
  const tvShows = [];
  const token = await login();
  
}

async function login(){
  try {
    const response = await fetch('https://api4.thetvdb.com/v4/login', {
      method: 'POST',
      body: JSON.stringify(apikey)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message}`)
    }

    const token = await response.json();
    return token;
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
    series.data.forEach(async (show) => {
      const episodes = await fetchEpisodes(token, show.id);
      show.episodes =  episodes;
    })
  } catch (error){
    console.error('POST error:', error.message);
  }
}

async function fetchEpisodes(token, id){
  try {
    const response =  await fetch(`https://api4.thetvdb.com/v4/series/${id}/episodes/default`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message}`)
    }

    const episodes = await response.json();
    return episodes.data.episodes;

  } catch (error){
    console.error('POST error:', error.message);
  }
}