import React from 'react';
import YearlyDataTable from './components/YearlyDataTable';
import AvgDataTable from './components/AvgDataTable';
import { data } from './StaticData/data';

function App() {
  return (
    <div className="App">
      <YearlyDataTable data={data} />
      <AvgDataTable data={data} />
    </div>
  );
}

export default App;
