import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Timeline.css';

// Lista de meses com nome da pasta + nome exibido
const timelineMonths = [
  { folder: 'set24', label: 'Setembro 2024' },
  { folder: 'out24', label: 'Outubro 2024' },
  { folder: 'nov24', label: 'Novembro 2024' },
  { folder: 'dez24', label: 'Dezembro 2024' },
  { folder: 'jan25', label: 'Janeiro 2025' },
  { folder: 'fev25', label: 'Fevereiro 2025' },
  { folder: 'mar25', label: 'Março 2025' },
  { folder: 'abr25', label: 'Abril 2025' },
  { folder: 'mai25', label: 'Maio 2025' },
];

const Timeline = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [timelineData, setTimelineData] = useState([]);
  const [expandedPhoto, setExpandedPhoto] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const loadPhotos = () => {
      const loadedData = timelineMonths.map(({ folder, label }) => {
        const photos = [];
        for (let i = 1; i <= 20; i++) {
          const photoPath = `public/assets/images/${folder}/${i}.jpeg`;
          photos.push({
            src: photoPath,
            month: label,
            index: i
          });
        }
        return { month: label, photos };
      });
      setTimelineData(loadedData);
    };

    loadPhotos();
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying && showTimeline && timelineData.length > 0) {
      interval = setInterval(() => {
        setCurrentMonthIndex((prev) =>
          prev < timelineData.length - 1 ? prev + 1 : 0
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, showTimeline, timelineData]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    setIsPlaying(true);
    setShowTimeline(true);
  };

  const handlePhotoClick = (photo) => {
    setExpandedPhoto(photo);
  };

  const closeExpandedPhoto = () => {
    setExpandedPhoto(null);
  };

  return (
    <div className="timeline-page">
      <audio ref={audioRef} src="/public/music/musica.mp3" loop />

      <AnimatePresence>
        {!showTimeline && (
          <motion.div
            className="play-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              className="play-button"
              onClick={handlePlay}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="play-icon">
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
              </div>
              <span className="play-text">Nossa História</span>
            </motion.button>
            <p className="play-instruction">Toque para começar</p>
          </motion.div>
        )}
      </AnimatePresence>

      {showTimeline && timelineData.length > 0 && (
        <motion.div
          className="timeline-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {timelineData.map((monthData, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: index <= currentMonthIndex ? 1 : 0.3,
                y: index <= currentMonthIndex ? 0 : 50,
              }}
              transition={{ duration: 0.8 }}
              className={`month-section ${
                index === currentMonthIndex ? 'active' : ''
              }`}
            >
              <h2>{monthData.month}</h2>
              <div className="photos-grid">
                {monthData.photos.map((photo, photoIndex) => (
                  <motion.div
                    key={photoIndex}
                    whileHover={{ scale: 1.05 }}
                    className="photo-card"
                    onClick={() => handlePhotoClick(photo)}
                  >
                    <img
                      src={photo.src}
                      alt={`${monthData.month} - Foto ${photo.index}`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal para foto expandida */}
      <AnimatePresence>
        {expandedPhoto && (
          <motion.div
            className="expanded-photo-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeExpandedPhoto}
          >
            <motion.div
              className="expanded-photo-container"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="close-expanded-btn"
                onClick={closeExpandedPhoto}
                aria-label="Fechar foto"
              >
                &times;
              </button>
              <img
                src={expandedPhoto.src}
                alt={`${expandedPhoto.month} - Foto ${expandedPhoto.index}`}
                className="expanded-photo"
              />
              <div className="photo-info">
                <span>{expandedPhoto.month}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;