import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select } from "antd";
import { RiCoinsLine } from "react-icons/ri";

function Converter() {
  const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";

  const defaultFirstSelect = "Bitcoin";
  const defaultSecondSelect = "Ether";

  const [cryptoList, setCryptoList] = useState([]);
  const [inputValue, setInputValue] = useState("0");
  const [firstSelect, setFirstSelect] = useState(defaultFirstSelect);
  const [secondSelect, setSecondSelect] = useState(defaultSecondSelect);
  const [result, setResult] = useState("0");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();

    const data = jsonData.rates;

    // const tempArray = [];
    // Object.entries(data).forEach((item) => {
    //   const tempObj = {
    //     value: item[1].name,
    //     value: item[1].name,
    //     rate: item[1].value,
    //   };
    //   tempArray.push(tempObj);
    // });

    const tempArray = Object.entries(data).map((item) => {
      return {
        value: item[1].name,
        value: item[1].name,
        rate: item[1].value,
      };
    });

    setCryptoList(tempArray);
  }

  useEffect(() => {
    if (cryptoList.length == 0) return;
    const firstSelRate = cryptoList.find((item) => {
      return item.value == firstSelect;
    }).rate;
    const secondSelRate = cryptoList.find((item) => {
      return item.value == secondSelect;
    }).rate;
    const resultVal = (inputValue * secondSelRate) / firstSelRate;
    setResult(resultVal.toFixed(3));
  }, [inputValue, firstSelect, secondSelect]);
  return (
    <div>
      {/* <Button>Click Me!</Button> */}
      {/* <Button type="primary">Click Me!</Button> */}
      <div className="container">
        <Card
          className="crypto-card"
          title={
            <h1>
              <RiCoinsLine />
              Crypto-Converter
            </h1>
          }
        >
          <Form size="large">
            <Form.Item>
              <Input onChange={(event) => setInputValue(event.target.value)} />
            </Form.Item>
          </Form>
          <div className="select-box">
            <Select
              style={{ width: "170px" }}
              defaultValue={defaultFirstSelect}
              options={cryptoList}
              onChange={(value) => setFirstSelect(value)}
            ></Select>
            <Select
              style={{ width: "170px" }}
              defaultValue={defaultSecondSelect}
              options={cryptoList}
              onChange={(value) => setSecondSelect(value)}
            ></Select>
          </div>
          <p>
            {inputValue} {firstSelect} = {result} {secondSelect}
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Converter;
