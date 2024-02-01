import { useState } from "react"
import { IRecipe } from "../models/recipe";
import RecipePreview from "./RecipePreview";

type Props = {
    setSearchStr:(name:string) => void
    bookmarks: IRecipe[]
}
export default function Header ({setSearchStr, bookmarks}:Props) : JSX.Element
{
    const [name, setName] = useState<string>('');

    function handleInputChange (e:React.ChangeEvent) : void
    {
        setName ((e.target as HTMLInputElement).value);
    }

    function handleFormSubmit (e:React.FormEvent) : void
    {
        e.preventDefault ();

        setSearchStr (name);
    }

    return <header className="header">
    <img src="src/img/logo.png" alt="Logo" className="header__logo" />
    <form className="search" onSubmit={handleFormSubmit}>
      <input
        name="name"
        value={name}
        onChange={handleInputChange}
        type="text"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href="src/img/icons.svg#icon-search"></use>
        </svg>
        <span>Search</span>
      </button>
    </form>

    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <button className="nav__btn nav__btn--add-recipe">
            <svg className="nav__icon">
              <use href="src/img/icons.svg#icon-edit"></use>
            </svg>
            <span>Add recipe</span>
          </button>
        </li>
        <li className="nav__item">
          <button className="nav__btn nav__btn--bookmarks">
            <svg className="nav__icon">
              <use href="src/img/icons.svg#icon-bookmark"></use>
            </svg>
            <span>Bookmarks</span>
          </button>
          <div className="bookmarks">
            <ul className="bookmarks__list">
              {bookmarks.length === 0 && <div className="message">
                <div>
                  <svg>
                    <use href="src/img/icons.svg#icon-smile"></use>
                  </svg>
                </div>
                <p>
                  No bookmarks yet. Find a nice recipe and bookmark it :)
                </p>
              </div> || bookmarks.map (bm => <RecipePreview key={bm.id} {...bm} />)}
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </header>
}