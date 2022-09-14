import { Box, Button,  } from '@mui/material'
import React, {ChangeEvent, useState} from 'react'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [number, setNumber] = useState<string>('')
  // const [randomData, setRandomData] = useState<any[]>([])
  //console.log('asteroid-data',randomData)

  const changeHandler = (event : ChangeEvent<HTMLInputElement>) : void => {
    setNumber(event.target.value)
  }

  const navigation = useNavigate();

  const getRandomAsteroidId = async () => {

      const randomDetails = await axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=1dR1jtYSsWgBwOItLK2q21InJbzlb8XE6HNB3EzC');
      console.log('Random Details ', randomDetails)
      //setRandomData(randomDetails?.data?.near_earth_objects)
      let randomNumber = Math.floor((Math.random() * 20) + 1)
    const asteroidId = randomDetails?.data?.near_earth_objects[randomNumber].id
    console.log('Asteroid Id===>', asteroidId)
    onClickHandle(asteroidId)

  }

  const onClickHandle = async (asteroidId: string) => {
    const getRandomData =await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=1dR1jtYSsWgBwOItLK2q21InJbzlb8XE6HNB3EzC`);
    console.log('gettingradom Details ', getRandomData)
    await navigation('/random', {
            state: getRandomData?.data
      })
  }

  return (
    <Box sx={{display: 'flex', alignItems: "center", justifyContent: 'center', flexDirection: 'column', mt: 15 }}>
      <label htmlFor='number'> Enter Asteroid ID:</label>
      <input id='number' type='text' 
      value={number} name='number' 
      data-testid='number-input'
      onChange={changeHandler} 
      style={{width: 300,height:30}} />
      <Box sx={{mt: 4}}>
      <Button data-testid='number-button'  onClick={() => {onClickHandle(number)}} disabled={number.length < 1} sx={{border: '3px solid black', padding: 1, width: 125, borderRadius: 4, color:'black', mr: 2}} title='changeButton'  >Submit</Button>
       <Button onClick={getRandomAsteroidId} sx={{border: '3px solid black', padding: 1, width: 125, borderRadius: 4, color: 'black'}} data-testid='random-button'>Random </Button>
      </Box>
    </Box>
  )
}


export default Home
