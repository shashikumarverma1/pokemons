import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
  const data = await res.json();

  return {
    props: { pokemon: data.results },
    revalidate: 10, // Re-fetches every 10 seconds
  };
}

export default function Home({ pokemon }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredPokemon = pokemon?.filter((pokemon: any) => {
    return pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  type Pokemon = {
    name: string;
    url: string;
  };

  return (
    <div className="px-1 sm:px-3 lg:px-15 pb-5" >
      <div className="flex flex-col items-center bg-white px-5">
        <h1 className="pb-1 text-gray-900 font-bold p-10 pb-5 text-[20px]" >Pokemon List</h1>
        <input
          type="text"
          placeholder="Search Pokemon by name"
          className="flex h-10 w-full rounded-md border   border-input bg-background bg-background px-3 py-2 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: "10px", padding: "5px", paddingLeft: "10px" }}
        />
      </div>
      <ul>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 align-middle pt-2 px-5">
          {filteredPokemon?.map((pokemon: Pokemon, index: number) => {
            return (
              <div onClick={() => {
                router.push(`/Pokemon/${index + 1}?name=${encodeURIComponent(pokemon?.name)}`);
              }}
                className="overflow-hidden transition-all hover:shadow-lg cursor-pointer rounded-md p-2 bg-gray-200 "
                key={index}>
                <div>
                  <p className="pb-1 text-gray-900 font-bold px-2 pt-2 text-xl">{index + 1}.</p>
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                    alt={`${pokemon?.name}`}
                    width={80}
                    height={80}
                    className="align-center w-full"
                  />
                  <h1 className="text-center  w-full relative -top-4 font-bold text-xl "> {pokemon?.name}</h1>
                </div>
              </div>
            )
          })}
        </div>
        {
          filteredPokemon?.length === 0 && (<h1 className="pb-1 text-gray-900 font-bold px-5 pt-3">No Pokemon Found</h1>)
        }
      </ul>
    </div>
  );
}
