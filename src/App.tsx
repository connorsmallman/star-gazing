import React, { useEffect, useState, useReducer } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

interface RepositoryProps {
  name: string;
  description: string;
  stars: string;
  id: number;
  isFavorite: boolean;
  unfavoriteRepository: (id: number) => void;
  favoriteRepository: (id: number) => void;
}

type Repository = {
  name: string;
  description: string;
  stars: string;
  id: number;
}

enum ActionType {
  favorite = 'favorite',
  unfavorite = 'unfavorite'
}

type Action = {
  type: ActionType;
  id: number;
}

type State = {
  favorites: number[];
}

const RepositoryList = (props: { children: React.ReactNode }) => <div>{props.children}</div>

const RepositoryListItem: React.FC<RepositoryProps> = ({ name, description, stars, isFavorite, id, favoriteRepository, unfavoriteRepository }: RepositoryProps) =>
    <div className="p-2 border rounded-sm mb-4 h-min-24 hover:cursor-pointer">
        <div className="flex flex-col">
            <h2 className="font-bold mb-2">{name}</h2>
            <p className="mb-2">{description}</p>
            <div>
                <AiFillStar className="inline-block align-middle fill-gray-800 mr-1"/>
                <span className="inline-block align-middle">{stars}</span>
            </div>
            <div className="mt-4">
              {isFavorite ? (
                <button onClick={() => unfavoriteRepository(id)} className="p-2 rounded-md bg-gray-100">
                  <MdFavorite className="inline-block"/>
                  <span className="inline-block align-middle ml-1">Unfavorite</span>
                </button>
              ) : (
                <button onClick={() => favoriteRepository(id)} className="p-2 rounded-md bg-gray-100">
                  <MdOutlineFavoriteBorder className="inline-block"/>
                  <span className="inline-block align-middle ml-1">Favorite</span>
                </button>
              )}
            </div>
        </div>
    </div>;

function App() {
  const initialState: State = { favorites: [] };

  const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case 'favorite': {
        const updatedFavorites = [...state.favorites, action.id];
        // TODO update localstorage
        return {
          favorites: updatedFavorites
        };
      }
      case 'unfavorite': {
        // TODO update localstorage
        const updatedFavorites = state.favorites.filter((f: number) => f !== action.id);
        return {
          favorites: updatedFavorites,
        };
      }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  // TODO Move into hook
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      const sevenDaysAgo: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const response = await fetch(
        `https://api.github.com/search/repositories?q=created:>${sevenDaysAgo.toISOString()}&sort=stars&order=desc`,
      );
      const data = await response.json();
      return data.items.map((r: Record<string, unknown>) => ({ ...r, stars: r.stargazers_count }));
    };

    fetchRepositories().then(setRepositories).catch();
  }, []);

  return (
      <div className="max-w-md mx-auto text-slate-800">
      <h1 className="p-6 text-center">Star Gazing</h1>
    <RepositoryList>
        {repositories.map((repository: Repository) => {
          const isFavorite = state.favorites.includes(repository.id);
            return (
              // TODO add link to github
              <RepositoryListItem
                key={repository.id}
                id={repository.id}
                stars={repository.stars}
                description={repository.description}
                name={repository.name}
                isFavorite={isFavorite}
                favoriteRepository={(id: number) => dispatch({type: ActionType.favorite, id})}
                unfavoriteRepository={(id: number) => dispatch({type: ActionType.unfavorite, id})}
              />
            );
        })}
    </RepositoryList>
    </div>
  );
}

export default App;
