import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { AuthContext } from '../../context/authContext';
import Input from '../Input/Input';


const emailReducer =(state, action) =>{
  
  if(action.type==='INPUT'){
    return({value:action.val, isValid: action.val.includes('@')})
  }
  if(action.type==='BLUR'){
    return({value:state.value, isValid: state.value.includes('@')})
  }
  return state
}

const passReducer =(state, action) =>{
  if(action.type==='INPUT'){
    return({value:action.val, isValid: action.val.trim().length > 6})
  }
  if(action.type==='BLUR'){
    return({value:state.value, isValid: state.value.trim().length > 6})
  }
  return state
}

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer,{
    value:'',
    isValid:false
  })
  const [passState, dispatchPass] = useReducer(passReducer,{
    value:'',
    isValid:false
  })
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const {isValid:emailValidity} = emailState
  const {isValid:passValidity} = passState
  const ctx = useContext(AuthContext)
  const emailInputRef = useRef()
  const passInputRef = useRef()



  // useEffect(() => {
  //   console.log('EFFECT RUNNING');

  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailValidity && passValidity
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailValidity,passValidity]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'INPUT',val:event.target.value})

    // setFormIsValid( event.target.value.includes('@') && passState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({type:'INPUT',val:event.target.value})

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPass({type:'BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passState.value);
    }
    else  if(!emailValidity){
      emailInputRef.current.focus()
    }
    else{
      passInputRef.current.focus()
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref = {emailInputRef}
          id = 'email'
          label = 'E-Mail'
          type = 'email'
          isValid = {emailValidity}
          value = {emailState.value}
          onChange = {emailChangeHandler}
          onBlur = {validateEmailHandler}
        />
        <Input
          ref = {passInputRef}
          id = 'password'
          label = 'password'
          type = 'password'
          isValid = {passValidity}
          value = {passState.value}
          onChange = {passwordChangeHandler}
          onBlur = {validatePasswordHandler}
        />
        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        {/* <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
