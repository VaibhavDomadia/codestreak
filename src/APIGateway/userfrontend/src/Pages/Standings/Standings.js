import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import StandingTile from '../../Components/StandingTile/StandingTile';
import './Standings.css';

const Standings = (props) => {
    const [contest, setContest] = useState(null);

    const history = useHistory();

    const contestID = props.match.params.contestID;

    useEffect(() => {
        const fetchContest = async () => {
            try {
                const response = await axios.get(`/api/contest/${contestID}/standings`);

                setContest(response.data.contest);
            }
            catch(error) {
                if(error.response.status === 500) {
                    history.push('/500');
                }
                else {
                    history.push('/404');
                }
            }
        }

        fetchContest();
    }, [contestID]);

    let renderStandings = <Spinner/>;
    if(contest) {
        renderStandings = (
            <div className='Standings'>
                <div className='Standing-Header'>
                    <div className='Standing-Header-Title'>
                        Standing for <Link to={`/contest/${contestID}`} className='Standing-Header-Title-ContestLink'>{contest.name}</Link>
                    </div>
                </div>
                <div className='Standings-Users-Container'>
                    {
                        contest.standings.length === 0 ?
                        <div className='Standings-NoSubmissionYet'>No Submissions Made Yet</div> :
                        contest.standings.map((user, index) => {
                            return <StandingTile key={user.userID} rank={index+1} user={user}/>
                        })
                    }
                </div>
            </div>
        )
    }

    return renderStandings;
}

export default Standings;