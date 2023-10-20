import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./form.css";
import Button from "../button";
import { useState } from "react";
import Table from "../table";

const schema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
});

type FormData = z.infer<typeof schema>;

function Form() {
  const [formData, setFormData] = useState<FormData>({
    description: "",
    price: 0,
    category: "groceries",
  });

  const [dataList, setDataList] = useState<FormData[]>([]);
  const [fieldText, setFieldText] = useState<FormData>(formData);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    setDataList((prevDataList) => [...prevDataList, data]);
    setFormData({ description: "", price: 0, category: "groceries" });
    setFieldText(formData);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCategory = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      category: newCategory,
    }));
  };
  let i: number = 0;
  const handleDelete = (index: number) => {
    setDataList((prevDataList) => prevDataList.filter((_, i) => i !== index));
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFieldText({ ...fieldText, [e.target.name]: value });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <input
            {...register("description")}
            id="description"
            name="description"
            className="form-control"
            value={fieldText.description}
            onChange={handleFieldChange}
          ></input>
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb3">
          <label htmlFor="price" className="form-label">
            price
          </label>
          <input
            {...register("price", { valueAsNumber: true })}
            id="price"
            name="price"
            value={fieldText.price}
            onChange={handleFieldChange}
            type="number"
            className="form-control"
          ></input>
          {errors.price && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </div>
        <div className="mb3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-select drop"
            onChange={handleCategoryChange}
          >
            <option value="groceries">groceriess</option>
            <option value="utilites">utilites</option>
            <option value="entertainment">entertainment</option>
          </select>
        </div>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
      <Table dataList={dataList} onDelete={handleDelete} />
    </>
  );
}

export default Form;
