import React from "react";

export default function PokeCard({ pokeList, pokeIndex }) {
  function createCard(index) {
    console.log(pokeList[index]);
    return (
      <div className="bg-white w-80 h-1/2 rounded-lg shadow-2xl p-8 text-3xl">
        {1}
      </div>
    );
  }

  return <>{createCard(pokeIndex)}</>;
}
