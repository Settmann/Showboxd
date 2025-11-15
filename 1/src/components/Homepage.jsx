import React, { useEffect, useState } from 'react';
import ShowCard from './ShowCard.jsx';

export default function Homepage(props) {

  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('/api/v1/shows/')
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
      })
      .catch((error) => {
        console.error('Error fetching shows:', error);
      });
  }, []); 
  
  return (
    <div class="nav flex-center space-between">
      <div>
        <h1>Watch Shows</h1>
        <h1>Write Reviews</h1>
        <h1>Create Lists{shows}</h1>
      </div>
      <div>
        <ShowCard></ShowCard>
        <ShowCard></ShowCard>
        <ShowCard></ShowCard>
        <ShowCard></ShowCard>
      </div>
    </div>
  );
}

