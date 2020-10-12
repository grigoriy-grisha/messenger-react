import React from "react";
import search from "../../../static/SearchPerson/search.svg";

interface IFunctionProps {
    onChangeSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    onSubmitFindUsers: (e: React.KeyboardEvent) => void
}

type TPropsComponent = IFunctionProps;

export const SearchPerson: React.FC<TPropsComponent> = ({ onChangeSearchInput, value, onSubmitFindUsers }) => {
  
  return (
    <div className="chat__input chat__search-person">
      <input
        className="chat__input"
        type="text"
        id="search"
        value={value}
        name="search"
        placeholder="Search in all persons..."
        onChange={onChangeSearchInput}
        onKeyUp={onSubmitFindUsers}
      />
      <label className="chat__label" htmlFor="search">
        <img src={search} alt="search" />
      </label>
    </div>
  );
};
