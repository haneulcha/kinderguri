import React from "react";
import Paper from "@material-ui/core/Paper";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";

const List = (props) => {
  const sendingBack = (e) => {
    const id = e.target.id;
    props.markingFn(id);
  };

  return (
    <div className="list">
      <div
        className="result-title text"
        style={{
          textAlign: "center",
          height: 40,
          marginTop: 10,
          fontWeight: "bold",
          color: "#e9e7e7",
          fontSize: "1.2em",
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
                {item.car && item.car === "Y" ? "🚌 /" : ""}
                {item.kids ? " 🧑👧 : " + item.kids + "명 /" : ""}
                {item.staff ? " 👩‍🏫👨‍🏫 : " + item.staff + "명" : ""}
              </div>
            </div>
          </Paper>
        );
      })}
    </div>
  );
};

export default List;
