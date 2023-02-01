import {
        InputLabel,
        Select,
        MenuItem,
        Button,
        Grid,
        Typography
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";

const AddressForm = () => {

    const methods = useForm();

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping address</Typography>
            <FormProvider { ...methods }>
                <form onSubmit=''>
                    <Grid container spacing={ 3 }>
                        <FormInput 
                            required
                            name="firstName"
                            label="First Name"
                        />
                        <FormInput 
                            required
                            name="lastName"
                            label="Last Name"
                        />
                        <FormInput 
                            required
                            name="addressLine1"
                            label="Flat/House No."
                        />
                        <FormInput 
                            required
                            name="addressLine2"
                            label="Address Line 1"
                        />
                        <FormInput 
                            required
                            name="town"
                            label="Town/City"
                        />
                        <FormInput 
                            required
                            name="ZipPostCode"
                            label="ZIP/Post Code"
                        />
                        <FormInput 
                            required
                            name="emailAddress"
                            label="Email Address"
                        />
                        <FormInput 
                            required
                            name="cellNumber"
                            label="Cell / Phone Number"
                        />
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
};

export default AddressForm;