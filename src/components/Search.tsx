import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { IRecipe } from "../models/recipe";
import { apiKey, baseURL } from '../utility';
import Spinner from "./Spinner";
import ErrorDisplay from "./ErrorDisplay";
import RecipePreview from "./RecipePreview";

export default function Search ({searchStr}:{searchStr:string}) : JSX.Element
{
    const {data:recipes, isLoading, error, refetch} = useQuery ({queryKey:['search'], queryFn: search});
    const [page, setPage] = useState<number>(1);

    function totalPages () : number 
    {
      if (recipes)
        return Math.ceil (recipes.length / 10);

      return 1;
    }

    function getCurrentPage () : IRecipe[]
    {
      if (recipes)
      {
        const endIndex = page * 10;
        const startIndex = endIndex - 10;

        return recipes.slice (startIndex, endIndex);
      }

      return [];
      
    }

    async function search () : Promise<IRecipe[]>
    {
        if(!searchStr)
          return [];
        
        const res = await fetch (`${baseURL}?search=${searchStr}&key=${apiKey}`);

        if (!res.ok)
          throw new Error ((await res.json()).message);

        return (await res.json()).data.recipes;
    }

    useEffect (() =>
    {
      refetch ();
    }, [searchStr])

    const currentPage = getCurrentPage ();

    return <div className="search-results">
    <ul className="results">
      {isLoading && <Spinner/>}
      {error && <ErrorDisplay err={error}/>}
      {currentPage && currentPage.map (recipe => <RecipePreview key={recipe.id} {...recipe}/>)}
    </ul>

    <div className="pagination">
       {page > 1 && <button onClick={() => setPage (curr => curr - 1)} className="btn--inline pagination__btn--prev">
        <svg className="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page {page - 1}</span>
      </button>}
      {page < totalPages () && <button onClick={()=> setPage (curr => curr + 1)} className="btn--inline pagination__btn--next">
        <span>Page {page + 1}</span>
        <svg className="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>}
    </div>

    <p className="copyright">
      &copy; Copyright by
      <a
        className="twitter-link"
        target="_blank"
        href="https://twitter.com/jonasschmedtman"
        >Jonas Schmedtmann</a
      >. Use for learning or your portfolio. Don't use to teach. Don't claim
      as your own.
    </p>
  </div>
}