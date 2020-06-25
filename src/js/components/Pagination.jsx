import React from 'react';

export const Pagination = (props) => {
    const { reposPerPage, totalRepos, paginate } = props;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRepos / reposPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul> 
        {pageNumbers.map(number => (
            <li onClick={() => paginate(number)} key={number}>
                {number}
            </li>
        ))}
        </ul>
    )
}