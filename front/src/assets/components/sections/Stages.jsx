import { Container } from "react-bootstrap";
import "../../styles/Stages.sass";

const stages = [
  { 
    id: 1, 
    title: (
      <>
        Подай заявку через <a href="/#action6" className="form-link">форму</a>
      </>
    )
  },
  { id: 2, title: "Успешно пройди собеседование", position: "top" },
  { id: 3, title: "Пройди медосмотр" },
  { id: 4, title: "Предоставь пакет документов", position: "top" },
];

export default function Stages() {
  return (
    <Container className="timeline-container mb-5">
      <h1 className="text-center section_stages_title title">Этапы отбора на стажировку</h1>
      <div className="timeline-line">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className={`timeline-stage ${stage.position === "top" ? "top-label" : "bottom-label"}`}
            style={{ "--index": index }}
          >
            {stage.position === "top" && (
              <span className="stage-label text_medium">{stage.title}</span>
            )}
            <div className="stage-circle" />
            {stage.position !== "top" && (
              <span className="stage-label text_medium">{stage.title}</span>
            )}
          </div>
        ))}
        <div className="moving-circle" />
      </div>
    </Container>
  );
}
