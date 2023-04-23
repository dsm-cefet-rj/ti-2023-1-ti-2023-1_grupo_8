import React, { useState } from 'react';
import Button from './button';
import { useHistory } from 'react-router-dom';

const EditMesa = ({ mesa, handleMesaEdit }) => {
  const [formValues, setFormValues] = useState({
    garcom: mesa.garcom,
    lugares: mesa.lugares,
    ocupada: mesa.ocupada,
  });

  const history = useHistory();

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMesaEdit({ ...mesa, ...formValues });
    history.push(`/mesa/${mesa.id}`);
  };

  return (
    <div className="edit-mesa-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="garcom">Garçom:</label>
          <input
            type="text"
            name="garcom"
            id="garcom"
            value={formValues.garcom}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lugares">Lugares:</label>
          <input
            type="number"
            name="lugares"
            id="lugares"
            value={formValues.lugares}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ocupada">Ocupada:</label>
          <select
            name="ocupada"
            id="ocupada"
            value={formValues.ocupada}
            onChange={handleChange}
          >
            <option value={true}>Sim</option>
            <option value={false}>Não</option>
          </select>
        </div>
        <div className="buttons-container">
          <Button type="submit">Salvar</Button>
          <Button onClick={() => history.goBack()}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
};

export default EditMesa;
