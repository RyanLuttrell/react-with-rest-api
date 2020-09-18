import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom';

export default ({context}) => {
  
//Simple component that sends the user back to the home root when they sign out
  useEffect(() => context.actions.signOut());
  return (
    <Redirect to='/' />
  );
}