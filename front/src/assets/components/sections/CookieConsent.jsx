import { useState, useEffect } from "react";
import { Toast, Button } from "react-bootstrap";
import "../../styles/CookieConsent.sass";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleConsent = (consent) => {
    localStorage.setItem("cookieConsent", consent);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-container">
      <Toast className="cookie-consent" onClose={() => setShow(false)}>
        <Toast.Body>
          <h6>Мы используем куки-файлы для улучшения работы сайта. Вы согласны?</h6>
          <div className="d-flex justify-content-end">
            <Button variant="primary" size="sm" onClick={() => handleConsent("accepted")}>
              Согласен
            </Button>
            <Button variant="light" size="sm" className="ms-2" onClick={() => handleConsent("declined")}>
              Не согласен
            </Button>
          </div>
        </Toast.Body>
      </Toast>
    </div>
  );
}
