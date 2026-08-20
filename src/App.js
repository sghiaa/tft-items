import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Header from './components/Header/Header';
import WhatsMissing from './components/WhatsMissing/WhatsMissing';
import WhatCanYouBuild from './components/WhatCanYouBuild/WhatCanYouBuild';
import ItemCombos from './components/ItemCombos/ItemCombos';
import TeamComps from './components/TeamComps/TeamComps';
import ChampionConnections from './components/ChampionConnections/ChampionConnections';

function AppLayout() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main className="appShell">
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/tft-items" replace />
      },
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
      {
        path: "/tft-items/champion-connections",
        element: <ChampionConnections />
      },
    ]
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
