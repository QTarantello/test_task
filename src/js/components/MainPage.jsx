import React from "react";
import axios from "axios";
import { ListOfRepos } from "./ListOfRepos.jsx";
import { Pagination } from './Pagination.jsx';
import { Filters } from './Filters.jsx';
import { Repository } from './Repository.jsx';
import "./MainPage.css";
import _ from "lodash";

const apiTopReposUrl = "https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&order=desc&page=1&per_page=10";

const apiBaseUrl = (query) => `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`;

const reposPerPage = 10;

export const MainPage = () => {

  const localStoragePageNumber = localStorage.getItem('pageNumberLocalStorage')
  const initinalStateForPage = localStoragePageNumber === null ? 1 : localStoragePageNumber;

  const localStorageTitle = localStorage.getItem('titleLocalStorage')
  const initinalStateForTitle = localStorageTitle === null ? '' : localStorageTitle;

  const [topRepos, setTopRepos] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(initinalStateForPage);
  const [isList, changeIsList] = React.useState(true);
  const [id, setId] = React.useState(null);
  const [title, setTitle] = React.useState(initinalStateForTitle);
  const [searchRepos, setSearchRepos] = React.useState([]);

  const fetchData = async (title) => {
    const res = await axios.get(apiBaseUrl(title));
    setSearchRepos(res.data.items);
  }

  const debounceLoadData = React.useCallback(_.debounce(fetchData, 1000), []);

  React.useEffect(() => {
    if (title !== '') {
      debounceLoadData(title)
    }
  }, [title])

  React.useEffect(() => {
    const fetchRepos = async () => {
      const res = await axios.get(apiTopReposUrl);
      setTopRepos(res.data.items);
    }
    fetchRepos()
  }, [])

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = searchRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem('pageNumberLocalStorage', pageNumber);
  }

  const handleClick = (id) => (event) => {
    setId(id)
    changeIsList(false);
  }


  const onChange = (value) => (event) => {
    setTitle(event.target.value)
    localStorage.setItem('titleLocalStorage', event.target.value)
  }

  if (isList && title === '') {
    return (
      <div>
        <h1>Top GitHub Repositories</h1>
        <Filters onChange={onChange(title)} value={title} />
        {topRepos.map(repo => (
          <ListOfRepos key={repo.id} repo={repo} click={handleClick(repo.id)} />
        ))}
      </div>
    );
  } else if (isList) {
    return (
      <div>
        <h1>Top GitHub Repositories</h1>
        <Filters onChange={onChange(title)} value={title} />
        {currentRepos.map(repo => (
          <ListOfRepos key={repo.id} repo={repo} click={handleClick(repo.id)} />
        ))}
        <Pagination reposPerPage={reposPerPage} totalRepos={searchRepos.length} paginate={paginate} activePage={currentPage} />
      </div>
    );
  } else if (title === '') {
    const repository = topRepos.find(repo => id === repo.id)
    return <Repository repository={repository} key={repository.id} changeIsList={changeIsList} />
  } else {
    const repository = currentRepos.find(repo => id === repo.id)
    return <Repository repository={repository} key={repository.id} changeIsList={changeIsList} />
  }
}