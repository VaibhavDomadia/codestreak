import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProblemList.css';
import ProblemTile from '../../Components/Problem/ProblemTile/ProblemTile';
import Pagination from '../../Components/Pagination/Pagination';
import { useHistory } from 'react-router';
import SortBy from '../../Components/SortBy/SortBy';
import TagInput from '../../Components/TagInput/TagInput';
import Select from '../../Components/Select/Select';

const ProblemList = (props) => {
    const [problems, setProblems] = useState([]);
    const [numberOfProblems, setNumberOfProblems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const problemsPerPage = 10;
    const history = useHistory();
    const [sortSelected, setSortSelected] = useState('Creation Time');
    const [sortOrder, setSortOrder] = useState(1);
    const [filterTags, setFilterTags] = useState([]);
    const [filterDifficulty, setFilterDifficulty] = useState('All');

    const onSortSelectedChange = (value) => {
        if(value === sortSelected) {
            setSortOrder(currentOrder => 1 - currentOrder);
        }
        else {
            setSortSelected(value);
            setSortOrder(1);
        }
    }

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                let sortBy = 'accessTime';
                if(sortSelected === 'Name') {
                    sortBy = 'name';
                }
                else if(sortSelected === 'Solved By') {
                    sortBy = 'solvedBy';
                }
                
                if(sortOrder === 1) {
                    sortBy = `-${sortBy}`;
                }

                let filterQuery = `difficulty=${filterDifficulty}`;
                if(filterTags.length !== 0) {
                    filterQuery += `&tags=${filterTags.join(',')}`
                }
                
                const response = await axios.get(`/api/problems?page=${currentPage}&sort=${sortBy}&${filterQuery}`);
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
    }, [currentPage, sortSelected, sortOrder, filterTags, filterDifficulty]);

    let renderProblems = null;
    if(problems) {
        renderProblems = (
            <div className='ProblemList-Container'>
                <div className='ProblemList-Header'>
                    <h2 className='ProblemList-Header-Title'>Problems</h2>
                    <div className='ProblemList-Header-Filter'>
                        <TagInput
                            tags={filterTags}
                            setTags={setFilterTags}
                            placeholder='Search for tags, (e.g. Mathematics, Stack)'/>
                        <Select
                            value={filterDifficulty}
                            setValue={setFilterDifficulty}
                            options={['All', 'Easy', 'Medium', 'Hard']}/>
                    </div>
                    <div className='ProblemList-Header-Sort'>
                        <SortBy
                            values={['Creation Time', 'Name', 'Solved By']}
                            order={sortOrder}
                            selected={sortSelected}
                            setSelected={onSortSelectedChange}/>
                    </div>
                </div>
                {
                    problems.length === 0 ?
                    <div className='ProblemList-NoProblemsFound'>
                        No Problems Found
                    </div> :
                    <div className='ProblemList-ProblemsFound'>
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
                }
            </div>
        )
    }

    return renderProblems;
}

export default ProblemList;