import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="flex flex-col justify-between flex-wrap min-h-screen">
        <Header />
      <Footer />
    </div>
  );
}

export default App;
