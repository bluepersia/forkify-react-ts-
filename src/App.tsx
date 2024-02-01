
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import Header from './components/Header';
import Search from './components/Search';

const queryClient = new QueryClient ();

function App() {

  const [searchStr, setSearchStr] = useState<string>('');

  return (
    <QueryClientProvider client={queryClient}>
      <div className='container'>
        <Header setSearchStr={setSearchStr}/>
        <Search searchStr={searchStr}/>
      </div>
    </QueryClientProvider>
  )
}

export default App
