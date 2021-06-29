import axios from "axios";
import React, { useEffect, useState } from "react";
import ScoopOption from "./ScoopOptions";
import ToppingOption from "./ToppingOptions";
import { Row } from "react-bootstrap";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const renderItems = () => {
    return items.map((item) => {
      return (
        <ItemComponent
          key={item.name}
          name={item.name}
          imagePath={item.imagePath}
          updateItemCount={(itemName, newItemCount) =>
            updateItemCount(itemName, newItemCount, optionType)
          }
        />
      );
    });
  };

  if (error) {
    return <AlertBanner />;
  }

  return (
    <React.Fragment>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: ${orderDetails.totals[optionType]}
      </p>
      <Row>{renderItems()}</Row>
    </React.Fragment>
  );
}
