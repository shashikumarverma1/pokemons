import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
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
    <div className="flex flex-col items-center max-w-[80%] mx-auto bg-gray-100 text-gray-900 pt-[100px] pb-[100px]" >
      <h1 className="pb-1 text-gray-900 font-bold" >Pokemon List</h1>
      <input
        type="text"
        placeholder="Search Pokemon..."
        className="border border-gray-500 rounded-md border-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", paddingLeft: "10px" }}
      />
      <ul>
        {filteredPokemon?.map((pokemon: Pokemon, index: number) => {

          return (
            <div key={index}>

              <button className='text-gray-900' onClick={() => {

                router.push(`/Pokemon/${index + 1}`);
              }}> {index + 1}. {pokemon?.name}</button>
            </div>
          )
        })}
        {
          filteredPokemon?.length === 0 && <p>No Pokemon Found</p>
        }
      </ul>
    </div>
  );
}
