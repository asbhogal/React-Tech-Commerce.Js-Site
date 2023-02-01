import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form"

const FormInput = () => {

    const { control } = useFormContext( { name, label, required });

    return (
        <Grid item xs={ 12 } sm={ 6 }>
            <Controller 
                as={ TextField }
                control={ control }
                fullWidth
                name={ customerName }
                label={ label }
                required={ required }
            />


        </Grid>
    )
};

export default FormInput;