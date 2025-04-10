// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Timeline from "./components/Timeline";
import SecretMessage from "./components/SecretMessage";
import Counter from "./components/Counter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/secret" element={<SecretMessage />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </Router>
  );
}

// Esta linha abaixo é ESSENCIAL - deve ser a última do arquivo
export default App; // 👈 Isso estava faltando?