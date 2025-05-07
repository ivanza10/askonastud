import { Carousel, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../styles/Offers.sass";

export default function Offers() {
  const [hovered, setHovered] = useState(Array(6).fill(false));
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 650) {
        setCardsPerSlide(1);
      } else if (window.innerWidth < 1200) {
        setCardsPerSlide(2);
      } else {
        setCardsPerSlide(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (index) => {
    setHovered((prev) => {
      const newHovered = [...prev];
      newHovered[index] = true;
      return newHovered;
    });
  };

  const handleMouseLeave = (index) => {
    setHovered((prev) => {
      const newHovered = [...prev];
      newHovered[index] = false;
      return newHovered;
    });
  };

  // Обработка нажатия для мобильных устройств
  const handleCardClick = (index) => {
    setHovered((prev) => {
      const newHovered = [...prev];
      newHovered[index] = !newHovered[index];
      return newHovered;
    });
  };

  const cards = [
    {
      id: 1,
      text: "Компенсация питания",
      backText: "Мы берем на себя оплату питания сотрудников во время работы",
      image: "/photo/section_offers_image1.png",
    },
    {
      id: 2,
      text: "ДМС",
      backText: "Нам важно, чтобы наши коллеги чувствовали себя хорошо, поэтому мы предоставляем Добровольное медицинское страхование в ПКМЦ для всех сотрудников",
      image: "/photo/section_offers_image2.png",
    },
    
    {
      id: 3,
      text: "Скидки и бонусные сертификаты",
      backText: "Мы хотим, чтобы наши сотрудники свободно пользовались нашей продукцией, поэтому предоставляем скидки и бонусные сертификаты для покупки",
      image: "/photo/section_offers_image4.png",
    },
    {
      id: 4,
      text: "Корпоративное такси",
      backText: "Если вы работаете в ночную смену или находитесь в командировке, то можете воспользоваться корпоративным транспортом",
      image: "/photo/section_offers_image3.png",
    },
    {
      id: 5,
      text: "Компенсация жилья",
      backText: "В случае релокации, мы компенсируем часть стоимости аренды жилья. А если вы взяли ипотеку, то мы поможем вам погасить проценты по ней",
      image: "/photo/section_offers_image5.png",
    },
  ];

  const slidesCount = Math.ceil(cards.length / cardsPerSlide);

  return (
    <Container>
      <h1 className="mb-5 text-center title">Мы предлагаем</h1>
      <Carousel
        indicators={false}
        controls={true}
        interval={null}
        className="offers-carousel"
      >
        {Array.from({ length: slidesCount }).map((_, slideIndex) => (
          <Carousel.Item key={slideIndex} className="section_offers_card">
            <div className="d-flex justify-content-center">
              {cards
                .slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide)
                .map((card, index) => {
                  const overallIndex = slideIndex * cardsPerSlide + index;
                  const bgColor =
                    overallIndex % 2 === 0
                      ? "rgb(0, 186, 191)"
                      : "rgb(252, 209, 81)";

                  // Определяем цвет текста и фон для улучшения читаемости
                  const textColor = bgColor === "rgb(252, 209, 81)" ? "#0a1525" : "white";
                  const cardBackStyle = {
                    backgroundColor: bgColor,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                  };

                  return (
                    <div
                      key={card.id}
                      className="mx-2 mb-4 offer-card-wrapper"
                      onMouseEnter={() => handleMouseEnter(overallIndex)}
                      onMouseLeave={() => handleMouseLeave(overallIndex)}
                      onClick={() => handleCardClick(overallIndex)}
                    >
                      <div
                        className={`flip-card ${hovered[overallIndex] ? "flipped" : ""}`}
                      >
                        <div
                          className="card-front"
                          style={{
                            backgroundImage: `url(${card.image})`,
                            backgroundColor: bgColor,
                          }}
                        >
                          <div className="card-overlay">
                            <h4 className="title card-front-title">{card.text}</h4>
                            <div className="card-hint">Нажмите, чтобы узнать подробнее</div>
                          </div>
                        </div>
                        <div
                          className="card-back"
                          style={cardBackStyle}
                        >
                          <h5 className="text_medium card-back-text" style={{ color: textColor }}>
                            {card.backText}
                          </h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
