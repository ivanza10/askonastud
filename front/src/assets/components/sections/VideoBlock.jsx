import { Container, Row, Col } from "react-bootstrap";
import { MdOutlineFactory } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { PiMedalFill } from "react-icons/pi";
import { useEffect, useState } from "react";

const VideoBlock = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <Container className="my-5 text-center">
      <Row>
        <Col>
          <h1 className="title">Почему Аскона?</h1>
          <h5>Узнайте, как это — быть частью команды Аскона!</h5>
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          <div className="video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <video
              className="video"
              controls
              playsInline
              poster="/photo/back_2.png"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            >
              <source 
                src={isMobile ? "/video/Askona_HR_60sec_720p.mp4" : "/video/Askona_HR_60sec_4K.mp4"} 
                type="video/mp4" 
              />
              Ваш браузер не поддерживает видео тег.
            </video>
          </div>
        </Col>
      </Row>

      <Row className="d-flex">
        <Col md={4}>
          <h3 className="title">
            <MdOutlineFactory className="me-2 video_section_icons" />
            «Марка № 1»
          </h3>
          <p className="text_medium">
            Askona является 7-кратным обладателем самой уважаемой народной
            российской награды «Марка № 1» в категориях «Матрасы для здорового сна»
          </p>
        </Col>
        <Col md={4}>
          <h3 className="title">
            <PiMedalFill className="me-2 video_section_icons" />
            300 000 м²
          </h3>
          <p className="text_medium">
            10 производственных площадок расположены в Коврове, Владимире и
            Новосибирске. Основные рынки ГК «Askona» – Россия, СНГ.
          </p>
        </Col>
        <Col md={4}>
          <h3 className="title">
            <GoPeople className="me-2 video_section_icons" /> 9 тыс. +
          </h3>
          <p className="text_medium">
            Общее количество сотрудников компании, работающих на всех
            производственных площадках и в офисах по всей России и странам СНГ
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default VideoBlock;
