import './App.css';
import React from 'react';
import axios from 'axios';







function App() {

  const [classHash, setClassHash] = React.useState();
  const [TotalReactPackages, setTotalReactPackages] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState();




  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(classHash);

    axios.get("http://alpha4.starknet.io/feeder_gateway/get_class_by_hash?classHash=" + classHash)
    .then(response => setTotalReactPackages(response.data));
    console.log(TotalReactPackages);
 

  }


  return (
    <div className="App">
      <header className="App-header">
      <h1> Starknet Class Library Query</h1>
      <form onSubmit={handleSubmit}>
      <p>What is contract classes https://docs.starknet.io/docs/Contracts/contract-classes/</p>
      <input
        type="text"
        name="classhash"
        placeholder="Enter a class hash"
        value={classHash}
        onChange={(e) => setClassHash(e.target.value)}

      />
      <button type="submit">
        Query
      </button>
    </form>
{/*
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Type Class or Library Address" variant="outlined" />
      <Button className="queryButton" variant="contained">Query</Button>
       </Box>
       <Box sx={{ width: '70%', paddingTop:'5ch' }}>
      <Stack spacing={2}>
        <Item>Contructor(parameterOne: felt, parameterTwo: felt, parameterThree: felt, parameterFour: felt)</Item>
        <Item>@external MultiplyTwoNums(firstNumber: felt, secondNumber: felt) -> (result: felt)</Item>
        <Item>@external SubtractTwoNums(firstNumber: felt, secondNumber) -> (result: felt)</Item>
        <Item>@external AddTwoNums(parameterOne: felt, parameterTwo: felt) -> (result: felt)</Item>
        <Item>@view SupportsInterface(interfaceId: felt) -> (success: felt)</Item>
      </Stack>
    </Box>
    */}
      </header>
      
  
    
    </div>
  );
}

export default App;
