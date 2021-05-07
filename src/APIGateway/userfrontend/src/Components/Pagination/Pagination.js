import React from 'react';
import './Pagination.css';
import Previous from '../../Icons/less-than-solid.svg';
import Next from '../../Icons/greater-than-solid.svg';

const Pagination = (props) => {
    const { currentPage, setCurrentPage, numberOfItems, itemsPerPage } = props;

    const lastPage = Math.ceil(numberOfItems/itemsPerPage);

    const goToNextPage = () => {
        if(currentPage !== lastPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    const goToPreviosPage = () => {
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <div className='Pagination-Container'>
            <div className='Pagination-Button' onClick={goToPreviosPage}>
                <img src={Previous} className='Pagination-Icon' alt='Previos'></img>
            </div>
            <div className='Pagination-CurrentPage'>
                {currentPage}
            </div>
            <div className='Pagination-Button' onClick={goToNextPage}>
                <img src={Next} className='Pagination-Icon' alt='Next'></img>
            </div>
        </div>
    )
}

export default Pagination;