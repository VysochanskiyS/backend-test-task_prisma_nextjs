import React from "react";

interface IPropsRow {
  columns: (string | number)[]
}
export const Row: React.FC<IPropsRow> = ({columns}) => {
  return (
    <tr>
      {columns.map((text)=>{
        return <td
        key={text}
        >{text}</td>
      })}
      </tr>
  );
};

export default Row;
