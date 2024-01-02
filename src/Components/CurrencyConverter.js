//Required imports
import React, { useEffect, useState } from "react";
import CurrencyInput from "./CurrencyInput";
import SwapLogo from "../../src/Images/SwapLogo.png";
import "../../src/Components/CurrencyConverter.css";

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [Options, setOptions] = useState([]);
  const [exchangeRate, setExchangeRate] = useState();
  const [data, setData] = useState([]);
  const [fromAmount, setFromAmount] = useState();
  const [toAmount, setToAmount] = useState();
  const [val, setVal] = useState();

  //To set initial values
  async function fetchData() {
    const res = await fetch(
      "http://data.fixer.io/api/latest?access_key=eeed7a9637a47463686754932d5b3361"
    );
    const data = await res.json();
    // console.log(data.rates);
    setData(data);
    setFromCurrency(data.base);
    setToCurrency(Object.keys(data.rates)[0]);
    const options = Object.keys(data.rates);
    setOptions([data.base, ...options]);
    setExchangeRate(data.rates[toCurrency]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  //Setting the amount value for fromAmount
  // toAmount to be shown only when button is clicked
  const onAmountInput = (value) => {
    setFromAmount(value);
    if (!isNaN(value)) {
      setToAmount("");
      const val = value * exchangeRate;
      setVal(val);
    } else {
      alert(`${value} is not a number. Please enter a valid number.`);
      setFromAmount("");
    }
  };

  //If fromAmount is not empty then set toAmount
  const ansDisplay = () => {
    if (fromAmount !== "") setToAmount(val);
  };

  //To set ExchangeRate when fromCurrency or toCurrency changes
  useEffect(() => {
    if (data.rates) {
      setExchangeRate(data.rates[toCurrency] / data.rates[fromCurrency]);
    }
    setFromAmount("");
    setToAmount("");
  }, [fromCurrency, toCurrency, data.rates]);

  //To swap fromCurrency and toCurrency
  const swapValues = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount("");
    setToAmount("");
    const swapval = 1 / exchangeRate;
    setExchangeRate(swapval);
  };

  return (
    <>
      <div className="parent-box">
        <h4 className="heading">Currency Converter</h4>
        <div className="display-info">
          <div className="sub-display-info">
            <section className="from-info">
              <div>
                <CurrencyInput
                  selectedCurrency={fromCurrency}
                  Options={Options}
                  amountIndication="Amount"
                  onChangeCurrency={(e) => setFromCurrency(e.target.value)}
                  onAmountInput={onAmountInput}
                  check="true"
                  amount={fromAmount}
                />
              </div>
            </section>
            <section className="swap-button-container">
              <hr />
              <button className="swap-button" onClick={swapValues}>
                <img src={SwapLogo}></img>
              </button>
            </section>
            <section className="to-info">
              <div>
                <CurrencyInput
                  selectedCurrency={toCurrency}
                  Options={Options}
                  amountIndication="Converted Amount"
                  onChangeCurrency={(e) => setToCurrency(e.target.value)}
                  onAmountInput={onAmountInput}
                  check="false"
                  amount={toAmount}
                />
              </div>
            </section>
            <button className="change-button-container" onClick={ansDisplay}>
              Convert {fromCurrency} to {toCurrency}
            </button>
          </div>
        </div>
        <section className="exchange-rate">
          <p>Indicative Exchange Rate</p>
          <p className="exchange-rate-content">
            1 {fromCurrency} = {exchangeRate} {toCurrency}
          </p>
        </section>
      </div>
    </>
  );
}
