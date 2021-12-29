import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import HomePage from "./view/user/index";
import Admin from "./view/admin";

const hist = createBrowserHistory();
function App() {
  return (
    <div className="App">
      <Router history={hist}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
