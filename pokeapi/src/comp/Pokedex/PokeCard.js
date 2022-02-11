import React, { useEffect, useState } from "react";

export default function PokeCard({ pokeList, pokeIndex, overallIndex }) {
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
    const pokImgUrl = pokemon.sprites.other.dream_world.front_default;
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="w-52 h-52 flex justify-center items-center mt-2 border-4 border-slate-400 rounded-full p-10">
          <img src={pokImgUrl} alt="pokemon" />
        </div>
        <p className="w-full flex justify-center font-semibold mt-2 text-slate-800">
          {pokemon.name.toUpperCase()}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="absolute left-4 top-4 text-xl font-semibold text-slate-700">
        #{overallIndex}
      </p>
      {loading ? <p>Loading...</p> : createCard(pokemon)}
    </div>
  );
}
