// import Canvas from './components/canvas/Canvas';
// import Questions from './components/form/Questions';
import { Route, Routes,BrowserRouter as Router } from 'react-router-dom';
import { SocketContext, socket } from './context/socket';
import Wrap from './components/hoc/Wrap';
import Symbol from './components/Symbol/Symbol';

import './App.css';

function App() {
  return (
    // <div className="App max-w-full gap-x-6 flex flex-col items-start justify-center ">
    //   <h1 className='text-lg text-left pl-12 pt-4 font-lighter border-b-2 border-b-purple-100 w-full pb-4 drop-shadow-sm bg-red-400 text-white'>Embroidered Data - Ioan O. Cernei v1.0 - 2022</h1>

    //     <Wrap></Wrap>

    // </div>
    <SocketContext.Provider value={socket}>
    <Router>
      <Routes>
        <Route path="/interface" element={<Wrap />}></Route>
        <Route path="/symbol" element={<Symbol/>}></Route>
        </Routes>
    </Router>
  </SocketContext.Provider>
  );
}

export default App;
