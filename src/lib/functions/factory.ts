import { ShippingData } from "../types/shipping/types";

export function createShippingData(): ShippingData {
  return {
    firstName: "",
    lastName: "",
    propertyNumber: "",
    addressLine1: "",
    town: "",
    ZipPostCode: "",
    emailAddress: "",
    cellNumber: "",
    shippingCountry: "",
    shippingRegion: "",
    shippingOption: "",
    shippingSubdivision: "",
  };
}