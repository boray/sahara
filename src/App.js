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

// WANTED BEHAVOUR
// struct structName(x: felt, y:felt, z: AnotherStruct)
// event eventName(x: felt, y: felt)
// @view function functionName(x : felt, y :felt) -> (a: felt, b:felt)


  return (
    <div className="App">
      <header className="App-header">
      <h1> Sahara: Starknet Contract Class Visualizer</h1>
      <form onSubmit={handleSubmit}>
      <p>Cairo 0.9 splitted the concepts of contract class and contract instance. By this, anyone can declare a contract class and anyone can deploy an instance of that contract class.</p>
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

    <div className="result">
      


   {functionsArray.length > 0 &&(
    <ol>
   {functionsArray.map(item =>(
    <li>
    {
      item.hasOwnProperty("stateMutability") && (
        
          <>@ {item.stateMutability} </>
       
      )
    }
      
      function {item.name}(
    
    
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
   </ol>
    )}


{eventsArray.length > 0 &&(
    <ol>
   {eventsArray.map(item =>(
    <li>
  
      
      event {item.name}(
    
    
    {
    item.data.map((data,i) =>(
      <>{i > 0 && <>,</>} {data.name}: {data.type}</> 
    ))
    }
    )


    </li>
   ))}
   </ol>
    )}

{structsArray.length > 0 &&(
    <ol>
   {structsArray.map(item =>(
    <li>
  
      
      struct {item.name}(
    
    
    {
    item.members.map((data,i) =>(
      <>{i > 0 && <>,</>} {data.name}: {data.type}</> 
    ))
    }
    )


    </li>
   ))}
   </ol>
    )}




</div>
    </div>
  );
}

export default App;
