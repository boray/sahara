import './App.css';
import React from 'react';
import axios from 'axios';




function App() {

  const [classHash, setClassHash] = React.useState();
  const [Response, setResponse] = React.useState([]);
  const [functionsArray, setFunctionsArray] = React.useState([]);
  const [structsArray, setStructsArray] = React.useState([]);
  const [eventsArray, setEventsArray] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(classHash);
    axios.get("http://alpha4.starknet.io/feeder_gateway/get_class_by_hash?classHash=" + classHash)
    .then(response => {
      setResponse(response.data.abi);
      seperateObjects(response.data.abi);
      console.log(response.data.abi);
    })
    .catch(err => {
        console.log(err);
        return null;
    });

  }

  const getABI = async () => {

      const response = await axios.get("http://alpha4.starknet.io/feeder_gateway/get_class_by_hash?classHash=" + classHash);
      setResponse(response.data.abi);
   

  }
  function seperateObjects(array) {
    let functions = [];
    let structs = [];
    let events = [];
    for(let i = 0; i< array.length; i++){
      if(array[i].type === "function"){
        functions.push(array[i]);
      }
      else if(array[i].type === "event"){
        events.push(array[i]);
      }
      else if(array[i].type === "struct"){
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
      <h1> <a href="https://github.com/boray/sahara">Sahara</a>: Starknet Contract Class Visualizer</h1>
      <form onSubmit={handleSubmit}>
      <input
        className="queryField"
        type="text"
        name="classhash"
        placeholder="Enter a class hash"
        value={classHash}
        onChange={(e) => setClassHash(e.target.value)}/>

      <button type="submit">
        Query
      </button>
    </form>

    </header>
  {Response.length > 0 && 
    <div className="result">
   
    {structsArray.length > 0 && <h3>Structs</h3>}
    {structsArray.length > 0 &&(
    <ul>
   {structsArray.map(item =>(
    <li>
  
      
      {item.name}(
    
    
    {
    item.members.map((data,i) =>(
      <>{i > 0 && <>,</>} {data.name}: {data.type}</> 
    ))
    }
    )


    </li>
   ))}
   </ul>
    )}

{eventsArray.length > 0 && <h3>Events</h3>}
{eventsArray.length > 0 &&(
    <ul>
   {eventsArray.map(item =>(
    <li>
  
      
      {item.name}(
    
    
    {
    item.data.map((data,i) =>(
      <>{i > 0 && <>,</>} {data.name}: {data.type}</> 
    ))
    }
    )


    </li>
   ))}
   </ul>
    )}

   {functionsArray.length > 0 && <h3>Functions</h3>} 
   {functionsArray.length > 0 &&(
    <ul>
   {functionsArray.map(item =>(
    <li>
    {
      item.hasOwnProperty("stateMutability") && (
        
          <>@{item.stateMutability} </>
       
      )
    }
      
      {item.name}(
    
    
    {
    item.inputs.map((input,i) =>(
      <>{i > 0 && <>,</>} {input.name}: {input.type}</> 
    ))
    }
      )

-> (
    {
    item.outputs.map((output,i) =>(
      <>{i > 0 && <>,</>} {output.name}: {output.type}</>
    ))
    }

)

    </li>
   ))}
   </ul>
    )}

</div>
}
    </div>
  );
}


export default App;
