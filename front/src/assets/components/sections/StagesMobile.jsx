import { Container } from "react-bootstrap";
import "../../styles/StagesMobile.sass";

const stages = [
  { 
    id: 1, 
    title: (
      <>
        Подай заявку через <a href="/#action6" className="form-link ps-1"> форму</a>
      </>
    )
  },
  { id: 2, title: "Успешно пройди собеседование" },
  { id: 3, title: "Пройди медосмотр" },
  { id: 4, title: "Предоставь пакет документов" },
];

export default function StagesMobile() {
  return (
    <Container className="mobile-timeline-container mb-5">
      <h1 className="text-center mobile-section-stages-title title">Этапы отбора на практику/стажировку</h1>
      <div className="mobile-timeline-line">
        <div className="mobile-moving-circle" />
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className="mobile-timeline-stage"
            style={{ "--index": index }}
          >
            <div className="mobile-stage-circle" />
            <span className="mobile-stage-label text-medium mt-3 ">{stage.title}</span>
          </div>
        ))}
      </div>
    </Container>
  );
}