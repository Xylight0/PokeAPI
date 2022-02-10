import React, { useEffect, useState } from "react";

export default function PokeCard({ pokeList, pokeIndex }) {
  const [pokemon, setpokemon] = useState(null);
  const [loading, setloading] = useState(true);

  async function fetchPokemon(url) {
    const res = await fetch(url);
    const data = await res.json();
    setpokemon(data);
    setloading(false);
  }
  useEffect(() => {
    fetchPokemon(pokeList[pokeIndex].url);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokeIndex]);

  function createCard(pokemon) {
    console.log(pokemon)
    const pokImgUrl = pokemon.sprites.other.dream_world.front_default;
    return (
      <div className="flex flex-col gap-4 items-center">
        
        <div className="w-52 h-52 flex justify-center items-center mt-2 border-4 border-slate-400 rounded-full p-8">
          <img className="" src={pokImgUrl} alt="pokemon" />
        </div>
        <p className="w-full flex justify-center font-semibold mt-2">{pokemon.name.toUpperCase()}</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-80 h-1/2 rounded-lg shadow-2xl p-8 text-3xl relative">
      <p className="absolute left-4 top-4 text-xl font-semibold">#{pokeIndex}</p>
      {loading ? <p>Loading...</p> : createCard(pokemon)}
    </div>
  );
}
