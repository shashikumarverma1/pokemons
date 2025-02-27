import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export async function getServerSideProps(context: { params: { id: any; }; }) {
    const { id } = context.params; // Get ID from URL

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    return {
        props: { pokemonDetails: data }, // Pass Pokémon data as props
    };
}

const PokemonDetail = ({ pokemonDetails }: { pokemonDetails: any }) => {



    return (
        <div className="  flex flex-col items-center max-w-[80%] mx-auto bg-gray-100 text-gray-900 pt-[100px] pb-[100px]" >

            <div >
                <div>
                    <div>
                        <h1 className="pb-1 text-gray-900 font-bold">Abilities</h1>
                        <div className='pl-5'>
                            {pokemonDetails.abilities?.map((pokemon: any, index: any) => {

                                return (
                                    <div key={index}>

                                        {index + 1}.  {pokemon?.ability?.name}
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                    <div>
                        <h1 className="pb-1 text-gray-900 font-bold">Types</h1>
                        <div className='pl-5'>
                            {pokemonDetails.types?.map((pokemon: any, index: any) => {

                                return (
                                    <div className='text-gray-900' key={index}>
                                        {/* <li>  {pokemon?.name}</li> */}
                                        {index + 1}. {pokemon?.type?.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <h1 className="pb-1 text-gray-900 font-bold">Stats</h1>
                        <div className='pl-5'>
                            {pokemonDetails.stats?.map((pokemon: any, index: any) => {

                                return (
                                    <div key={index} className='text-gray-900'>
                                        {index + 1}.  {pokemon?.stat?.name}

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h1 className="pb-1 text-gray-900 font-bold">Moves</h1>
                        <div className='pl-5'>
                            {pokemonDetails.moves?.map((pokemon: any, index: any) => {

                                return (
                                    <div key={index} className='text-gray-900'>
                                        {/* <li>  {pokemon?.name}</li> */}
                                        <div>{index + 1}. {pokemon?.move?.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PokemonDetail;
