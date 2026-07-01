import { BrowserRouter as Router, Routes, Route } from "react-router";
import Header from "./components/Header";
import Watchlist from "./pages/Watchlist";
import Watched from "./pages/Watched";
import Add from "./pages/Add";
import { GlobalProvider } from "./context/GlobalState";
import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <main className="container-page">
          <Routes>
            <Route path="/" element={<Watchlist />} />
            <Route path="/watched" element={<Watched />} />
            <Route path="/add" element={<Add />} />
          </Routes>
        </main>
      </Router>
    </GlobalProvider>
  );
}

export default App;
