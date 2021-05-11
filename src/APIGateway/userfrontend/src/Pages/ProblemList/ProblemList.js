import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProblemList.css';
import ProblemTile from '../../Components/Problem/ProblemTile/ProblemTile';
import Pagination from '../../Components/Pagination/Pagination';
import { useHistory } from 'react-router';

const ProblemList = (props) => {
    const [problems, setProblems] = useState([]);
    const [numberOfProblems, setNumberOfProblems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const problemsPerPage = 10;
    const history = useHistory();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get(`/api/problems?page=${currentPage}`);
                const problems = response.data.problems;
                const totalNumberOfProblems = response.data.totalNumberOfProblems;
                
                setNumberOfProblems(totalNumberOfProblems);
                setProblems(problems);
            }
            catch(error) {
                if(error.response.status === 500) {
                    history.replace('/500');
                }
                else {
                    history.replace('/404');
                }
            }
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