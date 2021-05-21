import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContestTile from '../../Components/Contest/ContestTile/ContestTile';
import './ContestList.css';
import { useHistory } from 'react-router';
import Pagination from '../../Components/Pagination/Pagination';
import Spinner from '../../Components/Spinner/Spinner';
import DarkSmallLinkIconButton from '../../Components/DarkSmallLinkIconButton/DarkSmallLinkIconButton';
import AddIcon from '../../Icons/plus-solid.svg';

const ContestList = (props) => {
    const [contests, setContests] = useState(null);
    const history = useHistory();
    const [numberOfContests, setNumberOfContests] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const contestsPerPage = 10;

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await axios.get(`/api/contests?page=${currentPage}`);
                const contests = response.data.contests;

                setContests(contests);
                setNumberOfContests(response.data.totalNumberOfContests);
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

        fetchContests();
    }, [currentPage]);

    let renderContests = <Spinner/>;
    if(contests) {
        const upcomingContests = [];
        const ongoingContests = [];
        const pastContests = [];

        for(const contest of contests) {
            const startTime = new Date(contest.startTime).getTime();
            const endTime = startTime + parseInt(contest.duration);
            const currentTime = new Date().getTime();
            if(currentTime >= endTime) {
                pastContests.push(<ContestTile key={contest._id} contest={contest}/>);
            }
            else if(currentTime > startTime && currentTime < endTime) {
                ongoingContests.push(<ContestTile key={contest._id} contest={contest}/>);
            }
            else {
                upcomingContests.push(<ContestTile key={contest._id} contest={contest}/>);
            }
        }
        
        renderContests = (
            <div className='ContestList'>
                <div className='ContestList-Header'>
                    <div className='ContestList-Header-Title'>Contests</div>
                    <div className='ContestList-Header-Buttons'>
                        <DarkSmallLinkIconButton to={'/create/contest'} icon={AddIcon} alt='Add Contest' title='Create Contest'/>
                    </div>
                </div>
                {
                    ongoingContests.length !== 0 &&
                    <div className='ContestGroup-Container'>
                        <div className='ContestGroup-Title'>
                            Ongoing Contest
                        </div>
                        {ongoingContests}
                    </div>
                }
                {
                    upcomingContests.length !== 0 &&
                    <div className='ContestGroup-Container'>
                        <div className='ContestGroup-Title'>
                            Upcoming Contest
                        </div>
                        {upcomingContests}
                    </div>
                }
                {
                    pastContests.length !== 0 &&
                    <div className='ContestGroup-Container'>
                        <div className='ContestGroup-Title'>
                            Past Contest
                        </div>
                        {pastContests}
                    </div>  
                }
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    numberOfItems={numberOfContests}
                    itemsPerPage={contestsPerPage}
                    />
            </div>
        )
    }

    return renderContests;
}

export default ContestList;