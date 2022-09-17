import './App.css';
import React, { useEffect, Paper, FlatList,Text, Divider } from 'react';
import axios from 'axios';
import { getAllByTestId } from '@testing-library/react';
import { ListItem, ListItemText } from '@mui/material';



function App() {

  const [classHash, setClassHash] = React.useState();
  const [Response, setResponse] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState();
  const [functionsArray, setFunctionsArray] = React.useState([]);
  const [structsArray, setStructsArray] = React.useState([]);
  const [eventsArray, setEventsArray] = React.useState([]);



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(classHash);

    axios.get("http://alpha4.starknet.io/feeder_gateway/get_class_by_hash?classHash=" + classHash)
    .then(response => setResponse(response.data.abi))
    console.log(Response);
    seperateObjects(Response);

   //setItems(Response.abi);
   //console.log(items);
  }

  function seperateObjects(array) {
    let functions = [];
    let structs = [];
    let events = [];
    for(let i = 0; i< array.length; i++){
      if(array[i].type == "function"){
        functions.push(array[i]);
      }
      else if(array[i].type == "event"){
        events.push(array[i]);
      }
      else if(array[i].type == "struct"){
        structs.push(array[i]);
      }
    }
    setFunctionsArray(functions);
    setEventsArray(events);
    setStructsArray(structs);

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

   {functionsArray.length > 0 &&(
    <ul>
   {functionsArray.map(item =>(
    <li key={item.id}>{item.name} -- {item.type}
    {
    item.outputs.map(output =>(
     <p> <li key={output.id}>{output.name} - {output.type}
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
    }</li></p>
    ))
    }
    
    </li>
   ))}
   </ul>
    )}

    </header>
    </div>
  );
}

export default App;
