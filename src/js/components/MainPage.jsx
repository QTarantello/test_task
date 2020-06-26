import React, { useState } from "react";
import axios from "axios";
import { Repos } from "./Repos.jsx"
import { Pagination } from './Pagination.jsx'
import { Filters } from './Filters.jsx'


const apiBaseUrl = "https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&order=desc&";

const Repository = (props) => {
  const { repository } = props;
  const { name, id } = repository;

  return (
    <div className="repository">
      <button className="back">Back</button>
        <div>{name}</div>
        <div>{id}</div>
    </div>
  );
}

export const MainPage = () => {
  
  const [repos, setRepos] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [reposPerPage] = React.useState(10);
  const [isList, changeIsList] = React.useState(true);
  const [id, setId] = React.useState(0);
  const [title, setTitle] = React.useState('');
  const [filteredRepos, setFilteredRepos] = React.useState([])

  console.log(repos)

  React.useEffect(() => {
    const fetchRepos = async () => {
      const res = await axios.get(apiBaseUrl);
      setRepos(res.data.items);
    } 
  fetchRepos();
}, [])

React.useEffect(() => {
  setFilteredRepos(repos.filter(repo => {
    return repo.name.toLowerCase().includes(title.toLowerCase())
  }))
}, [title, repos])

const indexOfLastRepo = currentPage * reposPerPage;
const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

const paginate = (pageNumber) => setCurrentPage(pageNumber);

const repositories = repos.map(repository => (
  <Repository repository={repository} key={repository.id}/>
))

const handleClick = (id) => (event) => {
  setId(`${id}`)
  changeIsList(false);
}

const onChange = (value) => (event) => {
  setTitle(event.target.value)
}

const mainPage = (
      <div className="repos">
        <h1>Main Page</h1>
        <Filters onChange={onChange(title)} value={title}/>
        {currentRepos.map(repo => (
          <Repos 
          repo={repo} 
          click={handleClick(repo.id)} 
          />
        ))}
        <Pagination reposPerPage={reposPerPage} totalRepos={repos.length} paginate={paginate} />
      </div>
    )

const mainPageWithFilter = (
  <div className="repos">
        <h1>Main Page</h1>
        <Filters onChange={onChange(title)} value={title}/>
        {filteredRepos.map(repo => (
          <Repos 
          repo={repo} 
          click={handleClick(repo.id)} 
          />
        ))}
      </div>
)

if (isList === true && title === '') {
  return mainPage;
} else if (isList === true && title !== '') {
  return mainPageWithFilter
} else if (isList === false) {
  return repositories.find(element => id === element.key);
 }
}
