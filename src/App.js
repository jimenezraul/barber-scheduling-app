import React from "react";
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import history from "./history";

function App() {
  return (
    <div className="flex flex-col justify-between flex-wrap min-h-screen">
      <Header />
      <Router history={history}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
