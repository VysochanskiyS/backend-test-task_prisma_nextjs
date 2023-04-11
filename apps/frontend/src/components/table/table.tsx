import { Header } from "./Header";
import React, { useState } from "react";
import styles from "./table.module.scss";
import Row from "./Rows/Row";
import { IEditableCell, IEditableRow, IEditableRowTemplate, IOnCellChange, RowInput } from "./Rows/RowInput";

export type IOnSave<T> = (value: T)=> void
interface IPropsTable {
  columns: string[]
  rows: {
    [key: string]: string | number
  }[]
  newRowTemplate: IEditableRowTemplate

  onSave: IOnSave<any>
}

export const Table: React.FC<IPropsTable> = ({columns, rows, newRowTemplate, onSave}) => {
  const [newTransactions, setNewTransactions] = useState<IEditableRow[]>([]);
  const onCellChange: IOnCellChange = (value, rowId, columnName) => {
    setNewTransactions(prevState => {
      const changedRowIndex = prevState.findIndex(row => row.rowId === rowId);
      const changedRow = prevState[changedRowIndex];

      const changedCellIndex = changedRow.cellsData
        .findIndex(cel => cel.columnName === columnName);
      const changedCell = changedRow.cellsData[changedCellIndex];
      const newCell: IEditableCell = {
        ...changedCell,
        value: value
      };
      const updatedCells = [
        ...changedRow.cellsData.slice(0, changedCellIndex),
        newCell,
        ...changedRow.cellsData.slice(changedCellIndex + 1, changedRow.cellsData.length)];
      const newRow: IEditableRow = {
        ...changedRow,
        cellsData: updatedCells
      };
      return [
        ...prevState.slice(0, changedRowIndex),
        newRow,
        ...prevState.slice(changedRowIndex + 1, prevState.length)];
    });
  };

  const onAddHandler = () => {
    setNewTransactions(prevState => ([
      ...prevState,
      {
        cellsData: newRowTemplate.cellsData.map(cellTemplate=>{
          return {
            ...cellTemplate,
            onChange: onCellChange
          }
        }),
        rowId: prevState.length
      }
    ]));
  };

  const onSaveHandler = async () => {
    const transactions = newTransactions.map((transaction) => {
      return transaction.cellsData.reduce((accum: {[key: string]: string | undefined}, cell) => {
        accum = {
          ...accum,
          [cell.columnName]: cell.value
        };
        return accum;
      }, {} as  {[key: string]: string | undefined});
    });
    onSave(transactions)
    setNewTransactions([])
  };



  const mappedData = rows.map((transaction) => ([
    transaction.owe, transaction.owed, transaction.amount
  ]));
  return (
    <div>

      <table className={styles.table}>
        <thead>
        <Header columnNames={columns} />

        </thead>
        <tbody>
        {mappedData.map((texts, i) => {
          return <Row
            key={i}
            columns={texts}
          />;
        })}
        {newTransactions.map(column => {
          return <RowInput
            key={column.rowId}
            row={column}
          />;
        })}
        </tbody>
      </table>
      <button
        onClick={onAddHandler}
      >
        add
      </button>
      <button
        onClick={onSaveHandler}
      >
        save
      </button>
    </div>

  );
};
