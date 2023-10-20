import React from "react";
import { useState } from "react";
import Button from "../button";
import { ChangeEventHandler } from "react";

interface FormData {
  description: string;
  price: number;
  category: string;
}

interface Props {
  dataList: FormData[];
  onDelete: (index: number) => void;
}

const Table = ({ dataList, onDelete }: Props) => {
  const [expenses, setExpenses] = useState(0);

  React.useEffect(() => {
    const total = dataList.reduce((acc, item) => acc + item.price, 0);
    setExpenses(total);
  }, [dataList]);

  const [selected, setSelected] = useState<string>("All");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  const filteredData =
    selected === "All"
      ? dataList
      : dataList.filter((item) => item.category === selected);

  return (
    <>
      <div>
        <div className="mb3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            onChange={handleChange}
            id="category"
            className="form-select "
          >
            <option value="All">filter : All</option>
            <option value="groceries">filter : groceriess</option>
            <option value="utilites">filter : utilites</option>
            <option value="entertainment">filter : entertainment</option>
          </select>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>description</th>
              <th>price</th>
              <th>category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.price}$</td>
                <td>{item.category}</td>
                <td>
                  <Button
                    onClick={() => {
                      onDelete(index);
                    }}
                    type="reset"
                    color="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <tfoot>
          <tr>
            <td colSpan={4}>total expenses: {expenses}</td>
          </tr>
        </tfoot>
      </div>
    </>
  );
};

export default Table;
