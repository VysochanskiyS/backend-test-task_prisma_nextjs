import React, { useState } from "react";
import { Table } from "./components";
import { IOnSave } from "./components/table/table";
import { ReqAddPayment } from "./types/network/payment";
import { PaymentNetwork } from "./network";


function App() {
  const columns = ["owed", "owe", "amount"];
  const rowBase = [
    {
      amount: 999,
      owe: "John",
      owed: "Sally"
    },
    {
      amount: 2522.2,
      owe: "Sally",
      owed: "John"
    }
  ];
  const [rows, setRows] = useState<ReqAddPayment[]>(rowBase);


  const newRowTemplate = {
    rowId: 0,
    cellsData: [{
      columnName: "owed",
      type: "text"
    }, {
      columnName: "owe",
      type: "text"
    }, {
      columnName: "amount",
      type: "number"
    }]
  };


  const onSave: IOnSave<ReqAddPayment[]> = async (newPayments) => {
    console.log(newPayments);
    const filteredPayment = newPayments.filter((payment) => {
      const { amount, owe, owed } = payment;
      if (owe && owed && amount && Number(amount)) {
        return payment;
      }
    });
    const mappedPayment = filteredPayment.map(({ amount, owe, owed }) => ({
      owed: owed,
      owe: owe,
      amount: Number(amount)

    }));
    console.log(mappedPayment);
    const resData = (await PaymentNetwork.addPayments(mappedPayment)).data;
    console.log(resData);
    const newRows = Array.isArray(resData) && resData.filter(row => {
      const { amount, owe, owed } = row;
      if (amount && owe && owed) {
        return row;
      }
    });
    if (newRows) {
      setRows(newRows);

    }
  };
  return (
    <div className="App">
      <Table
        onSave={onSave}
        columns={columns}
        rows={rows}
        newRowTemplate={newRowTemplate}
      />
    </div>
  );
}

export default App;
