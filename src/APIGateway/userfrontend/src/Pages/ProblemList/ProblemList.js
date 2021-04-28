import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProblemList.css';
import ProblemTile from '../../Components/Problem/ProblemTile/ProblemTile';
import Previous from '../../Icons/less-than-solid.svg';
import Next from '../../Icons/greater-than-solid.svg';

const ProblemList = (props) => {
    const [problems, setProblems] = useState([]);
    const [numberOfProblems, setNumberOfProblems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const problemsPerPage = 2;
    const lastPage = Math.ceil(numberOfProblems/problemsPerPage);

    useEffect(() => {
        const fetchProblems = async () => {
            const response = await axios.get(`/api/problems?page=${currentPage}`);
            console.log(response.data);
            const problems = response.data.problems;
            const totalNumberOfProblems = response.data.totalNumberOfProblems;
            
            setNumberOfProblems(totalNumberOfProblems);
            setProblems(problems);
        }
        fetchProblems();
    }, [currentPage]);

    const goToNextProblems = () => {
        if(currentPage !== lastPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    const goToPreviosProblems = () => {
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <div className='ProblemList-Container'>
            <h2 className='ProblemList-Header'>Problems</h2>
            {
                problems.map(problem => {
                    return <ProblemTile key={problem._id} problem={problem}/>
                })
            }
            <div className='ProblemList-Pagination-Container'>
                <div className='ProblemList-Pagination-Button' onClick={goToPreviosProblems}>
                    <img src={Previous} className='ProblemList-Pagination-Icon' alt='Previos'></img>
                </div>
                <div className='ProblemList-Pagination-CurrentPage'>
                    {currentPage}
                </div>
                <div className='ProblemList-Pagination-Button' onClick={goToNextProblems}>
                    <img src={Next} className='ProblemList-Pagination-Icon' alt='Next'></img>
                </div>
            </div>
        </div>
    )
}

export default ProblemList;