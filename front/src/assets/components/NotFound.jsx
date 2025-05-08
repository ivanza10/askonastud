
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // если используете react-router-dom

const NotFound = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">Страница не найдена</h2>
      <p className="mb-4 text-center">
        Извините, но страница, которую вы ищете, не существует или была удалена.
      </p>
      <Button as={Link} to="/" variant="primary">
        Вернуться на главную
      </Button>
    </Container>
  );
};

export default NotFound;
