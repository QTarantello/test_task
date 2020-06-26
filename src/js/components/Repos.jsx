import React from "react";

export const Repos = (props) => {
    const { click, repo } = props;
    const link = 'http://' + repo.git_url.slice(4)

    return (
    <ul> 
        <li key={repo.id} onClick={click}>
            {repo.name} | {repo.stargazers_count} | {repo.updated_at}
        </li>
        <a href={link}>Link</a>
    </ul>
    )
}