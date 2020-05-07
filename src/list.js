import React from "react";

const List = (props) => {
  const sendingBack = (e) => {
    const id = e.target.id;
    props.markingFn(id);
  };

  return (
    <div className="div3">
      <div className="result-title">검색 결과</div>
      {props.list.map((item, index) => {
        return (
          <div className="result-item-container" key={index}>
            <h3 onClick={sendingBack} id={index}>
              {item.name}
            </h3>
            <div key={item.tel}>☎: {item.tel}</div>
            <div key={item.post}>🏠: {item.post}</div>
            <div key={item.road}>{item.road ? "(" + item.road + ")" : ""}</div>
            <div key={item.hompage}>
              {item.hasOwnProperty("homepage") &&
              item.homepage !== null &&
              item.homepage !== "http://" ? (
                <a href={item.homepage}> 🌐: {item.homepage}</a>
              ) : (
                ""
              )}
              {console.log(typeof item.homepage, item.homepage)}
            </div>
            <div>
              {item.kids ? "🧑👧 : " + item.kids : ""}{" "}
              {item.staff ? "👩‍🏫👨‍🏫 : " + item.staff : ""}
              {item.car && item.car === "Y" ? "🚍" : ""}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
