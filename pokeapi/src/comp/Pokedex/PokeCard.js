import React, { useEffect, useState } from "react";

export default function PokeCard({ pokeList, pokeIndex }) {
  const [pokemon, setpokemon] = useState(null); //save fetched pokemon
  const [loading, setloading] = useState(true);

  async function fetchPokemon(url) {
    //fetch pokemon
    try {
      const res = await fetch(url);
      const data = await res.json();
      setpokemon(data);
      setloading(false);
    } catch (e) {}
  }

  useEffect(() => { //fetch pokemon when index changes
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

  return <>{loading ? <p>Loading...</p> : createCard(pokemon)}</>;
}
