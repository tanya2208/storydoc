import React, { memo, useEffect, useState } from "react";
import * as ICONS from "@mui/icons-material";
import Icon from "@mui/material/Icon";

function Icons({ chooseIcon, close }) {
  const [icons, setIcons] = useState(
    Object.keys(ICONS).filter((iconName) => {
      return iconName.endsWith("Rounded");
    })
  );

  useEffect(() => {
    let tmpArr = icons.map((icon) =>
      icon
        .replace(/([A-Z])/g, " $1")
        .trimStart()
        .split(/\s+/)
        .join("_")
        .toLowerCase()
    );
    setIcons(tmpArr);
  }, [icons]);

  return (
    <div className="icons-container">
      <button onClick={(e) => close(e)}>
        <Icon fontSize="small">close</Icon>
      </button>
      <h2>Icons</h2>
      <div className="display-flex align-horizontal_spread align-vertical_center wrap">
        {icons.map((iconName) => (
          <div key={iconName} className="icon">
            <Icon
              fontSize="small"
              className={`material-icons`}
              onClick={(e) => chooseIcon(e)}
            >
              {iconName}
            </Icon>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Icons);
