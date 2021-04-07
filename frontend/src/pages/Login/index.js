import React,{useState} from 'react';

export default function Login({history}){
    const [name, setName] = useState('');

    async function handleSubmit(event){
        event.preventDefault();
        localStorage.setItem('userName', name);
        history.push('/dashboard')
    }

    return (
      <>
        <p>
          <strong>Login</strong>
        </p>
        <form onSubmit ={handleSubmit} >
            <label htmlFor="nome">Name *</label>
            <input 
            id="nome"  
            placeholder="Seu nome" 
            value ={name}
            onChange ={event => setName(event.target.value)}/>
            <button className="submit btn">Entrar</button>
        </form>
       </>  
    )
}