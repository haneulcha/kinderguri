import React from "react";
import Paper from "@material-ui/core/Paper";
import { Call, Home, Language, ChildCare, AssignmentInd, DirectionsBus }from "@material-ui/icons";

const List = ({list, markingFn}) => {
  const sendingBack = (e) => {
    const id = e.target.id;
    markingFn(id);
  };

  return (
    <section className="list">
      <h2     
      >
        검색 결과
      </h2>
      <ul className="container">
      {list.map((item, index) => {
        return (
          <li className="card" key={`institute-${index}`}>
            <Paper key={index} elevation={2} variant="outlined">
              <h3 className="title" onClick={sendingBack} id={index}>
                {item.name}
              </h3>
              <ul className="info">
                <li key={item.tel}><Call />{item.tel}</li>
                <li key={item.post}><Home />{item.post}</li>
                <li key={item.road}>
                  {item.road ? "(" + item.road + ")" : ""}
                </li>
                <li key={item.hompage}>
                  {item.hasOwnProperty("homepage") &&
                  item.homepage !== null &&
                  item.homepage !== "http://" ? (
                    <a href={item.homepage}><Language />{item.homepage}</a>
                  ) : (
                    ""
                  )}
                </li>
                <li className="feature">                
                  {item.kids ? <div><ChildCare />{item.kids}명</div> : ""}
                  {item.staff ? <div><AssignmentInd />{item.staff}명</div> : ""}
                  {item.car && item.car === "Y" ? <div><DirectionsBus /></div> : ""}
                </li>
              </ul>
            </Paper>
          </li>
        );
      })}
      </ul>
    </section>
  );
};

export default List;
