import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, CircularProgress } from '@mui/material';

const SingleTrain = ({ setPage }) => {
  const [train, setTrain] = useState(null);

  useEffect(() => {
    // Fetch single train data from the API
    const fetchSingleTrain = async () => {
      try {
        const response = await axios.get('API_ENDPOINT_URL');
        const trainData = response.data;
        setTrain(trainData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleTrain();
  }, []);

  return (
    <div>
      <Typography variant="h4">Single Train</Typography>
      <Button variant="contained" onClick={() => setPage('trainSchedule')}>
        Back to Train Schedule
      </Button>
      {train ? (
        <div>
          <Typography variant="h5">{train.name}</Typography>
          <Typography>Departure Time: {train.departureTime}</Typography>
          <Typography>Seats Available: {train.seatsAvailable}</Typography>
          <Typography>Price: {train.price}</Typography>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default SingleTrain;