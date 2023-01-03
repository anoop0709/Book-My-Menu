import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Pages/Home/Home"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path = "/" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
