import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import LogIn from './components/LogIn';
import FormContent from './components/FormContent';


function App() {
  const stateForm = useSelector(state => state.form);
  const stateSignIn= useSelector(state => state.signIn);
  useEffect(() => {
  }, [stateForm, stateSignIn]);
  return (
    <div className="App">
      {!stateSignIn && (
          <LogIn />
      )}
      {stateSignIn && (
          <FormContent />
      )}
    </div>
  );
}

export default App;
