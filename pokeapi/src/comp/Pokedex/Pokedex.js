import React, { useEffect, useState } from "react";

export default function Pokedex() {
  const [pokeList, setPokeList] = useState([]);

  useEffect(() => {
    setPokeList(getPokeList);
  }, []);

  function getPokeList() {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then((data) => console.log(data.results));
  }

  function createCart() {
    return <div className="bg-white w-80 h-1/2 rounded-lg shadow-2xl"></div>
  }

  return <div className="w-full h-full flex justify-center items-center">{createCart()}</div>;
}
