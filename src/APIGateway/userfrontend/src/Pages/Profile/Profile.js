import axios from 'axios';
import axiosInterceptor from '../../util/interceptor';
import React, { useEffect, useState } from 'react';
import './Profile.css';
import ProfileInfoBar from '../../Components/Profile/ProfileInfoBar/ProfileInfoBar';
import RatingIcon from '../../Icons/signal-solid.svg';
import ClockIcon from '../../Icons/clock-regular.svg';
import FlagIcon from '../../Icons/flag-regular.svg';
import OrganizationIcon from '../../Icons/building-regular.svg';
import { getDate } from '../../util/helper';
import SubmissionTile from '../../Components/Submission/SubmissionTile/SubmissionTile';
import { Link, useHistory } from 'react-router-dom';
import BlogTile from '../../Components/Blog/BlogTile/BlogTile';
import { getUserID } from '../../util/authentication';
import EditIcon from '../../Icons/pen-solid-dark.svg';
import PlusIcon from '../../Icons/plus-solid-dark.svg';
import ProfileImage from '../../Components/ProfileImage/ProfileImage';
import Spinner from '../../Components/Spinner/Spinner';

const Profile = (props) => {
    const [user, setUser] = useState(null);
    
    const userID = props.match.params.userID;
    const loggedInUserID = getUserID(localStorage.getItem('token'));
    const isUserOwnProfile = loggedInUserID === userID;

    const [isUserBeingFollowed, setIsUserBeingFollowed] = useState(false);
    

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

        const fetchGetFollowing = async () => {
            try {
                const response = await axiosInterceptor.get('/api/user/following');

                const following = response.data.users;

                const isCurrentUserBeingFollowed = following.find(followedUser => followedUser._id === userID);

                if(isCurrentUserBeingFollowed) {
                    setIsUserBeingFollowed(true);
                }
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

        if(loggedInUserID) {
            fetchGetFollowing();
        }
        fetchUserProfile();
    }, [userID]);

    const onFollowUser = async () => {
        try {
            const response = await axiosInterceptor.post('/api/user/follow', {userID});

            setIsUserBeingFollowed(true);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Proposal List'});
            }
            else if(error.response.status === 403) {
                history.push('/403');
            }
            else if(error.response.status === 500) {
                history.push('/500');
            }
            else {
                history.push('/404');
            }
        }
    }

    const onUnfollowUser = async () => {
        try {
            const response = await axiosInterceptor.post('/api/user/unfollow', {userID});

            setIsUserBeingFollowed(false);
        }
        catch(error) {
            if(error.response.status === 401) {
                history.push('/login', {from: 'Proposal List'});
            }
            else if(error.response.status === 403) {
                history.push('/403');
            }
            else if(error.response.status === 500) {
                history.push('/500');
            }
            else {
                history.push('/404');
            }
        }
    }

    let userProfile = <Spinner/>;
    if(user) {
        userProfile = (
            <div className='Profile-Container'>
                <div className='Profile-Card Profile-Card-UserInfoCard'>
                    <div className='Profile-Card-Title'>
                        User Info
                        {
                            isUserOwnProfile ?
                            <Link to={`/edit/user/${userID}`} className='Profile-Card-EditProfile-Button'>
                                <img src={EditIcon} alt='Edit' className='Profile-Card-EditProfile-Button-Icon'></img>
                                Edit
                            </Link> :
                            isUserBeingFollowed ?
                            <div className='Profile-Card-Unfollow-Button' onClick={onUnfollowUser}>
                                <img src={PlusIcon} alt='Edit' className='Profile-Card-Unfollow-Button-Icon'></img>
                                Unfollow
                            </div> :
                            <div className='Profile-Card-Follow-Button' onClick={onFollowUser}>
                                <img src={PlusIcon} alt='Edit' className='Profile-Card-Follow-Button-Icon'></img>
                                Follow
                            </div>
                        }
                    </div>
                    <div className='Profile-Card-UserInfo'>
                        <div className='Profile-Picture-Container'>
                            <div className='Profile-Picture'>
                                <ProfileImage link={`/images/${user._id}`} size={100}/>
                            </div>
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