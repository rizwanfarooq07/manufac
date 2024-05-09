import React from 'react';
import { Table } from '@mantine/core';
import { CropDataInterface } from '../interfaces';

// Define props interface for AvgDataTable
interface AvgDataTableProps {
  data: CropDataInterface[]; // Assuming CropData is a type representing the structure of your data
}

// Define the functional component
const AvgDataTable: React.FC<AvgDataTableProps> = ({ data }) => {

  // Function to merge data and calculate averages
  const mergeDataAndCalculateAverages = (data: CropDataInterface[]): { Crop: string; "Average Yield of the Crop between 1950-2020": string; "Average Cultivation Area of the Crop between 1950-2020": string }[] => {
    // Create an object to store merged data
    const mergedData: { [key: string]: { Crop: string; "Total Production": number; "Total Yield": number; "Total Area": number; Count: number } } = {};

    // Loop through the data array
    data.forEach(entry => {
      const cropName = entry["Crop Name"];

      // If the crop doesn't exist in mergedData, create a new object for it
      if (!mergedData[cropName]) {
        mergedData[cropName] = {
          "Crop": cropName,
          "Total Production": 0,
          "Total Yield": 0,
          "Total Area": 0,
          "Count": 0
        };
      }

      // Check if current entry has production data
      const production = parseFloat(entry["Crop Production (UOM:t(Tonnes))"]);
      const yieldOfCrops = parseFloat(entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]);
      const areaUnderCultivation = parseFloat(entry["Area Under Cultivation (UOM:Ha(Hectares))"]);

      // Update total production, yield, and area for the crop
      if (!isNaN(production)) {
        mergedData[cropName]["Total Production"] += production;
      }
      if (!isNaN(yieldOfCrops)) {
        mergedData[cropName]["Total Yield"] += yieldOfCrops;
      }
      if (!isNaN(areaUnderCultivation)) {
        mergedData[cropName]["Total Area"] += areaUnderCultivation;
      }

      // Increment count for the crop
      mergedData[cropName]["Count"]++;
    });

    // Calculate average yield and average cultivation area for each crop
    const result = Object.values(mergedData).map(entry => ({
      "Crop": entry["Crop"],
      "Average Yield of the Crop between 1950-2020": entry["Count"] > 0 ? (entry["Total Yield"] / entry["Count"]).toFixed(3) : "",
      "Average Cultivation Area of the Crop between 1950-2020": entry["Count"] > 0 ? (entry["Total Area"] / entry["Count"]).toFixed(3) : ""
    }));

    return result;
  }

  // Call the mergeDataAndCalculateAverages function
  const mergedAvgData = mergeDataAndCalculateAverages(data);

  // Create table rows for merged average data
  const avgDataTableRow = mergedAvgData.map((element, index:number) => (
    <Table.Tr key={index}>
      <Table.Td>{element["Crop"]}</Table.Td>
      <Table.Td>{element["Average Yield of the Crop between 1950-2020"]}</Table.Td>
      <Table.Td>{element["Average Cultivation Area of the Crop between 1950-2020"]}</Table.Td>
    </Table.Tr>
  ));

  // Render the table component with the average data
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Crop</Table.Th>
          <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
          <Table.Th>Average Cultivation Area of the Crop between 1950-2020</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{avgDataTableRow}</Table.Tbody>
    </Table>
  );
}

export default AvgDataTable;
