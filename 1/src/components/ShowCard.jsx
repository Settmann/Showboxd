import React, { useEffect, useState } from 'react';

export default function ShowCard(props) {
  //check the props to make sure the names are good
  return (
    <div class="nav flex-center space-between">
      <img src={props.poster}></img> 
      <p>{props.rating}</p>
      <h3>{props.title}</h3>
    </div>
  );
}
