import React, { useEffect, useState } from "react";
import PokeCard from "./PokeCard";

export default function Pokedex() {
  const [pokeList, setPokeList] = useState([1, 2, 3, 4, 5, 6]);
  const [pokeIndex, setpokeIndex] = useState("0");

  useEffect(() => {
    //setPokeList(getPokeList());
  }, []);

  /*function getPokeList() {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((val) => setPokeList(val.results));
  }*/

  return (
    <div className="w-full h-full flex flex-col gap-8 justify-center items-center">
      <PokeCard pokeList={pokeList} />
      <div className="flex flex-row gap-8 w-80 justify-between">
        <div className="bg-white px-4 py-1 rounded-md flex justify-center items-center text-2xl font-semibold">
          <p>Prev</p>
        </div>
        <div className="bg-white px-4 py-1 rounded-md flex justify-center items-center text-2xl font-semibold">
          <p>Next</p>
        </div>
      </div>
    </div>
  );
}
