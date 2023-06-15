import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import { useDebounce } from 'use-debounce';
import { Header, Body } from '@/components/Layout';
import Pokemon from '@/components/Pokemon';
import Filter from '@/components/Filter';
import IconFilter from '@/components/IconFilter';

export default function PokeDex() {
  const [pokemons, setPokemons] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchString] = useDebounce(searchText, 300);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    (async () => {
      await getPokemons();
    })();
  }, []);

  async function getPokemons() {
    const client = new ApolloClient({
      uri: 'https://graphql-pokemon2.vercel.app/',
      cache: new InMemoryCache(),
    });

    await client
      .query({
        query: gql`
          {
            pokemons(first: 20) {
              id
              name
              types
              image
              classification
              number
            }
          }
        `,
      })
      .then((result) => {
        setPokemons(result.data.pokemons ?? []);
      });
  }
  function handleFilter(types) {
    setSelectedTypes(types);
  }

  const filteredPokemons = useMemo(() => {
    return pokemons
      .filter(
        (f) =>
          (selectedTypes.length > 0
            ? f.types.every((value) => selectedTypes.includes(value))
            : true) &&
          f.name.toLowerCase().includes(searchString?.toLowerCase()),
      )
      .sort((a, b) => a.number + b.number);
  }, [selectedTypes, searchString, pokemons]);

  return (
    <>
      {openFilter && (
        <Filter
          callback={handleFilter}
          close={setOpenFilter}
          selectedTypes={selectedTypes}
        />
      )}
      <Header />
      <Body>
        <div className=" max-w-screen-xl mx-auto px-4">
          <div className="search-pokemon-wrapper">
            <div class="group">
              <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
              <input
                type="search"
                className="w-full input md:w-1/4"
                placeholder="Search pokémon..."
                value={searchText || ''}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                type="button"
                style={{
                  cursor: 'pointer',
                  // border: '2px solid #000',
                  background: '#f3f3f4',
                  borderRadius: '10px',
                  padding: '5px',
                  height: '40px',
                }}
                className="f-btn"
                onClick={() => {
                  setOpenFilter(true);
                }}
              >
                {selectedTypes.length > 0 && (
                  <span>{selectedTypes.length}</span>
                )}
                <IconFilter />
              </button>
            </div>
          </div>
        </div>
        <div className=" max-w-screen-xl mx-auto px-4 poke-list mt-3 flex flex-wrap pb-5">
          {filteredPokemons.map((pokemon, i) => (
            <Pokemon key={i} data={pokemon} />
          ))}
        </div>
      </Body>
    </>
  );
}
