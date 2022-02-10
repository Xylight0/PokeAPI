import React, { useEffect, useState } from "react";

export default function Pokedex() {

    const [pokeList, setPokeList] = useState([])

    useEffect(() => {
      setPokeList(getPokeList);
    }, [])
    
  function getPokeList() {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then((data) => console.log(data.results));
  }
  return <div>Pokedex</div>;
}
