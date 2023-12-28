import React from "react";
import { TextField, Grid } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label }: { name: any; label: any }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({ field }) => <TextField fullWidth label={label} required />}
        control={control}
        name={name}
      />
    </Grid>
  );
};

export default FormInput;
