import { IRecipe } from "../models/recipe";

export default function RecipePreview ({title, publisher, image_url}: IRecipe) : JSX.Element
{
    return <li className="preview">
    <a className="preview__link preview__link--active" href="#23456">
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