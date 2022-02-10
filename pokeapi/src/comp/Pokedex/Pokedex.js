import React, { useEffect, useState } from "react";
import PokeCard from "./PokeCard";

export default function Pokedex() {
  const [pokeList, setPokeList] = useState([]);
  const [pokeIndex, setpokeIndex] = useState(-1);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getPokeList();
  }, []);

  useEffect(() => {
    let titleName =
      pokeList.length > 0 ? pokeList[pokeIndex].name.toUpperCase() : "Pokedex";
    document.title = titleName;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokeIndex]);

  function getPokeList() {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((val) => setPokeList(val.results))
      .then(() => setpokeIndex(0))
      .then(() => setloading(false));
  }

  return (
    <div className="w-full h-full flex flex-col gap-8 justify-center items-center">
      <p className="text-white text-6xl">Pokédex</p>
      {loading ? null : <PokeCard pokeList={pokeList} pokeIndex={pokeIndex} />}
      <div className="flex flex-row gap-8 w-80 justify-between">
        <button
          onClick={() =>
            setpokeIndex(() => (pokeIndex > 0 ? pokeIndex - 1 : 0))
          }
          className="bg-white px-4 py-1 rounded-md flex justify-center items-center text-2xl font-semibold"
        >
          Prev
        </button>
        <button
          onClick={() => setpokeIndex(pokeIndex + 1)}
          className="bg-white px-4 py-1 rounded-md flex justify-center items-center text-2xl font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
}
