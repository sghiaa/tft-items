import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import WhatsMissing from './components/WhatsMissing/WhatsMissing';
import WhatCanYouBuild from './components/WhatCanYouBuild/WhatCanYouBuild';

const router = createBrowserRouter([
  {
    path: "/tft-items",
    element: <WhatsMissing />
  },
  {
    path: "/whats-missing",
    element: <WhatsMissing />
  },
  {
    path: "/what-can-you-build",
    element: <WhatCanYouBuild />
  },
]);


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
        <RouterProvider router={router} />
      <footer>
      </footer>
    </div>
  );
}

export default App;
