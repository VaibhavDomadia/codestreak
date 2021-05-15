import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProblemEditorials.css';
import { useHistory } from 'react-router';
import EditorialTile from '../../Components/Editorial/EditorialTile/EditorialTile';
import Pagination from '../../Components/Pagination/Pagination';
import DarkLinkIconButton from '../../Components/DarkLinkIconButton/DarkLinkIconButton';
import AddIcon from '../../Icons/plus-solid.svg';
import TagInput from '../../Components/TagInput/TagInput';
import SortBy from '../../Components/SortBy/SortBy';
import { Link } from 'react-router-dom';

const ProblemEditorials = (props) => {
    const [editorials, setEditorials] = useState(null);
    const history = useHistory();
    const [numberOfEditorials, setNumberOfEditorials] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const editorialsPerPage = 10;

    const problemID = props.match.params.problemID;

    const [filterTags, setFilterTags] = useState([]);
    const [sortSelected, setSortSelected] = useState('Creation Time');
    const [sortOrder, setSortOrder] = useState(1);
    const [problem, setProblem] = useState(null);

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
        const fetchEditorials = async () => {
            try {
                let sortBy = 'createdAt';
                if(sortSelected === 'Title') {
                    sortBy = 'title';
                }
                else if(sortSelected === 'Views') {
                    sortBy = 'views';
                }
                else if(sortSelected === 'Interactivity') {
                    sortBy = 'numberOfComments';
                }

                if(sortOrder === 1) {
                    sortBy = `-${sortBy}`
                }

                let filterQuery = '';
                if(filterTags.length !== 0) {
                    filterQuery = `&tags=${filterTags.join(',')}`
                }

                const response = await axios.get(`/api/editorial/problem/${problemID}?page=${currentPage}&sort=${sortBy}${filterQuery}`);

                setEditorials(response.data.editorials);
                setNumberOfEditorials(response.data.totalNumberOfEditorials);
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

        const fetchProblem = async () => {
            try {
                const response = await axios.get(`/api/problem/${problemID}`);

                setProblem(response.data.problem);
            }
            catch(error) {
                if(error.response.status === 500) {
                    history.replace('/500');
                }
                else if(error.response.status === 403) {
                    history.replace('/403');
                }
                else {
                    history.replace('/404');
                }
            }
        }

        fetchProblem();
        fetchEditorials();
    }, [currentPage, filterTags, sortSelected, sortOrder]);

    let allEditorials = null;
    if(editorials && problem) {
        allEditorials = (
            <div className='ProblemEditorials-Container'>
                <div className='ProblemEditorials-Header'>
                    <div className='ProblemEditorials-Header-Top'>
                        <div className='ProblemEditorials-Header-Title'>
                            All Editorials for <Link to={`/problem/${problem._id}`} className='ProblemEditorials-Header-Title-ProblemLink'>{problem.name}</Link>
                        </div>
                        <DarkLinkIconButton to={`/create/editorial/${problem._id}`} icon={AddIcon} alt='Add' title='New Editorial'/>
                    </div>
                    <TagInput
                        tags={filterTags}
                        setTags={setFilterTags}
                        placeholder='Search for tags, (e.g. Stack, tree, graph)'/>
                    <div className='EditorialTile-Header-SortBy'>
                        <SortBy
                            values={['Creation Time', 'Title', 'Views', 'Interactivity']}
                            order={sortOrder}
                            selected={sortSelected}
                            setSelected={onSortSelectedChange}/>
                    </div>
                </div>
                {
                    editorials.length === 0 ?
                    <div className='ProblemEditorials-NoEditorialsFound'>
                        No Editorials Found
                    </div> :
                    <div className='ProblemEditorials-EditorialsFound'>
                        <div className='ProblemEditorials-Editorial-Container'>
                            {
                                editorials.map(editorial => {
                                    return (
                                        <div key={editorial._id} className='ProblemEditorials-Editorial'>
                                            <EditorialTile editorial={editorial}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            numberOfItems={numberOfEditorials}
                            itemsPerPage={editorialsPerPage}/>
                    </div>
                }
            </div>
        )
    }

    return allEditorials;
}

export default ProblemEditorials;