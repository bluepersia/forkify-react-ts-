
import { createContext, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import Header from './components/Header';
import Search from './components/Search';

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

  return (
    <AppContext.Provider value={{activeId, setActiveId}}>
    <QueryClientProvider client={queryClient}>
      <div className='container'>
        <Header setSearchStr={setSearchStr}/>
        <Search searchStr={searchStr}/>
      </div>
    </QueryClientProvider>
    </AppContext.Provider>
  )
}

export default App

export { AppContext}
