import React from "react";
import Paper from "@material-ui/core/Paper";

const List = (props) => {
  const sendingBack = (e) => {
    const id = e.target.id;
    props.markingFn(id);
  };

  return (
    <div className="div3 container">
      <div
        className="result-title text"
        style={{
          textAlign: "center",
          height: 40,
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        검색 결과
      </div>

      {props.list.map((item, index) => {
        return (
          <Paper className="result-item-container" key={index}>
            <h3 className="result-title" onClick={sendingBack} id={index}>
              {item.name}
            </h3>
            <div className="result-info">
              <div key={item.tel}>☎: {item.tel}</div>
              <div key={item.post}>🏠: {item.post}</div>
              <div key={item.road}>
                {item.road ? "(" + item.road + ")" : ""}
              </div>
              <div key={item.hompage}>
                {item.hasOwnProperty("homepage") &&
                item.homepage !== null &&
                item.homepage !== "http://" ? (
                  <a href={item.homepage}> 🌐: {item.homepage}</a>
                ) : (
                  ""
                )}
              </div>
              <div>
                {item.kids ? "🧑👧 : " + item.kids : ""}{" "}
                {item.staff ? "👩‍🏫👨‍🏫 : " + item.staff : ""}
                {item.car && item.car === "Y" ? "🚍" : ""}
              </div>
            </div>
          </Paper>
        );
      })}
    </div>
  );
};

export default List;
