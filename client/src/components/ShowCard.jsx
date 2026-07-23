import React, { useEffect, useState } from 'react';

export default function ShowCard(props) {
  //check the props to make sure the names are good
  return (
    <div className="nav flex-center space-between">
      <img src={"https://artworks.thetvdb.com" + props.show.image} className="w-50"></img> 
      <h3>{props.show.name}</h3>
    </div>
  );
}
