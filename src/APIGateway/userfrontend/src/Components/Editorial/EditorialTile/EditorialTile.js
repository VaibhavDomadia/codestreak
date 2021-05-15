import React from 'react';
import { Link } from 'react-router-dom';
import './EditorialTile.css';

import CommentsIcon from '../../../Icons/comment-dots-regular.svg';
import ViewsIcon from '../../../Icons/eye-regular.svg';
import { getDate } from '../../../util/helper';

const EditorialTile = (props) => {
    const { editorial } = props;
    return (
        <Link to={`/editorial/${editorial._id}`} className='EditorialTile-Container'>
            <div className='EditorialTile-Title'>
                {editorial.title}
            </div>
            <div className='EditorialTile-Stats-Container'>
                <div className='EditorialTile-Stats'>
                    <img src={ViewsIcon} alt='Views' className='EditorialTile-Stats-Icon'></img>
                    <div className='EditorialTile-Stats-Value'>{editorial.views}</div>
                </div>
                <div className='EditorialTile-Stats'>
                    <img src={CommentsIcon} alt='Comments' className='EditorialTile-Stats-Icon'></img>
                    <div className='EditorialTile-Stats-Value'>{editorial.numberOfComments}</div>
                </div>
            </div>
            <div className='EditorialTile-EditorialInfo'>
                <div className='EditorialTile-CreationInfo'>
                    Created By:
                    <Link to={`/user/${editorial.userID}`} className='EditorialTile-CreationInfo-Value'>
                        {editorial.handle}
                    </Link>
                    at:
                    <div className='EditorialTile-CreationInfo-Value'>
                        {getDate(editorial.createdAt)}
                    </div>
                </div>
                <div className='EditorialTile-Tags-Container'>
                    <div className='EditorialTile-Tag-Title'>
                        Tags:
                    </div>
                    <div className='EditorialTile-Tag-Value'>
                        {editorial.tags.join(', ')}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default EditorialTile;