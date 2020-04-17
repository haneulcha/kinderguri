import React from "react";

const List = (props) => {
  return (
    <div>
      {console.log(props)}
      <div>검색 결과</div>
      {props.list.map((item) => {
        return (
          <div id={item.name}>
            <h3>{item.name}</h3>
            <div>☎: {item.tel}</div>
            <div>🏠: {item.post}</div>
            <div>{item.road ? "(" + item.road + ")" : ""}</div>
            <div>
              {item.hasOwnProperty("homepage") ? (
                <a href={"/url/" + item.hompage}>🌐: {item.homepage}</a>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
