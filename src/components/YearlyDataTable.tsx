import React from 'react';
import { Table } from '@mantine/core';
import { CropDataInterface } from '../interfaces';

// Define props interface for YearlyDataTable
interface YearlyDataTableProps {
  data: CropDataInterface[]; // Assuming CropData is a type representing the structure of your data
}

// Define the functional component
const YearlyDataTable: React.FC<YearlyDataTableProps> = ({ data }) => {

  // Function to merge data by year and find crops with maximum and minimum production
  const mergeDataByYear = (data: CropDataInterface[]): { Country: string; Year: string; "Crop with Maximum Production in that Year": string; "Crop with Minimum Production in that Year": string }[] => {
    // Create an object to store merged data
    const mergedData: { [key: string]: { Country: string; Year: string; "Max Production": number | undefined; "Min Production": number | undefined; "Crop with Maximum Production in that Year": string; "Crop with Minimum Production in that Year": string } } = {};

    // Loop through the data array
    data.forEach(entry => {
      const year = entry.Year;

      // If the year doesn't exist in mergedData, create a new object for it
      if (!mergedData[year]) {
        mergedData[year] = {
          "Country": entry.Country,
          "Year": year,
          "Max Production": undefined,
          "Min Production": undefined,
          "Crop with Maximum Production in that Year": "",
          "Crop with Minimum Production in that Year": ""
        };
      }

      // Check if current entry has production data
      const production = parseFloat(entry["Crop Production (UOM:t(Tonnes))"]);
      const cropName = entry["Crop Name"];

      // Update maximum and minimum production if applicable
      if (!isNaN(production)) {
        const currentMaxProduction = mergedData[year]["Max Production"];
        const currentMinProduction = mergedData[year]["Min Production"];

        if (currentMaxProduction === undefined || production > currentMaxProduction) {
          mergedData[year]["Max Production"] = production;
          mergedData[year]["Crop with Maximum Production in that Year"] = cropName;
        }

        if (currentMinProduction === undefined || production < currentMinProduction) {
          mergedData[year]["Min Production"] = production;
          mergedData[year]["Crop with Minimum Production in that Year"] = cropName;
        }
      }
    });

    // Convert mergedData object into an array
    const result = Object.values(mergedData);

    return result;
  }

  // Call the mergeDataByYear function
  const mergedData = mergeDataByYear(data);

  // Create table rows for merged data by year
  const yearlyDataTableRows = mergedData.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element["Year"]}</Table.Td>
      <Table.Td>{element["Crop with Maximum Production in that Year"]}</Table.Td>
      <Table.Td>{element["Crop with Minimum Production in that Year"]}</Table.Td>
    </Table.Tr>
  ));

  // Render the table component with the data by year
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Year</Table.Th>
          <Table.Th>Crop with Maximum Production in that Year</Table.Th>
          <Table.Th>Crop with Minimum Production in that Year</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{yearlyDataTableRows}</Table.Tbody>
    </Table>
  );
}

export default YearlyDataTable;
