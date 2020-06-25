import React from "react";
import axios from "axios";
import { Repos } from "./Repos.jsx"
import { Pagination } from './Pagination.jsx'

const apiBaseUrl = "https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&order=desc&";


export const MainPage = (props) => {

  const [repos, setRepos] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [reposPerPage] = React.useState(10);

  React.useEffect(() => {
    const fetchRepos = async () => {
      const res = await axios.get(apiBaseUrl);
      setRepos(res.data.items);
    } 
  fetchRepos();
}, [])

console.log(repos)

const indexOfLastRepo = currentPage * reposPerPage;
const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
const currentPosts = repos.slice(indexOfFirstRepo, indexOfLastRepo);

const paginate = (pageNumber) => setCurrentPage(pageNumber);

      
return (
      <div className="repos">
        <h1>Main Page</h1>
        <Repos repos={currentPosts} />
        <Pagination reposPerPage={reposPerPage} totalRepos={repos.length} paginate={paginate} />
      </div>
    )
}
