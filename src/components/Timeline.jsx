import { Link } from "react-router-dom";

export default function Timeline() {
  const moments = [
    { date: "01/01/2023", text: "Nosso primeiro encontro ❤️", image: "url-da-imagem-1.jpg" },
    { date: "14/02/2023", text: "Primeiro Dia dos Namorados juntos", image: "url-da-imagem-2.jpg" },
  ];

  return (
    <div className="timeline">
      <Link to="/">
        <button>Voltar</button>
      </Link>
      <h2>Nossa História</h2>
      
      {moments.map((moment, index) => (
        <div key={index} className="moment">
          <img src={moment.image} alt="Momento especial" />
          <p>{moment.date}</p>
          <p>{moment.text}</p>
        </div>
      ))}
    </div>
  );
}