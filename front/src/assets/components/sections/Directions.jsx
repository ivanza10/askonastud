import { useState } from "react";
import {
  Button,
  Container,
  Accordion,
  Form,
  Row,
  Col
} from "react-bootstrap";
import { cities, directions } from "../vacancies/constants";
import VacancyList from "../vacancies/VacancyList";
import "../../styles/Directions.sass";

export default function Directions() {
  const [selectedCity, setSelectedCity] = useState("");
  const [currentCity, setCurrentCity] = useState("");

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleApplyCity = () => {
    setCurrentCity(selectedCity);
  };

  return (
    <Container className="position-relative">
      <div className="section_ref_title mb-5">
        <h1 className="section_ref_title_text title ">
          ТВОИ ИНТЕРЕСЫ - <br />{" "}
          <span className="section_ref_title_text-span">ТВОЁ НАПРАВЛЕНИЕ</span>
        </h1>
      </div>
      
      <Row className="">
        <Col md={8} lg={6} xl={5}>
        {/* <h3 className="text-white mb-3 text-center">Наши вакансии</h3> */}
          <div className="directions-form-container">
            <h3 className="text-white mb-3 text-center title">Наши вакансии</h3>
            <Form className="d-flex flex-column">
              <Form.Group controlId="citySelect" className="mb-3">
                <Form.Label>
                  <h5 className="text-white mb-3">Выберите город</h5>
                </Form.Label>
                <div className="custom-dropdown">
                  <Form.Select
                    value={selectedCity}
                    onChange={handleCityChange}
                    className="custom-select mb-3"
                  >
                    <option value="">Все города</option>
                    {cities.map((city) => (
                      <option key={city.code} value={city.code}>
                        {city.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <Button className="section_ref_form_btn" onClick={handleApplyCity}>
                  Применить
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
      
      <div className="mb-5">
        <Accordion className="section_ref_accord">
          {directions.map((direction, index) => (
            <Accordion.Item
              className="section_ref_accord_border"
              eventKey={String(index)}
              key={direction.name}
            >
              <Accordion.Header className="section_ref_accord_header">
                <div className="d-flex flex-column">
                  <h3 className="mb-2">{direction.name}</h3>
                  {direction.subtext && (
                    <h6 className="section_ref_accord_header_text fw-bold mb-1">
                      {direction.subtext}
                    </h6>
                  )}
                  {direction.text && (
                    <h6 className="section_ref_accord_header_text">
                      {direction.text}
                    </h6>
                  )}
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <VacancyList city={currentCity} query={direction.query} />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </Container>
  );
}