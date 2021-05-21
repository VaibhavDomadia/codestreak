import React from 'react';
import './SortBy.css';

import AscendingIcon from '../../Icons/caret-up-solid-white.svg';
import DescendingIcon from '../../Icons/caret-down-solid-white.svg';

const SortBy = (props) => {
    const { values, order, selected, setSelected } = props;
    return (
        <div className='SortBy-Container'>
            <div className='SortBy-Title'>Sort By:</div>
            <div className='SortBy-Values-Container'>
                {
                    values.map(value => {
                        let renderValue = (
                            <div key={value} className='SortBy-Value' onClick={event => setSelected(value)}>
                                {value}
                            </div>
                        )
                        if(value === selected) {
                            renderValue = (
                                <div key={value} className='SortBy-Value SortBy-Value-Selected' onClick={event => setSelected(value)}>
                                    {value}
                                    {
                                        order === 0 ?
                                        <img src={AscendingIcon} alt='Up' className='SortBy-Value-Icon'></img> :
                                        <img src={DescendingIcon} alt='Down' className='SortBy-Value-Icon'></img>
                                    }
                                </div>
                            )
                        }
                        return renderValue;
                    })
                }
            </div>
        </div>
    )
}

export default SortBy;