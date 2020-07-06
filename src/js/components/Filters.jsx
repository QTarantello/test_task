import React from 'react';
import './Filters.css';

export const Filters = (props) => {
    const { onChange, value } = props;

    return (
        <div styleName="search">
            <form>
            <label>Search</label>
            <input type="text" styleName="form-control" onChange={onChange} value={value}/>
            </form>
        </div>
    );
}
