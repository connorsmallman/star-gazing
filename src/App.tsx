import React, { useState } from 'react';

import {Repository, RepositoryList} from './components/RepositoriesList';
import {useRepositories} from "./hooks/useRepositories";
import cache from "./cache";

const repositoryFilterOptions = [
  { label: "None", value: "none" },
  { label: "Favorites", value: "isFavorite" },
];

function App() {
  const initialFilterKey = repositoryFilterOptions[0].value;
  const [filterKey, setFilterKey] = useState(initialFilterKey);

  const { repositories, isLoading, isError, mutate } = useRepositories(7);

  const favoriteRepository = (id: number) => {
    cache.set(id, true);
    mutate();
  }

  const unfavoriteRepository = (id: number) => {
    cache.delete(id);
    mutate();
  }

  const filteredRepositories = repositories?.filter((repository: Repository) => {
    const filterValue = repositoryFilterOptions.find(f => f.value === filterKey)?.value;
    if (filterValue === 'isFavorite') {
      return repository.isFavorite;
    }
    return true;
  });

  return (
      <div className="max-w-md mx-auto text-slate-800">
        <h1 className="p-6 text-center">Star Gazing</h1>
          <div>
            Filter By:
          <select className="
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            mb-4
            focus:text-gray-700 focus:bg-white
            focus:border-blue-600
            focus:outline-none
           " onChange={(event) => {
            setFilterKey(event.target.value);
          }}>
            {repositoryFilterOptions.map(filterOption => (
              <option
                key={filterOption.label}
                label={filterOption.label}>
                {filterOption.value}
              </option>
              ))}
          </select>
          </div>
        {isLoading ? (<span className="text-center">loading...</span>) : (
          <RepositoryList repositories={filteredRepositories} favoriteRepository={favoriteRepository} unfavoriteRepository={unfavoriteRepository} />
        )}
      </div>
  );
}

export default App;
