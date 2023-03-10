import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './components/Header/Header';
import WhatsMissing from './components/WhatsMissing/WhatsMissing';
import WhatCanYouBuild from './components/WhatCanYouBuild/WhatCanYouBuild';
import ItemCombos from './components/ItemCombos/ItemCombos';
import TeamComps from './components/TeamComps/TeamComps';

const router = createBrowserRouter([
  {
    path: "/tft-items",
    element: <WhatsMissing />
  },
  {
    path: "/tft-items/whats-missing",
    element: <WhatsMissing />
  },
  {
    path: "/tft-items/what-can-you-build",
    element: <WhatCanYouBuild />
  },
  {
    path: "/tft-items/item-combos",
    element: <ItemCombos />
  },
  {
    path: "/tft-items/team-comps",
    element: <TeamComps />
  },
]);


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
        <RouterProvider router={router} />
      <footer>
      </footer>
    </div>
  );
}

export default App;
