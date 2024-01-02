import React from "react";
import "./CurrencyInput.css";

export default function CurrencyInput(props) {
  const {
    selectedCurrency,
    Options,
    amountIndication,
    onChangeCurrency,
    onAmountInput,
    check,
    amount,
  } = props;

  return (
    <>
      <div className="currency-info">
        <p className="currency-label">Currency</p>
        <select
          className="currency-options"
          value={selectedCurrency}
          onChange={onChangeCurrency}
        >
          {Options.map((option) => (
            <option className="currency-option-val" key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="amount-info">
        <p className="amount-label">{amountIndication}</p>
        <input
          type="text"
          readOnly={check === "false"}
          className="amount-value"
          onChange={(e) => onAmountInput(e.target.value)}
          value={amount}
        />
      </div>
    </>
  );
}
