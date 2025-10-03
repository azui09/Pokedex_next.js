"use client";

import { useState, useEffect } from "react";

export default function Homepage() {
  const [todosPokemons, setTodosPokemons] = useState<string[]>([]);
  const [filtroPokemon, setFiltroPokemon] = useState<string[]>([]);
  const [pokemon, setPokemon] = useState({
    name: "",
    tipo: [] as string[],
    sprite: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
      );
      const data = await res.json();
      setTodosPokemons(data.results.map((p: any) => p.name));
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setFiltroPokemon(
        todosPokemons.filter((name) => name.startsWith(search.toLowerCase()))
      );
    } else {
      setFiltroPokemon([]);
    }
  }, [search, todosPokemons]);

  const handleClick = async (name: string) => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      const data = await res.json();
      setPokemon({
        name: data.name,
        tipo: data.types.map((t: any) => t.type.name),
        sprite: data.sprites.other["official-artwork"].front_default,
      });
    } catch {
      setPokemon({ name: "Não encontrado", tipo: [], sprite: "" });
    }
  };
  return (
    <main className="flex flex-col justify-center items-center pt-10">
      <div className="pb-10 gap-x-40">
        <input
          type="text"
          value={search}
          placeholder="Insira o nome do pokemon"
          className="px-4 py-2 rounded-lg text-white bg-zinc-800"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button
          onClick={() => handleClick(search)}
          className="ml-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Buscar Pokémon
        </button>
        {filtroPokemon.length > 0 && (
          <ul className="bg-zinc-700 rounded-lg text-white max-h-40 overflow-y-auto">
            {filtroPokemon.slice(0, 10).map((name) => (
              <li
                key={name}
                className="px-4 py-2 hover:bg-zinc-600 cursor-pointer capitalize"
                onClick={() => {
                  handleClick(name);
                  setSearch(name);
                  setFiltroPokemon([]);
                  setSearch("");
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-row gap-x-30">
        <div className="w-[300px] h-[500px] bg-zinc-800 rounded-lg flex flex-col justify-center items-center">
          {pokemon.sprite && <img src={pokemon.sprite} alt={pokemon.name} />}
        </div>
        <div className="w-[450px] h-[500px] bg-zinc-800 rounded-lg flex flex-col justify-center items-center">
          {pokemon.name && (
            <>
              <h2 className="text-2xl capitalize font-bold">{pokemon.name}</h2>
              <p>Tipos: {pokemon.tipo.join(", ")}</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
