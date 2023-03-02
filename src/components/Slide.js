import React, { memo, useCallback, useState } from "react";
import update from "immutability-helper";
import Section from "./Section";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Textarea from "./Textarea";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Slide() {
  const [title, setTitle] = useState("");

  const [sections, setSections] = useState([
    {
      id: 1,
      title: "",
      subtitle: "",
    },
    {
      id: 2,
      title: "",
      subtitle: "",
    },
    {
      id: 3,
      title: "",
      subtitle: "",
    },
  ]);

  const createPDF = async () => {
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [4, 2]
    });
    const data = await html2canvas(document.querySelector("#pdf"));
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("slide.pdf");
  };

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setSections((prevSections) =>
      update(prevSections, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevSections[dragIndex]],
        ],
      })
    );
  }, []);

  const renderSection = useCallback(
    (section, index) => {
      return (
        <Section
          key={section.id}
          index={index}
          id={section.id}
          title={section.title}
          subtitle={section.subtitle}
          moveCard={moveCard}
        />
      );
    },
    [moveCard]
  );

  return (
    <div className="slide">
      <button onClick={createPDF} type="button">
        Download
      </button>
      <div className="pdf" id="pdf">
        <div className="slide-title">
          <Textarea
            placeholder="Insert a title here"
            value={title}
            updateValue={useCallback(
              (event) => setTitle(event.target.value),
              []
            )}
          ></Textarea>
        </div>
        <div className="slide-content">
          <DndProvider backend={HTML5Backend}>
            {sections.map((section, i) => renderSection(section, i))}
          </DndProvider>
        </div>
      </div>
    </div>
  );
}

export default memo(Slide);
