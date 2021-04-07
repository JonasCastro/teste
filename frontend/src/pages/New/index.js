import React,{useState,useMemo} from 'react';
import api from '../../services/api';
import './styles.css';

export default function New({history}){
    const [thumbnail,setThumbnail] = useState(null);

    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData();
        data.append('thumbnail',thumbnail);
        await api.post('/files',data);
        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="file" 
                onChange={event => setThumbnail(event.target.files[0])} 
                />
            <button type="submit" className="btn" >Enviar</button>
        </form>
    )
}