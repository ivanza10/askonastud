import "../../styles/Header.sass";
import { Container, Button, Image, Row, Col } from "react-bootstrap";

export default function BaseBlock() {
  return (
    <div className="base-block-wrapper">
      <Container fluid="xxl" className="px-md-4 px-3 pt-5">
        <div className="header base-header">
          <Row className="align-items-center gx-md-4 gx-2 w-100">
            
            <Col lg={12} md={12} sm={12} className="">
            <img src="/photo/header_pp.png" className="header_right_img_pp" alt="Команда Аскона" fluid />
            </Col>
            {/* <Col lg={6} md={6} sm={12} className="header_left-col order-md-1 order-1">
              <div className="header_left">
                <h1 className="header_left_gl">Стартуй с Askona</h1>
                <h3 className="header_left_text mb-4 pt-3">
                  Команда имеет значение!
                </h3>
                
                <Button
                  className="header_left_btn btn-askona"
                  variant="light"
                  href="/#action6"
                >
                  <h5 className="header_left_btn_text">Хочу работать в Асконе</h5>
                </Button> Крутая кнопка 
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} className="header_right-col order-md-2 order-2 p-0">
              <div className="header_right">
                <Image
                  className="header_right_img"
                  src="/photo/image_people.png"
                  alt="Команда Аскона"
                  fluid
                  loading="lazy"
                />
              </div>
            </Col> */}
          </Row>
        </div>
      </Container>
    </div>
  );
}
