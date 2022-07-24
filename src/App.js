// React
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import PokemonsList from "./components/PokemonsList";
import PokeDetail from "./components/PokeDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonsList />} />
        <Route path="/:name" element={<PokeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
