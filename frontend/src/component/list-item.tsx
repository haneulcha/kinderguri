import React, { Fragment, useState } from "React";
import { useLocation, Link, RouteComponentProps } from "@reach/router";

interface ListItemProps extends RouteComponentProps {
  item: any;
}

const ListItem: React.FC<ListItemProps> = ({ item }: any) => {
  const { name, type, tel } = item;
  const location = useLocation();

  return (
    <div>
      <span>{type}</span>
      <h3>{name}</h3>
      <p>{tel}</p>
      <Link to={`${location.pathname}/${name}`}>자세히</Link>
    </div>
  );
};

export default ListItem;
