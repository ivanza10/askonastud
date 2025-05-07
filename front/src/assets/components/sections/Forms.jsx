import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { IMaskInput } from "react-imask";
import "../../styles/Forms.sass";

export default function Forms() {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    direction: "",
    consentData: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Обновление данных формы
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Обновление телефона через react-imask
  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
  };

  // Проверка валидности кириллицы
  const isCyrillic = (text) => /^[А-Яа-яЁё\s]+$/.test(text);

  // Валидация формы
  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.lastName ||
      !isCyrillic(formData.lastName) ||
      formData.lastName.length > 50
    ) {
      newErrors.lastName = "Введите фамилию кириллицей.";
    }
    if (
      !formData.firstName ||
      !isCyrillic(formData.firstName) ||
      formData.firstName.length > 50
    ) {
      newErrors.firstName = "Введите имя кириллицей.";
    }
    if (!formData.phone || formData.phone.replace(/\D/g, "").length !== 11) {
      newErrors.phone = "Введите корректный номер телефона.";
    }
    if (
      !formData.email ||
      !/\S+@\S+\.\S+/.test(formData.email) ||
      formData.email.length > 100
    ) {
      newErrors.email = "Введите корректный email.";
    }
    if (!formData.direction) {
      newErrors.direction = "Выберите направление.";
    }
    if (!formData.consentData) {
      newErrors.consentData = "Вы должны согласиться на обработку данных.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем, отправляется ли форма в данный момент
    if (isSubmitting) return;

    // Устанавливаем флаг отправки
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        await axios.post("/.netlify/functions/send-email", formData);
        setSuccess(true);
        setFormData({
          lastName: "",
          firstName: "",
          phone: "",
          email: "",
          direction: "",
          consentData: false,
        });
        setErrors({});
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
      } finally {
        // Сбрасываем флаг после завершения операции
        setIsSubmitting(false);
      }
    } else {
      // Если валидация не пройдена, сбрасываем флаг
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forms-block">
      <Container className="forms-container">
        <h1 className="text-center mb-5 forms-title title">
          Подай заявку прямо <br /> сейчас!
        </h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 d-flex justify-content-center align-items-center">
            <Col md={4}>
              <Form.Group controlId="lastName">
                <Form.Label className="ps-2 form-label">Фамилия</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Фамилия"
                  name="lastName"
                  maxLength="50"
                  value={formData.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                  className="section_form_input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="firstName">
                <Form.Label className="ps-2 form-label">Имя</Form.Label>
                <Form.Control
                  className="section_form_input"
                  type="text"
                  placeholder="Имя"
                  name="firstName"
                  maxLength="50"
                  value={formData.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-5 d-flex justify-content-center align-items-center">
            <Col md={4}>
              <Form.Group controlId="phone">
                <Form.Label className="ps-2 form-label">Номер телефона</Form.Label>
                <IMaskInput
                  mask="+7 (000) 000-00-00"
                  value={formData.phone}
                  onAccept={handlePhoneChange}
                  placeholder="+7 (999) 999-99-99"
                  className="form-control section_form_input"
                />
                {errors.phone && (
                  <div className="invalid-feedback d-block">{errors.phone}</div>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="email">
                <Form.Label className="ps-2 form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  maxLength="100"
                  className="section_form_input"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4 d-flex justify-content-center">
            <Col md={8} className="text-center">
              <div className="direction-buttons">
                <Button
                  variant={formData.direction === "internship" ? "primary" : "outline-primary"}
                  className={`direction-btn ${formData.direction === "internship" ? "active" : ""}`}
                  onClick={() => setFormData({...formData, direction: "internship"})}
                >
                  Стажировка
                </Button>
                <Button
                  variant={formData.direction === "practice" ? "primary" : "outline-primary"}
                  className={`direction-btn ${formData.direction === "practice" ? "active" : ""}`}
                  onClick={() => setFormData({...formData, direction: "practice"})}
                >
                  Практика
                </Button>
              </div>
              {errors.direction && (
                <div className="invalid-feedback d-block">{errors.direction}</div>
              )}
            </Col>
          </Row>
          <div className="form_check d-flex justify-content-center align-items-center mb-4">
            <Form.Group className="me-3" controlId="consentData">
              <Form.Check
                type="checkbox"
                name="consentData"
                checked={formData.consentData}
                onChange={handleChange}
                isInvalid={!!errors.consentData}
                feedback={errors.consentData}
                label={
                  <a
                    className="section_form_a"
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Согласие на обработку персональных данных <br /> и
                    конфиденциальность данных
                  </a>
                }
              />
            </Form.Group>
          </div>
          <div className="text-center">
            <Button
              className="section_form_btn"
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </Button>
          </div>
        </Form>
        {success && (
          <Alert variant="success" className="mt-3">
            Заявка успешно отправлена!
          </Alert>
        )}
      </Container>
    </div>
  );
}