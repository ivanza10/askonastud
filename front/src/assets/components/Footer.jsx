import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Footer.sass";

export default function Footer() {
  return (
    <footer className="footer-section">
      <Container>
        <div className="footer-container">
          <Row className="align-items-center">
            <Col xs={12} sm={4} className="footer-logo-col text-center text-sm-start mb-3 mb-sm-0">
              <Image
                className="footer-logo"
                src="/photo/askona_logo.png"
                alt="Логотип Аскона"
                fluid
              />
            </Col>
            
            <Col xs={12} sm={5} className="footer-text-col text-center text-sm-start mb-3 mb-sm-0">
              <p className="footer-text">
                Если у тебя остались вопросы, пиши нам{" "}
                <a className="footer-link" href="mailto:student@askona.ru">
                  student@askona.ru
                </a>
              </p>
            </Col>
            
            <Col xs={12} sm={3} className="footer-social-col text-center text-sm-end">
              <div className="footer-social">
                <a 
                  href="https://vk.com/askonateam" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-social-btn vk me-3"
                >
                  <Image
                    className="footer-social-icon"
                    src="/icons/VK_footer.svg"
                    alt="ВКонтакте"
                    fluid
                  />
                </a>
                <a
                  href="https://t.me/askonastudents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn tg"
                >
                  <Image
                    className="footer-social-icon"
                    src="/icons/TG_footer.svg"
                    alt="Telegram"
                    fluid
                  />
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
}
