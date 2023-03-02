import React, { memo, useCallback, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Icon from "@mui/material/Icon";
import Icons from "./Icons";
import Textarea from "./Textarea";

function Section({ id, title, subtitle, index, moveCard }) {
  const [currTitle, setTitle] = useState(title);
  const [currSubtitle, setSubtitle] = useState(subtitle);
  const defaultIcon = "home_rounded";
  const [selectedIcon, setSelectedIcon] = useState(defaultIcon);
  const [iconMenu, setIconMenu] = useState(false);

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "section",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "section",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const closeIconMenu = useCallback((e) => {
    setIconMenu(false);
  }, []);

  const chooseIcon = useCallback((e) => {
    setSelectedIcon(e.target.innerText);
    closeIconMenu();
  }, [closeIconMenu]);

  return (
    <div
      ref={ref}
      className="section"
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <div className="section-icon">
        <Icon
          className={`material-icons`}
          fontSize="large"
          onClick={useCallback((event) => setIconMenu(true), [])}
        >
          {selectedIcon}
        </Icon>
        {iconMenu && <Icons chooseIcon={chooseIcon} close={closeIconMenu} />}
      </div>
      <div className="section-title">
        <Textarea
          placeholder="Insert text here"
          value={currTitle}
          updateValue={useCallback((event) => setTitle(event.target.value), [])}
        ></Textarea>
      </div>
      <div className="section-subtitle">
        <Textarea
          placeholder="Add here your additional text"
          value={currSubtitle}
          updateValue={useCallback(
            (event) => setSubtitle(event.target.value),
            []
          )}
        ></Textarea>
      </div>
    </div>
  );
}

export default memo(Section);
