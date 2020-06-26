import React from 'react';

export const Filters = (props) => {
    const { onChange, value } = props;

        return (
            <div className="filters">
                <div className="alert shadow">
                    <form>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-5">
                                    <label>Title</label>
                                    <input type="text" className="form-control" onChange={onChange} value={value}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
}
