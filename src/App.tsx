
import { createContext, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import Header from './components/Header';
import Search from './components/Search';
import MainRecipe from './components/MainRecipe';
import { IRecipe } from './models/recipe';

const queryClient = new QueryClient ();

type AppContextType = {
  activeId: string,
  setActiveId: (val:string) => void
}

const AppContext = createContext<AppContextType> ({
  activeId: '',
  setActiveId: () => {}
})

function App() {

  const [searchStr, setSearchStr] = useState<string>('');
  const [activeId, setActiveId] = useState<string>('');
  const [bookmarks, setBookmarks] = useState<IRecipe[]> (() =>
  {
      const json = localStorage.getItem ('bookmarks');

      if (json)
        return JSON.parse (json);
    
        return [];
  });

  useEffect (() => {
    localStorage.setItem ('bookmarks', JSON.stringify (bookmarks));
  }, [bookmarks])

  function bookmark (recipe:IRecipe) : void
  {
    setBookmarks (curr =>
      {
        if (curr.find (bm => bm.id === recipe.id))
          return curr.filter (bm => bm.id != recipe.id);
        else
          return [...curr, recipe];
      });
  }

  return (
    <AppContext.Provider value={{activeId, setActiveId}}>
    <QueryClientProvider client={queryClient}>
      <div className='container'>
        <Header setSearchStr={setSearchStr} bookmarks={bookmarks}/>
        <Search searchStr={searchStr}/>
        <MainRecipe activeId={activeId} bookmark={bookmark}/>
      </div>
    </QueryClientProvider>
    </AppContext.Provider>
  )
}

export default App

export { AppContext}
