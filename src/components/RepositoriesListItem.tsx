import React from "react";
import { AiFillStar } from "react-icons/ai";
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

export const RepositoryListItem: React.FC<RepositoryProps> = ({ name, description, stars, isFavorite, id, favoriteRepository, unfavoriteRepository }: RepositoryProps) =>
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