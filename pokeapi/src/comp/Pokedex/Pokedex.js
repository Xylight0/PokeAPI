import React, { useEffect, useState } from "react";
import PokeCard from "./PokeCard";

export default function Pokedex() {
  const [pokeList, setPokeList] = useState([]);
  const [pokeIndex, setpokeIndex] = useState(1);
  const [overallIndex, setoverallIndex] = useState(0);
  const [loading, setloading] = useState(true);
  const [nextUrl, setnextUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [prevUrl, setprevUrl] = useState(null);

  useEffect(() => {
    getPokeList(nextUrl);
  }, []);

  useEffect(() => {
    let titleName = !loading
      ? pokeList[pokeIndex].name.toUpperCase()
      : "Pokedex";
    document.title = titleName;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokeIndex, loading]);

  useEffect(() => {
    if (pokeIndex === 20) {
      setloading(true);
      getPokeList(nextUrl);
      setpokeIndex(1);
    }
    if (pokeIndex === 0 && overallIndex > 10) {
      setloading(true);
      getPokeList(prevUrl);
      setpokeIndex(19);
    }
  }, [pokeIndex]);

  function getPokeList(url) {
    fetch(url)
      .then((res) => res.json())
      .then((list) => {
        setnextUrl(list.next);
        setprevUrl(list.previous);
        let results = list.results;
        results.push({ name: "last" });
        setPokeList([{ name: "first" },...results]);
      })
      .then(() => setloading(false));
  }

  return (
    <div className="w-full h-full flex flex-col gap-8 justify-center items-center">
      <p className="text-white text-6xl">Pokédex</p>
      <div className="bg-white w-80 rounded-lg shadow-2xl p-8 text-3xl relative">
        {loading ? null : (
          <PokeCard
            pokeList={pokeList}
            pokeIndex={pokeIndex}
            overallIndex={overallIndex}
          />
        )}
      </div>
      <div className="flex flex-row gap-8 w-80 justify-between">
        <button
          onClick={() => {
            setpokeIndex(() => (pokeIndex > 0 ? pokeIndex - 1 : 0));
            setoverallIndex(() => (overallIndex > 0 ? overallIndex - 1 : 0));
          }}
          className="bg-white px-4 py-1 rounded-md flex justify-center items-center text-2xl font-semibold"
        >
          Prev
        </button>
        <button
          onClick={() => {
            setpokeIndex(pokeIndex + 1);
            setoverallIndex(overallIndex + 1);
          }}
          className="bg-white px-4 py-1 rounded-md flex justify-center items-center text-2xl font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
}
