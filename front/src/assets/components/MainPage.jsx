import Directions from "./sections/Directions";
import About from "./sections/About";
import Staff from "./sections/Staff";
import Forms from "./sections/Forms";
import Stages from "./sections/Stages";
import Offers from "./sections/Offers";
import VideoBlock from "./sections/VideoBlock";
import CookieConsent from "./sections/CookieConsent";
import Career from "./sections/Career";
import ValuesBlock from "./sections/ValuesBlock";
import BaseBlock from "./sections/BaseBlock";
import StagesMobile from "./sections/StagesMobile";
import "../styles/MainPage.sass";
import School from "./sections/School.jsx";


export default function MainPage() {
  return (
    <>
      <section className="section_form">
        <BaseBlock />
      </section>
      <main>
        <div className="main">
          <section id="action1" className="section-with-career-background">
            <Career />
          </section>
          <section id="action9" className="section-with-background mb-5">
            <About />
          </section>
          
          <section id="action3" className="mb-5">
            <Offers />
          </section>
          <section id="action4" className="mb-5 section_stages pb-5 section-with-stages-background">
            <div className="d-none d-md-block">
              <Stages />
            </div>
            <div className="d-md-none">
              <StagesMobile />
            </div>
          </section>
          <section id="action5" className="section_ref pb-5 pt-5 section-with-directions-background">
            <Directions />
          </section>
          <section id="action6" className=" section_form ">
            <Forms />
          </section>
          <section id="action7" className="">
            <Staff />
          </section>
          <section id="action8" className="">
            <ValuesBlock />
          </section>
          <section id="action2" className="section_form pb-1 pt-1">
            <VideoBlock />
          </section>
          {/* <section id="action10" className="">
            <School />
          </section> */}
        </div>
      </main>
      <CookieConsent />
    </>
  );
}