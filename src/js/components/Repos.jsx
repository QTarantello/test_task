import React from "react";
import './Repos.css';

export const Repos = (props) => {
    const { click, repo } = props;
    const link = 'http://' + repo.git_url.slice(4)
    const date = repo.updated_at.slice(0, -10)
    const time = repo.updated_at.slice(11, 19)
    const finalDate = date + ' ' + `(${time})`;

    return (
    <ul>
        <div styleName='item'>
        <li key={repo.id}>
        <div styleName='name' onClick={click}>{repo.name}</div>
            <div styleName='elements'>
            <div>
            <a id='link' href={link}>
               <img src="images/github.jpg" styleName='github'></img>
            </a>
            </div>
                <div styleName='score'>
                <img src="images/star.png" styleName='star'></img>
                    {repo.stargazers_count}
                </div>
                <div styleName='commit'>Last commit: {finalDate}</div>
            </div>
        </li>
        </div>
    </ul>
    )
}