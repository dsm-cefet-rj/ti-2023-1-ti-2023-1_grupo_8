import React, { useState } from 'react';
import './Form.css';


//formulário para adicionar novas mesas

function Form(props) {
  const [cadeiras, setCadeiras] = useState('');

  const handleChange = (event) => {
    setCadeiras(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(cadeiras);
    setCadeiras('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="cadeiras">Número de cadeiras:</label>
      <input
        type="number"
        id="cadeiras"
        value={cadeiras}
        onChange={handleChange}
      />
      
      <button type="submit">Adicionar mesa</button>
    </form>
  );
}

export default Form;
