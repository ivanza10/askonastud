import { useState, useEffect, useRef } from 'react';
import { Navbar, Container, Offcanvas, Nav, Form, Button, Image, NavDropdown } from 'react-bootstrap';
import "../styles/Header.sass";

export default function Header() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
  const dropdownRef = useRef(null);
  let lastScrollY = window.scrollY;

  // Функция для обработки клика по якорной ссылке
  const handleNavLinkClick = (e, target) => {
    handleCloseOffcanvas();
    
    // Если это выпадающее меню в мобильной версии, не закрываем dropdown
    if (e.target.classList.contains('dropdown-toggle') && isMobile) {
      e.preventDefault();
      return;
    }
    
    // Если была нажата ссылка внутри выпадающего меню, выполняем прокрутку
    if (target) {
      e.preventDefault();
      
      setTimeout(() => {
        const element = document.querySelector(target);
        if (element) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: targetPosition - navbarHeight,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  };

  // Функция для закрытия Offcanvas меню
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  // Функция для открытия Offcanvas меню
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  // Функция для переключения состояния выпадающего меню в мобильной версии
  const toggleDropdown = (e) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      setShowDropdown(!showDropdown);
    }
  };

  // Обработчик прокрутки
  const handleScroll = () => {
    if (window.scrollY < lastScrollY) {
      setShowHeader(true);
    } else {
      setShowHeader(true);
    }
    lastScrollY = window.scrollY;
  };

  // Отслеживаем изменение размера окна для определения мобильной версии
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1200);
    if (window.innerWidth > 1200) {
      setShowDropdown(false); // Сбрасываем состояние при переходе на десктоп
    }
  };

  // Хук для обработки клика вне выпадающего меню в мобильном режиме
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && 
          !dropdownRef.current.contains(event.target) && 
          isMobile && 
          showDropdown) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, showDropdown]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Инициализируем значение isMobile при загрузке
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Navbar
        fixed="top"
        variant="dark"
        expand="xl"
        className="navbar"
        style={{ transition: 'top 0.3s', top: showHeader ? '0' : '-200px' }}
      >
        <Container>
          <Navbar.Brand href="/">
            <Image className="img_logo" src="/photo/askona_logo.png" alt="Логотип Аскона" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} onClick={handleShowOffcanvas} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement="end"
            show={showOffcanvas}
            onHide={handleCloseOffcanvas}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
                Меню
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="offcanvas-body">
              <Nav className="justify-content-end flex-grow-1 pe-3 navbar_form">
                <Nav.Link className="text_medium" href="/#action1" onClick={(e) => handleNavLinkClick(e, '#action1')}>КАРЬЕРА</Nav.Link>
                <Nav.Link className="text_medium" href="/#action4" onClick={(e) => handleNavLinkClick(e, '#action4')}>СТУДЕНТАМ</Nav.Link>
                {/* <Nav.Link className="text_medium" href="/#action10" onClick={(e) => handleNavLinkClick(e, '#action10')}>ШКОЛЬНИКАМ</Nav.Link> */}
                <Nav.Link className="text_medium" href="/#action5" onClick={(e) => handleNavLinkClick(e, '#action5')}>НАПРАВЛЕНИЯ</Nav.Link>
                <div ref={dropdownRef} className="nav-item dropdown">
                  <NavDropdown 
                    className="text_medium" 
                    title="О НАС" 
                    id="nav-dropdown"
                    onClick={toggleDropdown}
                    show={isMobile ? showDropdown : undefined}
                  >
                    <NavDropdown.Item 
                      className="text_medium" 
                      href="/#action7" 
                      onClick={(e) => handleNavLinkClick(e, '#action7')}
                    >
                      НАШИ СОТРУДНИКИ
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      className="text_medium" 
                      href="/#action8" 
                      onClick={(e) => handleNavLinkClick(e, '#action8')}
                    >
                      ЦЕННОСТИ
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      className="text_medium" 
                      href="/#action9" 
                      onClick={(e) => handleNavLinkClick(e, '#action9')}
                    >
                      О НАС
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      className="text_medium" 
                      href="/#action11" 
                      onClick={(e) => handleNavLinkClick(e, '#action11')}
                    >
                      ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </Nav>
              <Form className="d-flex navbar_form">
                <Button 
                  className="navbar_btn btn-askona-border" 
                  variant="light" 
                  href="/#action6" 
                  onClick={(e) => handleNavLinkClick(e, '#action6')}
                >
                  <span className="navbar_btn_text">Подай заявку прямо сейчас!</span>
                </Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}