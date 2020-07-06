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
            page: activePage !== number,
            "active": activePage === number,
          });
          
        return (
        <div styleName={classStyle}> 
            <li key={number} onClick={() => paginate(number)}>
                {number}
            </li>
        </div>
        )
    })

    return (
    <div styleName="pagination">
        <ul> 
       {mapedPage}
        </ul>
    </div>
    )
}