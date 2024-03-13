import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./view/user";
import Admin from "./view/admin";

const hist = createBrowserHistory();
function App() {
  // useEffect(() => {
  //   navigate("/");
  // }, []);
  return (
    <div className="App">
      <Router history={hist}>
        {/* <AppHeader />
        <PageContent/>
        <AppFooter/> */}
        <Routes>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<UserPage />} />
          {/* i want to redirect when endpoint error?  */}
        </Routes>
        {/* <UserPage /> */}
      </Router>
    </div>
  );
}

export default App;
