import React from 'react';
import './App.css';
import { getCategories } from './services/api';

function App() {
  console.log(getCategories());
  return <p>Project</p>;
}

export default App;
