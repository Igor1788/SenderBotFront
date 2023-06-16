import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [data, setData] = useState({
    segmento: '',
    produto: '',
    descricao: '',
    preco: '',
    cupom: '',
    link: '',
    imagem: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://senderbot.onrender.com/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

        
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log('Data registered successfully');
        setErrorMessage('');
      } else {
        setErrorMessage(responseData.message || 'Error registering data');
      }
    } catch (error) {
      setErrorMessage('An error occurred while registering the data.');
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name='segmento' value={data.segmento} onChange={handleChange} placeholder='Segmento' required />
      <input name='produto' value={data.produto} onChange={handleChange} placeholder='Produto' required />
      <input name='descricao' value={data.descricao} onChange={handleChange} placeholder='Descrição' required />
      <input name='preco' value={data.preco} onChange={handleChange} placeholder='Preço' required />
      <input name='cupom' value={data.cupom} onChange={handleChange} placeholder='Cupom' required />
      <input name='link' value={data.link} onChange={handleChange} placeholder='Link' required />
      <input name='imagem' value={data.imagem} onChange={handleChange} placeholder='Imagem' required />
      <button type='submit'>Enviar</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
};

export default Form;
