import React, {useState, useEffect} from "react";
import { Container, Owner, Loading, BackButton, IssuesList, PagesList, FilterList } from "./style";
import api from "../../services/api";
import {FaSpinner, FaArrowLeft} from 'react-icons/fa'



export default function Repositorio({match}){

    const [ repositorio, setRepositorio ] = useState({});
    const [ issues, setIssues ] = useState([]) 
    const [loading, setLoading] = useState(true) 
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState([
        {state: 'all', label: 'Todas', active: true},
        {state: 'open', label: 'Abertas', active: false},
        {state: 'closed', label: 'Fechadas', active: false}
    ])
    const [filterIndex, setFilterIndex] = useState(0)

    useEffect(() => {

        async function load(){
            
            const nomeRepo = decodeURIComponent(match.params.repositorio)
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params:{
                        status: filters.find(f => f.active).state,
                        per_page: 5
                    }
                })
            ])
            
            setRepositorio(repositorioData.data)
            setIssues(issuesData.data)
            console.log(issuesData.data)
            setLoading(false)
            
        }
        
        load()
        
        
    }, [match.params.repositorio, filters])
    
    
   
    useEffect(() => {
        
        async function loadIssue(){
            const nomeRepo = decodeURIComponent(match.params.repositorio)
            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params: {
                    state: filters[filterIndex].state,
                    page,
                    per_page: 5,
                }
            });
            setIssues(response.data) 
            
        }
 
        loadIssue()
 
    }, [filterIndex, match.params.repositorio, page, filters])
 
 
    function handlePage(action){
        setPage(action === 'back' ? page - 1 : page + 1)
    }

    function handleFilter(index){
        setFilterIndex(index)
    }
    
    
   

        if(loading){
            return(
                <Loading>
                    <h1>Carregando</h1>
                    <FaSpinner size={24}/>
                </Loading>
            )
        }

    return(
        <Container>
            <BackButton to="/">
                <FaArrowLeft size={20}/>
            </BackButton>
            <Owner>
                <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login}/>
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
            </Owner>

            <FilterList active={filterIndex}>
                {filters.map((filter, index)=>{
                    return(
                        <button type="button" key={filter.label} onClick={() => handleFilter(index)}>
                            {filter.label}
                        </button>
                    )
                })}
            </FilterList>

            <IssuesList>
                {issues.map(issue => {
                    return(
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login}/>
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => {
                                        return(
                                            <span key={String(label.id)}>{label.name}</span>
                                        )
                                    })} 
                                </strong>
                                <p>User: {issue.user.login}</p>
                            </div>
                        </li>
                    )
                })}
            </IssuesList>
            <PagesList>
                <button type="button" onClick={() => handlePage('back')} disabled={page < 2}>Voltar</button>
                <button type="button" onClick={() => handlePage('next')}>Proximo</button>
            </PagesList>
        </Container>
    )
}