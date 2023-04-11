import React from "react";

interface IPropsHeader {
  columnNames: string[]
}
export const Header: React.FC<IPropsHeader> = ({columnNames}) => {

  return (
    <tr>
      {columnNames.map((columnName)=>
      <th
      key={columnName}
      >
        {columnName}
      </th>
      )}
    </tr>
  );
};

