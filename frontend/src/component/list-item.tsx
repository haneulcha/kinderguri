import React, { Fragment, useState } from "React";
import { useLocation, Link, RouteComponentProps } from "@reach/router";
import { coordVar } from "../cache";

interface ListItemProps extends RouteComponentProps {
  item: any;
}

const ListItem: React.FC<ListItemProps> = ({ item }: any) => {
  const { name, type, tel, location: coord } = item;
  const location = useLocation();

  const handleCoord = () => {
    if (!coord) return;
    coordVar([{ name, location: { long: coord.long, lat: coord.lat } }]);
  };

  return (
    <div onClick={handleCoord}>
      <span>{type}</span>
      <h3>{name}</h3>
      <p>{tel}</p>
      <Link to={`${location.pathname}/${name}`}>자세히</Link>
    </div>
  );
};

export default ListItem;
