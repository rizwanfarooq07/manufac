import React from 'react';
import { Table } from '@mantine/core';
import {data} from '../StaticData/data'


const YearlyDataTable = () => {

function mergeDataByYear(data:any) {
  // Create an object to store merged data
  const mergedData:any = {};

  // Loop through the data array
  data.forEach((entry:any) => {
      const year = entry.Year;

      // If the year doesn't exist in mergedData, create a new object for it
      if (!mergedData[year]) {
          mergedData[year] = {
              "Country": entry.Country,
              "Year": entry.Year,
              "Crop with Maximum Production in that Year": "",
              "Crop with Minimum Production in that Year": ""
          };
      }

      // Check if current entry has production data
      const production = parseFloat(entry["Crop Production (UOM:t(Tonnes))"]);
      const cropName = entry["Crop Name"];

      // Update maximum and minimum production if applicable
      if (!isNaN(production)) {
          const currentMaxProduction = parseFloat(mergedData[year]["Max Production"]) || 0;
          const currentMinProduction = parseFloat(mergedData[year]["Min Production"]) || Number.MAX_SAFE_INTEGER;

          if (production > currentMaxProduction) {
              mergedData[year]["Max Production"] = production;
              mergedData[year]["Crop with Maximum Production in that Year"] = cropName;
          }

          if (production < currentMinProduction) {
              mergedData[year]["Min Production"] = production;
              mergedData[year]["Crop with Minimum Production in that Year"] = cropName;
          }
      }
  });

  // Convert mergedData object into an array
  const result = Object.values(mergedData);

  return result;
}

const mergedData = mergeDataByYear(data);

  const yearlydataTableRow = mergedData.map((element:any , index:number) => (<Table.Tr key={index}>
    <Table.Td>{element["Year"]}</Table.Td>
    <Table.Td>{element["Crop with Maximum Production in that Year"]}</Table.Td>
    <Table.Td>{element["Crop with Minimum Production in that Year"]}</Table.Td>
  </Table.Tr>))
    
      return (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Year</Table.Th>
              <Table.Th>Crop with Maximum Production in that Year</Table.Th>
              <Table.Th>Crop with Minimum Production in that Year</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{yearlydataTableRow}</Table.Tbody>
        </Table>
      );
}

export default YearlyDataTable;
