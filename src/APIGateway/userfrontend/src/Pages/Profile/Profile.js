import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Profile.css';
import ProfilePicture from '../../Icons/user-circle-solid.svg';
import ProfileInfoBar from '../../Components/Profile/ProfileInfoBar/ProfileInfoBar';
import RatingIcon from '../../Icons/signal-solid.svg';
import ClockIcon from '../../Icons/clock-regular.svg';
import FlagIcon from '../../Icons/flag-regular.svg';
import OrganizationIcon from '../../Icons/building-regular.svg';
import { getDate } from '../../util/helper';
import SubmissionTile from '../../Components/Submission/SubmissionTile/SubmissionTile';
import { Link, useHistory } from 'react-router-dom';
import BlogTile from '../../Components/Blog/BlogTile/BlogTile';

const Profile = (props) => {
    const [user, setUser] = useState(null);

    const userID = props.match.params.userID;

    const history = useHistory();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`/api/user/${userID}`);

                setUser(response.data.user);
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

        fetchUserProfile();
    }, [userID]);

    let userProfile = null;
    if(user) {
        userProfile = (
            <div className='Profile-Container'>
                <div className='Profile-Card Profile-Card-UserInfoCard'>
                    <div className='Profile-Card-Title'>User Info</div>
                    <div className='Profile-Card-UserInfo'>
                        <div className='Profile-Picture-Container'>
                            <img src={ProfilePicture} alt='Profile' className='Profile-Picture'></img>
                        </div>
                        <div className='Profile-NameHandleContainer'>
                            <div className='Profile-Name'>{`${user.firstName} ${user.lastName}`}</div>
                            <div className='Profile-Handle'>{user.handle}</div>
                        </div>
                        <div className='Profile-InfoAndStatsContainer'>
                            <ProfileInfoBar icon={RatingIcon} title='Rating' value={user.rating}/>
                            <ProfileInfoBar icon={ClockIcon} title='Member Since' value={getDate(user.createdAt)}/>
                            {user.country && <ProfileInfoBar icon={FlagIcon} title='Country' value={user.country}/>}
                            {user.organization && <ProfileInfoBar icon={OrganizationIcon} title='Organization' value={user.organization}/>}
                        </div>
                    </div>
                </div>

                <div className='Profile-Card'>
                    <div className='Profile-Card-Title'>Recent Submissions</div>
                    <div className='Profile-Card-Submissions-Container'>
                        {
                            user.submissions.length === 0 ?
                            <div className='Profile-Card-Submissions-NoSubmission'>
                                No Submission Made Yet
                            </div> :
                            user.submissions.map(submission => {
                                return <SubmissionTile key={submission._id} submission={submission}/>
                            })
                        }
                    </div>
                    <Link to={`/submission/user/${user._id}`} className='Profile-Card-AllSubmissionButton'>
                        All Submissions
                    </Link>
                </div>

                <div className='Profile-Card'>
                    <div className='Profile-Card-Title'>Recent Blogs</div>
                    <div className='Profile-Card-Blogs-Container'>
                        {
                            user.blogs.length === 0 ?
                            <div className='Profile-Card-Blogs-NoBlogs'>
                                No Blogs Written Yet
                            </div> :
                            user.blogs.map(blog => {
                                return <BlogTile key={blog._id} blog={blog}/>
                            })
                        }
                    </div>
                    <Link to={`/blog/user/${user._id}`} className='Profile-Card-AllBlogsButton'>
                        All Blogs
                    </Link>
                </div>
            </div>
        )
    }

    return userProfile;
}

export default Profile;