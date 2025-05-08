import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../styles/Values.sass";

const ValuesBlock = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const values = [
    {
      id: 1,
      title: "Команда",
      subtitle: "По-настоящему значимые дела можно сделать только в команде",
      text: "Команда усиливает каждого из нас новыми знаниями, умениями и поддержкой. Действуя в команде, мы создаём друг для друга питающую среду — в ней мы не боимся бросать себе вызов, пробовать новое и развиваться.",
      image: "/photo/Frame 75.png",
      cardType: "yellow",
    },
    {
      id: 2,
      title: "Клиентоцентричность",
      subtitle:
        "Мы делаем то, что имеет значение. И главное, что имеет для нас значение — это человек.",
      text: "Создавая продукты и запуская внутренние проекты, мы думаем в первую очередь о том, для кого эти действия, какую ценность они создают и как можно сделать это ещё лучше",
      image: "/photo/Frame 74.png",
      cardType: "turquoise",
    },
    {
      id: 3,
      title: "Страсть к изменениям",
      subtitle: "Мы всегда ищем возможность стать лучше",
      text: "Мы всегда ищем возможность стать лучше и сделать свою работу лучше, мы предлагаем и внедряем изменения и с интересом пробуем новое",
      image: "/photo/Frame 72.png",
      cardType: "turquoise",
    },
    {
      id: 4,
      title: "Лидерство",
      subtitle: "Для нас это бескомпромиссное качество",
      text: "Это стремление сделать самый лучший продукт, самый лучший сервис, самые эффективные внутренние процессы и самую лучшую среду для значимых дел",
      image: "/photo/Frame 73.png",
      cardType: "yellow",
    },
  ];

  return (
    <div className="values-section">
      <Container>
        <h1 className="text-center mb-5 title values-title">Наши ценности</h1>
        <Row>
          {values.map((value) => (
            <Col md={6} key={value.id} className="mb-4">
              <Card
                onMouseEnter={() => setHoveredCard(value.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`values-card ${value.cardType}-value-card`}
              >
                <Card.Body className="values-card-body">
                  <Card.Title>
                    <h2 className="values-card-title">{value.title}</h2>
                  </Card.Title>
                  
                  <div className="values-card-content text-center">
                    {hoveredCard !== value.id ? (
                      <Card.Subtitle className="values-card-subtitle">
                        {value.subtitle}
                      </Card.Subtitle>
                    ) : (
                      <div className="values-card-text">
                        {value.text}
                      </div>
                    )}
                  </div>
                  
                  <div className={`values-card-image-container ${hoveredCard === value.id ? 'image-fade' : ''}`}>
                    <img
                      className="values-card-image"
                      src={value.image}
                      alt={value.title}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ValuesBlock;