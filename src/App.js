import Canvas from './components/canvas/Canvas';
import Questions from './components/form/Questions';
import Wrap from './components/hoc/Wrap';

import './App.css';

function App() {
  return (
    <div className="App max-w-full gap-x-6 flex flex-col items-start justify-center ">
      <h1 className='text-lg text-left pl-12 pt-4 font-lighter border-b-2 border-b-purple-100 w-full pb-4 drop-shadow-sm bg-red-400 text-white'>Embroidered Data - Ioan O. Cernei v1.0 - 2022</h1>

        <Wrap></Wrap>

    </div>
  );
}

export default App;
