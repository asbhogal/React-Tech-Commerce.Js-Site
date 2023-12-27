import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm();

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingRegions, setShippingRegions] = useState([]);
  const [shippingRegion, setShippingRegion] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subdivisions = Object.entries(shippingRegions).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));

  const fetchShippingCountries = async (checkoutTokenID) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenID
    );

    setShippingCountries(countries);

    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchCountryRegions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingRegions(subdivisions);

    setShippingRegion(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenID,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenID,
      { country, region }
    );

    setShippingOption(options[0].id);

    setShippingOptions(options);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchCountryRegions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingRegion)
      fetchShippingOptions(checkoutToken.id, shippingCountry, shippingRegion);
  }, [shippingRegion]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({ ...data, shippingCountry, shippingRegion, shippingOption })
          )}
        >
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First Name" />
            <FormInput name="lastName" label="Last Name" />
            <FormInput name="propertyNumber" label="Flat/House No." />
            <FormInput name="addressLine1" label="Address Line 1" />
            <FormInput name="town" label="Town/City" />
            <FormInput name="ZipPostCode" label="ZIP/Post Code" />
            <FormInput name="emailAddress" label="Email Address" />
            <FormInput name="cellNumber" label="Cell / Phone Number" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((countries) => (
                  <MenuItem key={countries.id} value={countries.id}>
                    {countries.label}
                  </MenuItem>
                ))}
                ;
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Region</InputLabel>
              <Select
                value={shippingRegion}
                fullWidth
                onChange={(e) => setShippingRegion(e.target.value)}
              >
                {subdivisions.map((subdivisions) => (
                  <MenuItem key={subdivisions.id} value={subdivisions.id}>
                    {subdivisions.label}
                  </MenuItem>
                ))}
                ;
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back To Cart
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Proceed To Payment
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
