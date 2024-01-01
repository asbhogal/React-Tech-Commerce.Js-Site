import React from "react";
import { TextField, Grid } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label }: { name: string; label: string }) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            {...register(name, { required: "This field is required" })}
            {...field}
            fullWidth
            label={label}
            error={Boolean(errors[name])}
            helperText={errors[name] && String(errors[name]?.message)}
          />
        )}
      />
    </Grid>
  );
};

export default FormInput;
