import * as yup from "yup";

export const validateInputs = (name, number) => {
  let schema = yup.object().shape({
    name: yup.string().required("მიუთითეთ თქვენი სახელი"),
    number: yup
      .string("შეიყვანეთ ციფრები")
      .min(9, "ნომერი უნდა შეიცავდე 9 სიმბოლოს")
      .max(9, "ნომერი უნდა შეიცავდე 9 სინბოლოს")
      .required("მიუთითეთ თქვენი ნომერი")
  });
  return schema.validate(
    {
      name: name,
      number: number
    },
    {
      abortEarly: false
    }
  );
};
