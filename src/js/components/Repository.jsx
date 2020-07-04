import React from 'react';
import "./Repository.css";
import axios from "axios";
import _ from "lodash";

export const Repository = (props) => {
    const { repository, changeIsList } = props;
    const { 
      name, 
      stargazers_count, 
      updated_at, 
      description, 
      owner, 
      languages_url, 
      contributors_url 
    } = repository;

    const [lang, setLang] = React.useState([]);
    const [contributors, setContributors] = React.useState([])

    const login = owner.login;
    const avatar = owner.avatar_url;
    const date = updated_at.slice(0, -10)
    const time = updated_at.slice(11, 19)
    const finalDate = date + ' ' + `(${time})`;
  
    React.useEffect(() => {
      const fetchLang = async () => {
        const resLang = await axios.get(languages_url);
        const data = resLang.data;
        const languages = Object.keys(data);
        setLang(languages);
      } 
      fetchLang();
  }, [])

  React.useEffect(() => {
    const fetchContr = async () => {
      const resContr = await axios.get(contributors_url)
      const data = resContr.data;
      const result = []
      for (let i = 0; i < 10; i++) {
        result.push(data[i])
      }
      setContributors(result)
    } 
    fetchContr();
}, [])

    const onClick = (e) => {
      changeIsList(true)
    }

    const languages = lang.map(item => (
      <ul>
        <li>{item}</li>
      </ul>
    ))

    const titleForLang = lang.length === 0 ? null : <h3>Languages</h3>;

    const contributor = contributors.map(item => (
      <ul>
        <li>{item.login}</li>
      </ul>
    ))
  
    return (
      <div>
        <button className="back" onClick={onClick}>Back</button>
          <h1 styleName='title'>{name}</h1>
          <div>{login}</div>
        <div styleName='mainInfo'>
          <div styleName='score'>
          <img src="images/star.png" styleName='star'></img>
            {stargazers_count}
            </div>
          <div styleName='commit'>Last commit: {finalDate}</div>
      </div>
      <div styleName='owner'>
          <div><img src={avatar} styleName='avatar'></img></div>
          <div styleName='languages'>
          {titleForLang}
          {languages}</div>
          <div styleName='contributor'>
            <h3>Contributors</h3>
            {contributor}
            </div>
            <div styleName='description'>
              {description}
            </div>
      </div>
      </div>
    );
  }

