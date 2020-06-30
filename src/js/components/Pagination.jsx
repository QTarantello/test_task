import React from 'react';
import "./Pagination.css";
import cn from 'classnames';

export const Pagination = (props) => {
    const { reposPerPage, totalRepos, paginate, activePage } = props;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRepos / reposPerPage); i++) {
        pageNumbers.push(i);
    }

    const mapedPage = pageNumbers.map((number)=> {
        const classStyle = cn({
            page: true,
            "active-page": activePage === number,
          });
          
        const result = (
        <div styleName={classStyle}> 
        <li key={number} onClick={() => paginate(number)}>
            {number}
        </li>
        </div>
        )
        return result;
    })

    return (
    <div styleName="pagination">
        <ul> 
       {mapedPage}
        </ul>
    </div>
    )
}