import { useRouter } from "next/router";
import Image from "next/image";
export async function getServerSideProps(context: { params: { id: string; }; }) {
    const { id } = context.params;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    return {
        props: { pokemonDetails: data },
    };
}

type pokemonDetails = {
    abilities: object[];
    types: object[];
    stats: object[];
    moves: object[];
}

const PokemonDetail = ({ pokemonDetails }: { pokemonDetails: pokemonDetails }) => {
    console.log(pokemonDetails, "pokemonDetails")
    const router = useRouter();
    const { name, id } = router.query;
    type Pokemon = {
        ability?: {
            name?: string;
        };
        type?: {
            name?: string;
        };
        stat?: {
            name?: string;
        };
    };
    return (
        <div className="px-1 sm:px-3 lg:px-15 pt-10 pb-10" >
            <h1 className="pb-1 text-gray-900 font-bold px-5 text-2xl ">{name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 align-middle pt-2 px-5 ">
                <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt={`${name}`}
                    width={200}
                    height={200}
                    className="align-center bg-gray-200 rounded-md p-2"
                />
            </div>

            <h1 className="pb-1 text-gray-900 font-bold px-5 pt-3 text-2xl">Abilities</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 align-middle pt-2 px-5">
                {pokemonDetails.abilities?.map((pokemon: Pokemon, index: number) => {
                    return (
                        <div key={index} className="overflow-hidden transition-all hover:shadow-lg cursor-pointer rounded-md p-2 bg-gray-200 px-3 text-xl">
                            {/* {index + 1}. */}
                            {pokemon?.ability?.name}
                        </div>
                    )
                })}
            </div>
            <div>
                <h1 className="pb-1 text-gray-900 font-bold px-5 pt-3 text-2xl">Stats</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 align-middle pt-2 px-5">
                    {pokemonDetails.stats?.map((pokemon: Pokemon, index: number) => {

                        return (
                            <div key={index} className="overflow-hidden transition-all hover:shadow-lg cursor-pointer rounded-md p-2 bg-gray-200 px-3 text-xl">
                                {pokemon?.stat?.name}

                            </div>
                        )
                    })}
                </div>

            </div>
            <div>
                <h1 className="pb-1 text-gray-900 font-bold px-5 pt-3 text-2xl">Types</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 align-middle pt-2 px-5">
                    {pokemonDetails.types?.map((pokemon: Pokemon, index: number) => {

                        return (
                            <div key={index} className="overflow-hidden transition-all hover:shadow-lg cursor-pointer rounded-md p-2 bg-gray-200 px-3 text-xl">
                                {/* <li>  {pokemon?.name}</li> */}
                                {/* {index + 1}. */}
                                {pokemon?.type?.name}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <h1 className="pb-1 text-gray-900 font-bold px-5 pt-3 text-2xl">Moves</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 align-middle pt-2 px-5">
                    {pokemonDetails.moves?.map((pokemon: any, index: any) => {

                        return (
                            <div key={index} className="overflow-hidden transition-all hover:shadow-lg cursor-pointer rounded-md p-2 bg-gray-200">
                                {/* <li>  {pokemon?.name}</li> */}
                                <div className="px-1 text-xl">
                                    {/* {index + 1}.  */}
                                    {pokemon?.move?.name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    );
};

export default PokemonDetail;
