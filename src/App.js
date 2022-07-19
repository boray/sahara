import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
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
      </header>
      
  
    
    </div>
  );
}

export default App;
