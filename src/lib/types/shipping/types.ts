export interface ShippingData {
  firstName: string;
  lastName: string;
  propertyNumber: string;
  addressLine1: string;
  town: string;
  ZipPostCode: string;
  emailAddress: string;
  cellNumber: string;
  shippingCountry: string;
  shippingRegion: string;
  shippingOption: string;
  shippingSubdivision: string;
}

export type ShippingOption = {
  id: string;
  description: string;
  price: {
    formatted_with_symbol: string;
  };
};
