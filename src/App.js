import Canvas from './components/canvas/Canvas';
import Questions from './components/form/Questions';
import Wrap from './components/hoc/Wrap';

import './App.css';

function App() {
  return (
    <div className="App  gap-x-6 flex flex-col items-start justify-center ">
      <h1 className='text-4xl pl-12 mt-12 font-bold'>Embroidered Data - Ioan O. Cernei v1.0 - 2022</h1>

        <Wrap></Wrap>

    </div>
  );
}

export default App;
