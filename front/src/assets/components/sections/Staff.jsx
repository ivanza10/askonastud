import { Card, Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "../../styles/Staff.sass";

export default function Staff() {
  const employees = [
    {
      id: 1,
      name: "Соловьева Анастасия",
      position: "Швея",
      quote:
        "«Мне важно, чтобы компания заботилась о своих сотрудниках. В Асконе я получаю хорошую медицинскую страховку, могу сходить на массаж или в бассейн после работы.»",
      photo:
        "https://avatars.mds.yandex.net/i?id=7d35706a905856cabe0d39683517c0a1_l-5210344-images-thumbs&n=13",
      cardType: "turquoise"
    },
    {
      id: 2,
      name: "Бекетова Диана",
      position: "Швея",
      quote:
        "«Быть руководителем в Асконе — это отличный кейс для управленца. Лидерство компании напрямую зависит от команды, которая своей действительностью его удерживает. Мне нравится темп развития компании, динамика и амбиции.»",
      photo:
        "https://avatars.mds.yandex.net/i?id=7d35706a905856cabe0d39683517c0a1_l-5210344-images-thumbs&n=13",
      cardType: "yellow"
    },
    {
      id: 3,
      name: "Киреева Дарья",
      position: "Менеджер",
      quote:
        "«В Асконе я постоянно развиваюсь и профессионально расту. Приходя на стартовую позицию, я получил поддержку от компании и уникальные знания не только о продукте, но и в целом о системе продаж.»",
      photo:
        "https://avatars.mds.yandex.net/i?id=7d35706a905856cabe0d39683517c0a1_l-5210344-images-thumbs&n=13",
      cardType: "turquoise"
    },
    {
      id: 4,
      name: "Осипов Дмитрий",
      position: "Водитель погрузчика, Распределительный центр г. Владимир",
      quote:
        "«Мне нравится, когда компания организовывает интересный досуг. В этом году мы получили подарок к 1 Сентября для нашей первоклашки. Это так здорово! А ещё у нас проходит много конкурсов и розыгрышей для сотрудников.»",
      photo:
        "https://avatars.mds.yandex.net/i?id=7d35706a905856cabe0d39683517c0a1_l-5210344-images-thumbs&n=13",
      cardType: "yellow"
    },
  ];

  return (
    <div className="staff-section">
      <Container>
        <h2 className="text-center mb-5 title">ВРЕМЯ ПОКАЗАТЬ СВОИ ТАЛАНТЫ</h2>
        <Row xs={1} md={2} className="g-4">
          {employees.map((employee) => (
            <Col key={employee.id}>
              <Card className={`employee-card ${employee.cardType}-card`}>
                <div className="card-content">
                  <div
                    className="card-front"
                    style={{
                      backgroundImage: `url(${employee.photo})`,
                    }}
                  >
                    <div className="card-overlay">
                      <span className="hover-hint">Наведите для просмотра</span>
                    </div>
                  </div>
                  <div className={`card-back ${employee.cardType}-back`}>
                    <h6 className="quote">
                      {employee.quote}
                    </h6>
                  </div>
                </div>
                <Card.Body className={`card-footer ${employee.cardType}-footer`}>
                  <Card.Title>
                    <h5 className="employee-name">{employee.name}</h5>
                  </Card.Title>
                  <Card.Subtitle className="employee-position">
                    {employee.position}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
