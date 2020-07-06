import React from "react";
import axios from "axios";
import { ListOfRepos } from "./ListOfRepos.jsx"
import { Pagination } from './Pagination.jsx'
import { Filters } from './Filters.jsx'
import { Repository } from './Repository.jsx'
import "./MainPage.css"

const apiBaseUrl = "https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&order=desc&";

export const MainPage = () => {
  
  const [repos, setRepos] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(
    localStorage.getItem('pageNumberLocalStorage' || 1)
  );
  const [reposPerPage] = React.useState(10);
  const [isList, changeIsList] = React.useState(
    true
  );
  const [id, setId] = React.useState(0);
  const [title, setTitle] = React.useState(
    localStorage.getItem('titleLocalStorage' || '')
  );
  const [filteredRepos, setFilteredRepos] = React.useState([])

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

React.useEffect(() => {
  localStorage.getItem('titleLocalStorage', title)
  localStorage.getItem('pageNumberLocalStorage', currentPage)
}, [title, currentPage])

const indexOfLastRepo = currentPage * reposPerPage;
const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
  localStorage.setItem('pageNumberLocalStorage', pageNumber);
}

const handleClick = (id) => (event) => {
  setId(`${id}`)
  changeIsList(false);
}

const onChange = (value) => (event) => {
  setTitle(event.target.value)
  localStorage.setItem('titleLocalStorage', event.target.value)
}

const repositories = repos.map(repository => (
  <Repository repository={repository} key={repository.id} changeIsList={changeIsList}/>
))

const listOfElements = (
  <div>
      <h1>Top GitHub Repositories</h1>
      <Filters onChange={onChange(title)} value={title}/>
      {currentRepos.map(repo => (
      <ListOfRepos key={repo.id} repo={repo} click={handleClick(repo.id)}/>
    ))}
      <Pagination reposPerPage={reposPerPage} totalRepos={repos.length} paginate={paginate} activePage={currentPage} />
  </div>
)

const listOfElementsWithFilter = (
  <div>
      <h1>Top GitHub Repositories</h1>
      <Filters onChange={onChange(title)} value={title}/>
      {filteredRepos.map(repo => (
      <ListOfRepos key={repo.id} repo={repo} click={handleClick(repo.id)}/>
    ))}
  </div>
)

if (isList === true && title === '') {
  return listOfElements;
} else if (isList === true && title !== '') {
  return listOfElementsWithFilter;
} else if (isList === false) {
  return repositories.find(element => id === element.key);
 }
}
