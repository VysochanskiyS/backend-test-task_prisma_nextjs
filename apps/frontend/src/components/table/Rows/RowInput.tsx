import React, { HTMLInputTypeAttribute } from "react";

export type IOnCellChange = (value: string, rowId: number, columnName: string) => void

export type IEditableCell = {
  columnName: string,
  value?: string,
  type: HTMLInputTypeAttribute
  onChange: IOnCellChange
}



export type IEditableRow = {
  rowId: number;
  cellsData: IEditableCell[]
}
export type IEditableCellTemplate = Omit<IEditableCell, 'onChange'>

export type IEditableRowTemplate = {
  cellsData: IEditableCellTemplate[]
}
interface IPropsRow {
  row: IEditableRow;
}

export const RowInput: React.FC<IPropsRow> = ({ row }) => {
  return (
    <tr>
      {row.cellsData.map(({ columnName, value, type, onChange }) => {
        return <td
          key={columnName}
        >
          <input
            value={value ? value : ''}
            type={type}
            key={columnName}
            onChange={(e) => {
              onChange(e.target.value, row.rowId, columnName);
            }}
          />
        </td>;

      })}
    </tr>
  );
};
