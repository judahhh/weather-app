import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity }) => {
  return (
    <div>
      <Button variant="secondary">νμ¬μμΉ</Button>

      {cities.map((item) => (
        <Button variant="secondary" onClick={() => setCity(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
