import React, {useState, useCallback, useEffect} from "react";
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash} from 'react-icons/fa'
import { Container, Form, SubmitButton, List, DeleteButton } from "./style";
import {Link} from 'react-router-dom';

import api from "../../services/api";

export default function Main(){

    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepostiorios] = useState([]);
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)
    
    // didMount Buscar

    useEffect(() => {
        const repoStorage = localStorage.getItem('repos');
        if(repoStorage){
            setRepostiorios(JSON.parse(repoStorage))
        }
    }, [])

    //didUpdate Salvar

    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios))
    }, [repositorios])


    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        async function submit(){
            setLoading(true)
            setAlert(null)
            try{

                if (newRepo === ''){
                    throw new Error('Indique um repositorio!')
                }

                
                const response = await api.get(`repos/${newRepo}`)

                const hasRepo = repositorios.find(repo => repo.name === newRepo)

                if(hasRepo){
                    throw new Error('Repositorio duplicado!')
                }
                
                const data = {
                    name: response.data.full_name
                }
            
                setRepostiorios([...repositorios, data]);
                setNewRepo('');
            }catch(error){
                setAlert(true)
                console.log(error)
            }finally{
                setLoading(false)
            }
        }

        submit()
        
    }, [newRepo, repositorios])

    function handleInputChange(e){
        setNewRepo(e.target.value)
        setAlert(null)
    }

    const handleDelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !== repo)
        setRepostiorios(find)
    }, [repositorios])

    return(
        <Container>
            <h1>
                <FaGithub size={25}/>
                Meus Repositórios
            </h1>
            <Form onSubmit={handleSubmit} error={alert}>
                <input type="text" placeholder="Adicionar repositórios" value={newRepo} onChange={handleInputChange}/>
                <SubmitButton loading={loading ? 1 : 0} >
                    {loading ? (
                        <FaSpinner color="FFF" size={14}/>
                    ) : (
                        <FaPlus color="#FFF" size={14}/>
                    )}
                </SubmitButton>
            </Form>

            <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={() => handleDelete(repo.name)}>
                                <FaTrash size={14}/>
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <Link to={`repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaBars size={28}/>
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    )
}