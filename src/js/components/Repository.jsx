import React from 'react';
import "./Repository.css";

export const Repository = (props) => {
    const { repository, changeIsList } = props;
    const { name, id, stargazers_count, updated_at } = repository;
  
    const onClick = (e) => {
      changeIsList(true)
    }
  
    return (
      <div styleName='repository'>
        <button className="back" onClick={onClick}>Back</button>
          <div>{name}</div>
          <div>{id}</div>
          <div>{stargazers_count}</div>
          <div>{updated_at}</div>
      </div>
    );
  }

