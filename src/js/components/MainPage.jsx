import React, { useState } from "react";
import axios from "axios";
import { Repos } from "./Repos.jsx"
import { Pagination } from './Pagination.jsx'
import _ from 'lodash';


const apiBaseUrl = "https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&order=desc&";

const Repository = (props) => {
  const { repository } = props;
  const { name, id } = repository;

  return (
    <div className="repository">
        <div>{name}</div>
        <div>{id}</div>
    </div>
  );
}

export const MainPage = () => {
  
  const [repos, setRepos] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [reposPerPage] = React.useState(10);
  const [isList, changeIsList] = React.useState(true)
  const [id, setId] = React.useState(0)

  React.useEffect(() => {
    const fetchRepos = async () => {
      const res = await axios.get(apiBaseUrl);
      setRepos(res.data.items);
    } 
  fetchRepos();
}, [])

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

const mainPage = (
      <div className="repos">
        <h1>Main Page</h1>
        {currentRepos.map(repo => (
          <Repos repo={repo} click={handleClick(repo.id)} />
        ))}
        <Pagination reposPerPage={reposPerPage} totalRepos={repos.length} paginate={paginate} />
      </div>
    )

if (isList === true) {
  return mainPage;
} else {
  return repositories.find(element => id === element.key);
 }
}
