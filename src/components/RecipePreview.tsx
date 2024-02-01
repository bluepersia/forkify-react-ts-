import { useContext } from "react";
import { IRecipe } from "../models/recipe";
import { AppContext } from "../App";

export default function RecipePreview ({id, title, publisher, image_url}: IRecipe) : JSX.Element
{
    const {activeId, setActiveId} = useContext (AppContext);

    return <li className="preview" onClick={() => setActiveId (id)}>
    <a className={`preview__link ${activeId === id && 'preview__link--active'}`} href="#23456">
      <figure className="preview__fig">
        <img src={image_url} alt={title} />
      </figure>
      <div className="preview__data">
        <h4 className="preview__title">{title}</h4>
        <p className="preview__publisher">{publisher}</p>
        <div className="preview__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>
}