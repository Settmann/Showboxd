import React, { useEffect, useState } from 'react';
import ShowCard from './ShowCard.jsx';

export default function Homepage(props) {

  const [previewFour, setPreviewFour] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/shows/rand");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPreviewFour(data);
      } catch (err) {
        console.error("Error fetching shows:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);
  
  return (
    <div className="nav flex-center space-between">
      <div>
        <h1 className='w-screen text-center pt-30'>Watch Shows. Write Reviews. Create Lists. Repeat</h1>
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

