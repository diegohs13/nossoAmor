import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiHeart } from 'react-icons/fi';
import './Counter.css';

export default function Counter() {
  // Datas importantes (ajuste para as suas!)
  const meetDate = new Date("2024-04-28T00:00:00");
  const datingDate = new Date("2025-02-03T00:00:00");

  const [timeSinceMeet, setTimeSinceMeet] = useState({ 
    days: 0, hours: 0, minutes: 0, seconds: 0 
  });
  
  const [timeSinceDating, setTimeSinceDating] = useState({ 
    days: 0, hours: 0, minutes: 0, seconds: 0 
  });

  // Formata número com 2 dígitos
  const formatNumber = (num) => num.toString().padStart(2, '0');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // Calcula tempo desde que se conheceram
      const meetDiff = now - meetDate;
      const meetDays = Math.floor(meetDiff / (1000 * 60 * 60 * 24));
      const meetHours = Math.floor((meetDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const meetMinutes = Math.floor((meetDiff % (1000 * 60 * 60)) / (1000 * 60));
      const meetSeconds = Math.floor((meetDiff % (1000 * 60)) / 1000);

      // Calcula tempo de namoro
      let datingDays = 0, datingHours = 0, datingMinutes = 0, datingSeconds = 0;
      if (now >= datingDate) {
        const datingDiff = now - datingDate;
        datingDays = Math.floor(datingDiff / (1000 * 60 * 60 * 24));
        datingHours = Math.floor((datingDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        datingMinutes = Math.floor((datingDiff % (1000 * 60 * 60)) / (1000 * 60));
        datingSeconds = Math.floor((datingDiff % (1000 * 60)) / 1000);
      }

      setTimeSinceMeet({ 
        days: meetDays, 
        hours: meetHours, 
        minutes: meetMinutes, 
        seconds: meetSeconds 
      });
      
      setTimeSinceDating({ 
        days: datingDays, 
        hours: datingHours, 
        minutes: datingMinutes, 
        seconds: datingSeconds 
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="counter">
      <Link to="/" className="back-button">
        <FiArrowLeft /> VOLTAR
      </Link>

      <h1 className="title">Nosso Tempo</h1>
      <p className="subtitle">Cada instante ao seu lado é único</p>

      {/* Card: Tempo desde que se conheceram */}
      <div className="time-card">
        <h3><FiClock /> Tempo que nos conhecemos</h3>
        <div className="time-container">
          <div className="time-unit-container">
            <span className="time-unit">{formatNumber(timeSinceMeet.days)}</span>
            <span className="time-label">Dias</span>
          </div>
          <div className="time-unit-container">
            <span className="time-unit">{formatNumber(timeSinceMeet.hours)}</span>
            <span className="time-label">Horas</span>
          </div>
          <div className="time-unit-container">
            <span className="time-unit">{formatNumber(timeSinceMeet.minutes)}</span>
            <span className="time-label">Minutos</span>
          </div>
          <div className="time-unit-container">
            <span className="time-unit">{formatNumber(timeSinceMeet.seconds)}</span>
            <span className="time-label">Segundos</span>
          </div>
        </div>
      </div>

      {/* Card: Tempo de namoro */}
      {timeSinceDating.days > 0 ? (
        <div className="time-card">
          <h3><FiHeart /> Tempo de Namoro</h3>
          <div className="time-container">
            <div className="time-unit-container">
              <span className="time-unit">{formatNumber(timeSinceDating.days)}</span>
              <span className="time-label">Dias</span>
            </div>
            <div className="time-unit-container">
              <span className="time-unit">{formatNumber(timeSinceDating.hours)}</span>
              <span className="time-label">Horas</span>
            </div>
            <div className="time-unit-container">
              <span className="time-unit">{formatNumber(timeSinceDating.minutes)}</span>
              <span className="time-label">Minutos</span>
            </div>
            <div className="time-unit-container">
              <span className="time-unit">{formatNumber(timeSinceDating.seconds)}</span>
              <span className="time-label">Segundos</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="time-card">
          <h3><FiHeart /> Nosso Namoro</h3>
          <p style={{ 
            fontSize: '1.3rem',
            color: '#d4af37',
            marginTop: '1.5rem',
            lineHeight: '1.6'
          }}>
            Começamos a namorar em<br />
            <span style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              fontSize: '1.6rem',
              fontWeight: '600',
              color: '#e6f1ff'
            }}>
              {datingDate.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}