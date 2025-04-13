import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiLock, FiCheck, FiX } from 'react-icons/fi';
import './SecretMessage.css';

export default function SecretMessage() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openedDays, setOpenedDays] = useState([]);
  const [shakeDay, setShakeDay] = useState(null);
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Mensagens românticas
  const romanticMessages = {
    3: "Feliz dia 3 Meu Amooooor voce é tudo pra mim meu amor, hoje a gente faz 2 meses aaaaaaaaaaaaaaaaa tipo amor meu deus eu te amo super infinito ce sabe ne?",
    13: "Feliz dia 13 MOMO Hoje é um dia especial PQ NOIS VAI SE VER DENOVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO, e eu quero que você saiba o quanto você significa para mim. Voce pediu pra mim te pedie em namoro de novo, e eu quero que você saiba que...... QUER NAMORAR COMIGO MOMO? HEIN HEIN... Eu te amo muito, e sou muito feliz por ter você na minha vida. Você é TUDO pra mim. Te amo super infinito!",
    23: "FELIZ DIA 23 AMOOOR, HOJE NOIS VAI VIAJAR PRA SUA CASINHA NE SDJHFASGJHDFGJA ESPERO QUE ESTEJA DANDP TUDO CERTO. To escrevendo essa mensangem antes do dia 23 ne jshdfgjhsad mas oh, meu pai vacilao nao quer deixar eu viajar pq quer trabalhar esse besta, chamei pra trabalhar mo cota e ele fica ai... mas amor eu vou viajar sim ta, desde ja peço desculpas pq vou trablhar muito essa semana pra terminar o trabalho e a gente conseguir ir juntos... E EU VOU CONSEGUIR MOMO TE AMO MUITOOOOO"
  };

  const messageDays = [3, 13, 23];

  useEffect(() => {
    // Verifica se é o primeiro dia do mês
    const resetIfNewMonth = () => {
      const lastReset = localStorage.getItem('lastReset');
      const currentDateStr = `${currentMonth}-${currentYear}`;
      
      if (lastReset !== currentDateStr) {
        localStorage.removeItem('openedDays');
        localStorage.setItem('lastReset', currentDateStr);
        return [];
      }
      return JSON.parse(localStorage.getItem('openedDays')) || [];
    };

    setOpenedDays(resetIfNewMonth());
  }, [currentMonth, currentYear]);

  const handleSelectDay = (day) => {
    if (day > currentDay) {
      setShakeDay(day);
      setTimeout(() => setShakeDay(null), 1000);
      return;
    }
    setSelectedDay(day);
  };

  const handleOpenLetter = () => {
    setIsOpen(true);
    if (selectedDay && !openedDays.includes(selectedDay)) {
      const updatedOpenedDays = [...openedDays, selectedDay];
      setOpenedDays(updatedOpenedDays);
      localStorage.setItem('openedDays', JSON.stringify(updatedOpenedDays));
    }
  };

  const handleCloseLetter = () => {
    setIsOpen(false);
  };

  return (
    <div className="secret-container">
      <Link to="/" className="back-button">
        <FiArrowLeft /> VOLTAR
      </Link>

      <h1 className="secret-title">Meu Calendário do Amor</h1>
      <p className="secret-subtitle">Mensagens especiais em dias especiais</p>

      {/* Calendário */}
      <div className="calendar-grid">
        {messageDays.map((day) => (
          <div 
            key={day}
            className={`calendar-day 
              ${day === currentDay ? 'today' : ''} 
              ${openedDays.includes(day) ? 'opened' : ''}
              ${shakeDay === day ? 'shake' : ''}
              ${day > currentDay ? 'future' : ''}`}
            onClick={() => handleSelectDay(day)}
          >
            <span className={`day-number ${day > currentDay ? 'future-day' : ''}`}>
              {day}
            </span>
            {day > currentDay && <FiLock className="lock-icon" />}
            {openedDays.includes(day) && <FiCheck className="check-icon" />}
          </div>
        ))}
      </div>

      {/* Envelope Fechado */}
      {selectedDay && !isOpen && (
        <div className="envelope-wrapper">
          <div className="envelope-closed" onClick={handleOpenLetter}>
            <div className="envelope-front">
              <FiHeart className="heart-icon" />
              <div className="stamp">Dia {selectedDay}</div>
            </div>
            <p className="envelope-instruction">Clique para abrir</p>
          </div>
        </div>
      )}

      {/* Carta Aberta */}
      {isOpen && (
        <div className="letter-overlay">
          <div className="letter-reveal">
            <div className="letter-content">
              <button className="close-button" onClick={handleCloseLetter}>
                <FiX />
              </button>
              <p className="letter-text">
                {romanticMessages[selectedDay]?.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <p className="letter-signature">Com amor</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}