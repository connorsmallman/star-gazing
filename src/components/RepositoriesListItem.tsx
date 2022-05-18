import React from "react";
import { AiFillStar } from "react-icons/ai";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

interface RepositoryListItemProps {
  name: string;
  description: string;
  stars: number;
  id: number;
  isFavorite: boolean;
  unfavoriteRepository: (id: number) => void;
  favoriteRepository: (id: number) => void;
  handleOnClick: () => void;
}

export const RepositoryListItem: React.FC<RepositoryListItemProps> = ({ name, description, stars, isFavorite, id, favoriteRepository, unfavoriteRepository, handleOnClick }: RepositoryListItemProps) =>
  <article onClick={handleOnClick} className="p-2 border rounded-sm mb-4 h-min-24 hover:cursor-pointer">
    <div className="flex flex-col">
      <h2 className="font-bold mb-2">{name}</h2>
      <p className="mb-2">{description}</p>
      <div>
        <AiFillStar className="inline-block align-middle fill-gray-800 mr-1"/>
        <span className="inline-block align-middle">{stars}</span>
      </div>
      <div className="mt-4">
        {isFavorite ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                unfavoriteRepository(id);
              }}
              className="p-2 rounded-md bg-gray-100"
            >
              <MdFavorite className="inline-block"/>
              <span className="inline-block align-middle ml-1">Unfavorite</span>
            </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              favoriteRepository(id)
            }}
            className="p-2 rounded-md bg-gray-100"
          >
            <MdOutlineFavoriteBorder className="inline-block"/>
            <span className="inline-block align-middle ml-1">Favorite</span>
          </button>
        )}
      </div>
    </div>
  </article>;