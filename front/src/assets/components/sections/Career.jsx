import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import careerImage from "/photo/People_Career.png";
import "../../styles/Career.sass";

export default function Career() {
  const handleTourClick = () => {
    // Здесь можно добавить логику для открытия модального окна
    // или перехода на страницу с виртуальным туром
    window.open("https://forms.yandex.ru/u/679b5d3c5056903d046896ec/", "_blank");
  };

  return (
    <div className="career-section pt-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} className="text-center">
            <h1 className="title">
              Построй карьеру  с Askona
            </h1>
          </Col>
        </Row>
        <Row className="career-section_row">
          <Col md={5} className="d-flex flex-column justify-content-end career-section_row__col_img d-none d-lg-flex">
            <Image
              src={careerImage}
              alt="Career"
              className="career-image"
              fluid
              loading="lazy"
            />
          </Col>
          <Col md={7} className="career-section_row__content pt-5">
            <div className="d-flex justify-content-center mb-4">
              <Button className="career-tour-btn" onClick={handleTourClick}>
                <span className="career-tour-btn-text">Хочу попасть на практику/стажировку</span>
                <span className="career-tour-btn-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 0.5C4.3 0.5 0.5 4.3 0.5 9C0.5 13.7 4.3 17.5 9 17.5C13.7 17.5 17.5 13.7 17.5 9C17.5 4.3 13.7 0.5 9 0.5ZM9 15.5C5.4 15.5 2.5 12.6 2.5 9C2.5 5.4 5.4 2.5 9 2.5C12.6 2.5 15.5 5.4 15.5 9C15.5 12.6 12.6 15.5 9 15.5Z" fill="currentColor" />
                    <path d="M7 12.8L11.3 9L7 5.2L7.7 4.5L12.7 9L7.7 13.5L7 12.8Z" fill="currentColor" />
                  </svg>
                </span>
              </Button>
            </div>
            <Row className="mx-0">
              <Col sm={6} className="mb-3 px-2">
                <Card className="career-card yellow h-100">
                  <Card.Body>
                    <Card.Title>
                      <h5 className="text_medium career-card_text">
                        Совмещай практику/стажировку с учёбой
                      </h5>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} className="mb-3 px-2">
                <Card className="career-card blue h-100">
                  <Card.Body>
                    <Card.Title>
                      <h5 className="text_medium career-card_text">
                        Есть возможность попасть в штат
                      </h5>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} className="mb-3 px-2">
                <Card className="career-card blue h-100">
                  <Card.Body>
                    <Card.Title>
                      <h5 className="text_medium career-card_text">
                        Учись под руководством экспертов
                      </h5>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} className="mb-3 px-2">
                <Card className="career-card yellow h-100">
                  <Card.Body>
                    <Card.Title>
                      <h5 className="text_medium career-card_text">
                        Принимай участие в масштабных проектах
                      </h5>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
