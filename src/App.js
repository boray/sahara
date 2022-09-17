import './App.css';
import React, { useEffect, Paper, FlatList,Text, Divider } from 'react';
import axios from 'axios';
import { getAllByTestId } from '@testing-library/react';
import { ListItem, ListItemText } from '@mui/material';



function App() {

  const [classHash, setClassHash] = React.useState();
  const [Response, setResponse] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState();
  const [items, setItems] = React.useState([]);
  const [functionsArray, setFunctionsArray] = React.useState([]);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(classHash);

    axios.get("http://alpha4.starknet.io/feeder_gateway/get_class_by_hash?classHash=" + classHash)
    .then(response => setResponse(response.data.abi));
    console.log(Response);
    setItems(Response);
    setFunctions(Response);

   //setItems(Response.abi);
   //console.log(items);
  }

  function setFunctions(array) {
    let functions = [];
    for(let i = 0; i< array.length; i++){
      if(array[i].type == "function"){
        functions.push(array[i]);
      }
    }
    setFunctionsArray(functions);
  }

  const renderABI = (event) => {
    event.preventDefault();
    
    
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
        onChange={(e) => setClassHash(e.target.value)}/>

      <button type="submit">
        Query
      </button>
    </form>
    <button onClick={renderABI}> Render </button>

   {functionsArray.length > 0 &&(
    <ul>
   {functionsArray.map(item =>(
    <li key={item.id}>{item.name} -- {item.type}
    {
    item.outputs.map(output =>(
     <p> <li key={output.id}>{output.name} - {output.type}</li></p>
    ))
    }
    {
    item.inputs.map(input =>(
     <p> <li key={input.id}>{input.name} - {input.type}</li></p>
    ))
    }
    {
      item.hasOwnProperty("stateMutability") && (
        <p>
          {item.stateMutability}
        </p>
      )
    }
    </li>
   ))}
   </ul>
    )}

   {/* 
<Paper>
   {items.map((object) => (
<List key={object.id}>
  <ListItem alignItems="flex-start">
    <ListItemText
      primary={object.key.name}
      secondary={object.key.type}/>  
  </ListItem>
  <Divider variant="inset" component="li"/>
</List>

   ))}
</Paper>

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
