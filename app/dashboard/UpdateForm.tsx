import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import styles from "./dashboard.module.css";

interface FormData {
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  birthday_date: "",
  phone_number: "",
  address: "",
};

const UpdateForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.updateForm}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Birthday Date"
        name="birthday_date"
        type="date"
        value={formData.birthday_date}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Phone Number"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UpdateForm;
