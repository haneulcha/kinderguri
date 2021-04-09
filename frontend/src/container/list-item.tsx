import React from "React";
import { useLocation, Link, RouteComponentProps } from "@reach/router";
import { coordVar } from "../cache";
import { ListItemContainer } from "../component";

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
    <ListItemContainer>
      <div onClick={handleCoord}>
        <span className="type">{type}</span>
        <h3>{name}</h3>
        <p className="tel">{tel}</p>
        <div className="to-detail">
          <Link to={`${location.pathname}/${name}`}>자세히</Link>
        </div>
      </div>
    </ListItemContainer>
  );
};

export default ListItem;
