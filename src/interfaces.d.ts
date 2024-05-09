export interface CropDataInterface {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": any; // Assuming it can be a number or a string
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": any; // Assuming it can be a number or a string
    "Area Under Cultivation (UOM:Ha(Hectares))": any; // Assuming it can be a number or a string
  }