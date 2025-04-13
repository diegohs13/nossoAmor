import { Link } from 'react-router-dom';
import { FiCalendar, FiMessageSquare, FiClock } from 'react-icons/fi';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <h1 className="home-title">Para o Amor da Minha Vida</h1>
      <p className="home-subtitle">
        Cada momento ao seu lado se transforma em uma memória azul. 
        Este é nosso cantinho digital, Eu Te Amo Meu Amor.
      </p>

      <div className="menu-container">
        <Link to="/timeline" className="menu-button">
          <FiCalendar /> Nossa Linha do Tempo em Fotos
        </Link>
        
        <Link to="/secret" className="menu-button">
          <FiMessageSquare /> Mensagens Secretas
        </Link>
        
        <Link to="/counter" className="menu-button">
          <FiClock /> Nosso Tempo Juntos
        </Link>
      </div>
    </div>
  );
}