import React from "react";

export const Repos = (props) => {
    const { click, repo } = props;

    return (
    <ul> 
        <li key={repo.id} onClick={click}>{repo.name}</li>
    </ul>
    )
}