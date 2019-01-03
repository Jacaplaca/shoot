import React from "react";
import classNames from "classnames";
import SortButtons from "./SortButtons";

const HeadRowField = ({ children, classes, title, click, sort }) => (
  <span
    className={classNames(classes.headBlock)}
    style={{
      display: "grid",
      alignItems: "center",
      gridTemplateColumns: `${sort && "24px"} 1fr`
    }}
  >
    {sort && <SortButtons click={click} />}
    {/* {children} */}
    <span>{title}</span>
  </span>
);

HeadRowField.defaultProps = {
  sort: false
};

export default HeadRowField;
