import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Alert, Spinner } from "react-bootstrap";
import "../../styles/Accordion.sass";

// eslint-disable-next-line react/prop-types
export default function VacancyList({ city, query }) {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cityQuery = city ? `&area=${city}` : "";
    const queryUrl = `https://api.hh.ru/vacancies?text=${encodeURIComponent(query)}&employer_id=544224${cityQuery}`;
    setLoading(true);
    setError(null);

    axios
      .get(queryUrl)
      .then((response) => {
        setVacancies(response.data.items);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
        setError("Произошла ошибка при загрузке вакансий. Пожалуйста, попробуйте позже.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city, query]);

  const getSalaryText = (salary) => {
    if (!salary) return "Не указана";

    const from = salary.from;
    const to = salary.to;

    if (from && !to) {
      return `от ${from} ${salary.currency || 'руб.'}`;
    } else if (!from && to) {
      return `до ${to} ${salary.currency || 'руб.'}`;
    } else if (from && to) {
      return `${from} - ${to} ${salary.currency || 'руб.'}`;
    }

    return "Не указана";
  };

  if (loading) {
    return (
      <div className="loading-message">
        <Spinner animation="border" variant="info" className="me-2" />
        Загрузка вакансий...
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );
  }

  if (vacancies.length === 0) {
    return (
      <Alert variant="warning" className="mt-3">
        Вакансий не найдено. Попробуйте выбрать другой город или направление.
      </Alert>
    );
  }

  return (
    <Row className="d-flex flex-column">
      {vacancies.map((vacancy) => (
        <Card key={vacancy.id} className="mb-3 w-100 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <Card.Title>
                <a
                  href={vacancy.alternate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="section_ref_accord_title"
                >
                  {vacancy.name} 
                </a>
              </Card.Title>
              {vacancy.employer?.logo_urls?.original && (
                <img
                  src={vacancy.employer.logo_urls.original}
                  alt={vacancy.employer.name}
                  className="section_ref_accord_img"
                />
              )}
            </div>
            <Card.Text>
              <strong>Зарплата:</strong> {getSalaryText(vacancy.salary)}
            </Card.Text>
            <Card.Text>
              <strong>Город:</strong> {vacancy.area?.name || "Не указан"}
            </Card.Text>
            <Card.Text>
              <strong>Требуемый опыт:</strong> {vacancy.experience?.name || "Не указан"}
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Button
                variant="primary"
                href={vacancy.apply_alternate_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Откликнуться
              </Button>
              <small className="text-muted">
                Опубликовано: {new Date(vacancy.published_at).toLocaleDateString()}
              </small>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Row>
  );
}
