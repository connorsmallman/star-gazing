import React, { useEffect, useState, useReducer } from 'react';

import { RepositoryList } from './components/RepositoriesList';

const defaultRepositoryFilterOptions = [
  { label: "None", value: "none", comparison: "none" },
  { label: "Favorites", value: "favorites", comparison: "isFavorite" },
];

function App() {
  const [filterOptions, setFilterOptions] = useState(defaultRepositoryFilterOptions);
  const initialFilterKey = defaultRepositoryFilterOptions[0].value;
  const [filterKey, setFilterKey] = useState(initialFilterKey);

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
            {filterOptions.map(filterOption => (
              <option
                key={filterOption.label}
                label={filterOption.label}>
                {filterOption.value}
              </option>
              ))}
          </select>
          </div>
          <RepositoryList />
      </div>
  );
}

export default App;
