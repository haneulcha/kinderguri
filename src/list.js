import React from "react";

const List = (props) => {
  return (
    <div className="result-container">
      <div className="result-title">검색 결과</div>
      {props.list.map((item) => {
        return (
          <div className="result-item-container" key={item.name}>
            <h3>{item.name}</h3>
            <div key={item.tel}>☎: {item.tel}</div>
            <div key={item.post}>🏠: {item.post}</div>
            <div key={item.road}>{item.road ? "(" + item.road + ")" : ""}</div>
            <div key={item.hompage}>
              {item.hasOwnProperty("homepage") ? (
                <a href={item.homepage}> 🌐: {item.homepage}</a>
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
