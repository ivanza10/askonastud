import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { IMaskInput } from "react-imask";
import axios from "axios";
import "../../styles/School.sass";

export default function School() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    selectedArea: "",
    isInternationalPhone: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Области интересов с соответствующими формами и цветами
  const areas = [
    { 
      id: "it", 
      name: "IT", 
      description: "Разработка, тестирование и поддержка ПО",
      shape: "hexagon",
      color: "#00BABF"
    },
    { 
      id: "marketing", 
      name: "Маркетинг", 
      description: "Реклама, PR, работа с брендом",
      shape: "circle",
      color: "#FFCC33"
    },
    { 
      id: "design", 
      name: "Дизайн", 
      description: "UX/UI, графический дизайн",
      shape: "triangle",
      color: "#FF6B6B"
    },
    { 
      id: "production", 
      name: "Производство", 
      description: "Технологические процессы, контроль качества",
      shape: "diamond",
      color: "#4ECDC4"
    },
    { 
      id: "management", 
      name: "Управление", 
      description: "Администрирование, организация рабочих процессов",
      shape: "square",
      color: "#F8A23E"
    }
  ];

  // Обработчик изменения формы
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Сбрасываем ошибки при вводе
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Обработчик изменения телефона через маску
  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
    
    // Сбрасываем ошибку при вводе
    if (errors.phone) {
      setErrors({
        ...errors,
        phone: null,
      });
    }
  };

  // Выбор области интересов
  const selectArea = (areaId) => {
    setFormData({
      ...formData,
      selectedArea: areaId,
    });
    
    // Сбрасываем ошибку при выборе
    if (errors.selectedArea) {
      setErrors({
        ...errors,
        selectedArea: null,
      });
    }
  };

  // Валидация формы
  const validateForm = () => {
    const newErrors = {};
    
    // Проверка имени
    if (!formData.name.trim()) {
      newErrors.name = "Пожалуйста, введите ваше имя";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать не менее 2 символов";
    }
    
    // Проверка телефона
    if (formData.isInternationalPhone) {
      if (!formData.phone.trim()) {
        newErrors.phone = "Пожалуйста, введите номер телефона";
      }
    } else {
      if (!formData.phone || formData.phone.replace(/\D/g, "").length !== 11) {
        newErrors.phone = "Введите корректный номер телефона";
      }
    }
    
    // Проверка выбора области
    if (!formData.selectedArea) {
      newErrors.selectedArea = "Пожалуйста, выберите сферу интересов";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post('/send-school-email', formData);
        setSubmitted(true);
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        setErrors({
          submit: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

    return (
    <div className="school-section">
      <Container>
        <h2 className="text-center mb-5 school-title">
          Программы для школьников
        </h2>
        
        <p className="text-center school-subtitle mb-5">
          Выберите интересующую вас сферу и оставьте контактные данные. 
          Мы расскажем о возможностях стажировки и образовательных программах для школьников.
        </p>
        
        <Row className="align-items-center">
          {/* Левая колонка с фигурами */}
          <Col lg={6} className="mb-5 mb-lg-0">
            <h3 className="area-selection-title mb-4">ТЫ СМОЖЕШЬ РАЗВИВАТЬСЯ В:</h3>
            <div className="areas-container">
              {areas.map((area) => (
                <div
                  key={area.id}
                  className={`area-item ${area.shape} ${formData.selectedArea === area.id ? 'selected' : ''}`}
                  style={{ 
                    backgroundColor: formData.selectedArea === area.id ? area.color : 'rgba(255,255,255,0.1)',
                    borderColor: area.color
                  }}
                  onClick={() => selectArea(area.id)}
                >
                  <span className="area-name">{area.name}</span>
                </div>
              ))}
            </div>
            {errors.selectedArea && (
              <div className="text-danger area-error mt-3">{errors.selectedArea}</div>
            )}
          </Col>
          
          {/* Правая колонка с формой */}
          <Col lg={6}>
            {!submitted ? (
              <Card className="school-form-card">
                <Card.Body>
                  <h3 className="form-title mb-4">Оставьте контактные данные</h3>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="schoolName">
                      <Form.Label>Ваше имя</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Введите ваше имя"
                        isInvalid={!!errors.name}
                        className="school-form-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="schoolPhone">
                      <Form.Label>Номер телефона</Form.Label>
                      {!formData.isInternationalPhone ? (
                        <IMaskInput
                          mask="+7 (000) 000-00-00"
                          value={formData.phone}
                          onAccept={handlePhoneChange}
                          placeholder="+7 (___) ___-__-__"
                          className={`form-control school-form-input ${errors.phone ? 'is-invalid' : ''}`}
                        />
                      ) : (
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Введите номер телефона"
                          isInvalid={!!errors.phone}
                          className="school-form-input"
                        />
                      )}
                      {errors.phone && (
                        <div className="invalid-feedback d-block">
                          {errors.phone}
                        </div>
                      )}
                    </Form.Group>
                    
                    <Form.Group className="mb-4" controlId="isInternationalPhone">
                      <Form.Check
                        type="checkbox"
                        label="У меня номер другой страны"
                        name="isInternationalPhone"
                        checked={formData.isInternationalPhone}
                        onChange={handleChange}
                        className="school-form-checkbox"
                      />
                    </Form.Group>
                    
                    {errors.submit && (
                      <div className="alert alert-danger mb-4">
                        {errors.submit}
                      </div>
                    )}
                    
                    <div className="text-center">
                      <Button 
                        type="submit" 
                        variant="primary"
                        className="school-form-button"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            ) : (
              <Card className="school-success-card">
                <Card.Body className="text-center">
                  <div className="success-icon mb-4">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <h3 className="mb-3">Спасибо за заявку!</h3>
                  <p>
                    Мы получили ваши данные и свяжемся с вами в ближайшее время,
                    чтобы рассказать о программах для школьников в выбранной вами сфере.
                  </p>
                  <Button 
                    variant="outline-primary"
                    className="mt-3"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        selectedArea: "",
                        isInternationalPhone: false,
                      });
                      setErrors({});
                    }}
                  >
                    Отправить новую заявку
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}