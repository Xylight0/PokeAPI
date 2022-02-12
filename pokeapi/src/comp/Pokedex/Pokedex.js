import React, { useEffect, useState } from "react";
import PokeCard from "./PokeCard";

export default function Pokedex() {
  const [pokeList, setPokeList] = useState([]); //List of all pokemon
  const [pokeIndex, setpokeIndex] = useState(1); //Index of fetched data 0-21
  const [overallIndex, setoverallIndex] = useState(0); //Overall index
  const [loading, setloading] = useState(true); //Data loading
  const [nextUrl, setnextUrl] = useState("https://pokeapi.co/api/v2/pokemon"); //Url for the next 20 pokemon
  const [prevUrl, setprevUrl] = useState(null); //Url of the previous 20 pokemon

  useEffect(() => {
    getPokeList(nextUrl); //get list of the first 20 pokemon on render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let titleName = !loading //change title
      ? pokeList[pokeIndex].name.toUpperCase()
      : "Pokedex";
    document.title = titleName;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokeIndex, loading]);

  useEffect(() => {
    if (pokeIndex === 21) { //end of the list => get next pokemon list
      setloading(true);
      getPokeList(nextUrl);
      setpokeIndex(1);
    }
    if (pokeIndex === 0 && overallIndex > 1) { //start of the list => get previous pokemon list
      setloading(true);
      getPokeList(prevUrl);
      setpokeIndex(20);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokeIndex]);

  function getPokeList(url) { //fetch pokemon list from api
    fetch(url) 
      .then((res) => res.json())
      .then((list) => {
        setnextUrl(list.next);
        setprevUrl(list.previous);
        setPokeList([{ name: "first" }, ...list.results, { name: "last" }]); //add object at the start and end
      })
      .then(() => setloading(false));
  }

  return (
    <div className="w-full h-full flex flex-col gap-8 justify-center items-center">
      <p className="text-white text-6xl">Pokédex</p>
      <div className="bg-white w-80 rounded-lg shadow-2xl flex justify-center items-center p-8 h-96 text-3xl relative">
        <div>
          <p className="absolute left-4 top-4 text-xl font-semibold text-slate-700">
            #{overallIndex}
          </p>
          {loading ? null : ( //render the card with the fetched data
            <PokeCard
              pokeList={pokeList}
              pokeIndex={pokeIndex}
              overallIndex={overallIndex}
              pokedexLoading={loading}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row gap-8 w-80 justify-between">
        <button //decrement index on click
          onClick={() => {
            setpokeIndex(() => (pokeIndex > 0 ? pokeIndex - 1 : 0));
            setoverallIndex(() => (overallIndex > 0 ? overallIndex - 1 : 0));
          }}
          className="bg-white select-none px-4 py-1 rounded-md flex justify-center items-center text-2xl font-semibold"
        >
          Prev
        </button>
        <button //increment index on click
          onClick={() => {
            setpokeIndex(pokeIndex + 1);
            setoverallIndex(overallIndex + 1);
          }}
          className="bg-white select-none px-4 py-1 rounded-md flex justify-center items-center text-2xl font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
}
