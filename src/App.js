import React from "react";
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/Login";

import history from "./history";

function App() {
  return (
    <div className="flex flex-col justify-between flex-wrap min-h-screen">
      <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<Login history={history} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
