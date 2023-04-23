import React, {useState} from 'react';
import Button from './button';

const AddMesa = ({handleMesaAddition}) => {
    
    const [inputData, setInputData] = useState('');//inicializa o campo de texto vazio
    const handleInputChange = (e) => {
        setInputData(e.target.value);//pega o valor do campo de texto
    };
    
    const handleAddMesaClick = () => {
        handleMesaAddition(inputData);//pega o valor do campo de texto
        setInputData("");//limpa o campo de texto
    };
    
    return ( 
      
        <div className='add-mesa'>

            <input 
            onChange={handleInputChange}
            value={inputData}
            type="text"
            />;
            

            <div>
            <Button onClick={handleAddMesaClick}>Adicionar Mesa</Button>
            </div>


        </div>
     );
};
 
export default AddMesa;