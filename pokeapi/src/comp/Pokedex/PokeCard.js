import React from "react";

export default function PokeCard({ pokeList }) {
  function createCard(index) {
    console.log(pokeList);
    return (
      <div className="bg-white w-80 h-1/2 rounded-lg shadow-2xl">
        {pokeList[index]}
      </div>
    );
  }

  return <>{createCard(1)}</>;
}
