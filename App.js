import React, { useState } from 'react';
import TrainSchedule from './components/TrainSchedule';
import SingleTrain from './components/SingleTrain';

function App() {
  const [page, setPage] = useState('trainSchedule');

  const renderPage = () => {
    if (page === 'trainSchedule') {
      return <TrainSchedule setPage={setPage} />;
    } else if (page === 'singleTrain') {
      return <SingleTrain setPage={setPage} />;
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;