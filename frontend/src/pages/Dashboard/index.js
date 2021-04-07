import React,{useEffect,useState,useMemo} from 'react';
import api from '../../services/api'
import socketio from 'socket.io-client';
import './styles.css';
import { FiTrash2 } from 'react-icons/fi';

export default function Dashboard(){
    const [thumbnail,setThumbnail] = useState(null);
    const [files, setFile] =  useState([]);
    const [inputKey, setInputKey] =  useState('qwe');
    
    const userName = localStorage.getItem('userName');
    
    const socket = useMemo(() => socketio('http://localhost:3333', { transports : ['websocket'] }),[userName]);
   
    useEffect(()=>{
        socket.on('update-files', ({nameFiles}) =>{
            console.log('update-files', nameFiles);
            setFile(nameFiles)
        })
    }, [files, socket]);

    useEffect(()=>{
        async function loadFiles(){
            const response = await api.get('/name-files');
            console.log(response.data);
            setFile(response.data)
        }
        loadFiles();
    },[]);

    async function handleSubmit(event){
        event.preventDefault();
        event.target.value = null;
        const data = new FormData();
        data.append('thumbnail',thumbnail);
        const result = await api.post('/files',data);
        setFile(result.data)
        setThumbnail(null)
        setInputKey(Math.random().toString(36))
    }

    async function handleDelete(file){
        console.log(file);
        const result = await api.delete(`/files/${file}`);
        setFile(result.data)
    }

    return (
        <>
            <h1>Hi, {userName}</h1>
            <p>Seus arquivos:</p>
            <ul >
                {files.map(file => (
                    <li key={file}>
                      {file}
                      <button onClick={()=>handleDelete(file)} ><FiTrash2 /></button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
            <input 
                type="file" 
                onChange={event => setThumbnail(event.target.files[0])} 
                key={inputKey || '' }
                />
            <button type="submit" className="btn" >Enviar</button>
            </form>
        </>
    )
    
}