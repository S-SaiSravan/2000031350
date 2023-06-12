import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';

const TrainSchedule = ({ setPage }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch train schedule data from the API
    const fetchTrainSchedule = async () => {
      try {
        const response = await axios.get('104.211.219.98:80/train/auth');
        const trainSchedule = response.data;
        setTrains(trainSchedule);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrainSchedule();
  }, []);

  // Filter trains departing in the next 30 minutes
  const filteredTrains = trains.filter(train => {
    const departureTime = new Date(train.departureTime);
    const currentTime = new Date();
    const timeDifference = departureTime.getTime() - currentTime.getTime();
    const minutesDifference = timeDifference / (1000 * 60);

    return minutesDifference > 30;
  });

  // Sort trains based on price, tickets, and departure time
  const sortedTrains = filteredTrains.sort((a, b) => {
    // Sort by price in ascending order
    if (a.price !== b.price) {
      return a.price - b.price;
    }
    // Sort by tickets in descending order
    if (b.tickets !== a.tickets) {
      return b.tickets - a.tickets;
    }
    // Sort by departure time in descending order
    const aDepartureTime = new Date(a.departureTime);
    const bDepartureTime = new Date(b.departureTime);
    return bDepartureTime - aDepartureTime;
  });

  return (
    <div>
      <h1>Train Schedule</h1>
      <Button variant="contained" onClick={() => setPage('singleTrain')}>
        View Single Train
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Train Name</TableCell>
            <TableCell>Departure Time</TableCell>
            <TableCell>Seats Available</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTrains.map(train => (
            <TableRow key={train.id}>
              <TableCell>{train.name}</TableCell>
              <TableCell>{train.departureTime}</TableCell>
              <TableCell>{train.seatsAvailable}</TableCell>
              <TableCell>{train.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrainSchedule;