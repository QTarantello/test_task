import React from "react";

export const Repos = (props) => {
    const { repos } = props;

    return (
        <ul> 
        {repos.map(repo => (
            <li key={repo.id}>{repo.name}</li>
        ))}
        </ul>
    )
}