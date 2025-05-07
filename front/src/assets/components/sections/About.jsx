import { Container, Row, Col, Image } from "react-bootstrap";
import { FaMapMarkerAlt, FaGlobeAmericas, FaUsers } from "react-icons/fa";

// Выносим данные в константы для лучшей поддержки и возможности динамической загрузки в будущем
const ABOUT_POINTS = [
  {
    id: 1,
    icon: <FaMapMarkerAlt size={24} />,
    title: "Широкая география",
    description: "10 производственных площадок",
  },
  {
    id: 2,
    icon: <FaGlobeAmericas size={24} />,
    title: "Международное признание",
    description: "13 стран присутствия",
  },
  {
    id: 3,
    icon: <FaUsers size={24} />,
    title: "Команда профессионалов",
    description: "Более 9 тысяч сотрудников",
  },
];

export default function About() {
  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col lg={6} md={12} className="mb-4 mb-lg-0">
          <Image
            src="/photo/Card_map.png"
            fluid
            className="about-map-img"
            alt="Карта присутствия Аскона"
            loading="lazy" // Улучшаем производительность загрузки страницы
          />
        </Col>
        <Col lg={6} md={12}>
          <div className="about-content">
            <h2 className="mb-4 text-center title">О нас</h2>
            <p className="about-text mb-4">
              Аскона – крупнейший международный производитель <br /> и ритейлер товаров для дома и здорового сна в России.
            </p>

            <div className="about-points">
              {ABOUT_POINTS.map((point, index) => (
                <div 
                  key={point.id}
                  className={`about-point ${index < ABOUT_POINTS.length - 1 ? 'mb-3' : ''}`}
                >
                  <div className="about-point-icon">
                    {point.icon}
                  </div>
                  <div className="about-point-content">
                    <h5>{point.title}</h5>
                    <p>{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
