import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProblemList.css';
import ProblemTile from '../../Components/Problem/ProblemTile/ProblemTile';
import Pagination from '../../Components/Pagination/Pagination';

const ProblemList = (props) => {
    const [problems, setProblems] = useState([]);
    const [numberOfProblems, setNumberOfProblems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const problemsPerPage = 2;

    useEffect(() => {
        const fetchProblems = async () => {
            const response = await axios.get(`/api/problems?page=${currentPage}`);
            const problems = response.data.problems;
            const totalNumberOfProblems = response.data.totalNumberOfProblems;
            
            setNumberOfProblems(totalNumberOfProblems);
            setProblems(problems);
        }
        fetchProblems();
    }, [currentPage]);

    let renderProblems = null;
    if(problems) {
        renderProblems = (
            <div className='ProblemList-Container'>
                <h2 className='ProblemList-Header'>Problems</h2>
                {
                    problems.map(problem => {
                        return <ProblemTile key={problem._id} problem={problem}/>
                    })
                }
                <Pagination 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    numberOfItems={numberOfProblems}
                    itemsPerPage={problemsPerPage}/>
            </div>
        )
    }

    return renderProblems;
}

export default ProblemList;