import React from 'react';
import './ProblemTile.css';
import { Link } from 'react-router-dom';
import Tag from '../../../Icons/tag-solid.svg';
import Correct from '../../../Icons/check-solid.svg';


const ProblemTile = (props) => {
    const problem = props.problem;

    let difficultyColor = '#32a852';
    if(problem.difficulty === 'Medium') {
        difficultyColor = '#fcba03';
    }
    else if(problem.difficulty === 'Hard') {
        difficultyColor = '#eb4034';
    }

    return (
        <div className='ProblemTile-Container'>
            <div className='ProblemTile-Inner-Container'>
                <div className='ProblemTile-Difficulty' style={{backgroundColor: difficultyColor}}>{problem.difficulty}</div>
                <h3 className='ProblemTile-Name'>{problem.name}</h3>
                <Link to={`/problem/${problem._id}`} className='ProblemTile-Go-To-Problem-Link'>Go to Problem-&gt;</Link>
            </div>
            <div className='ProblemTile-Field-Container'>
                <div className='ProblemTile-Field'>
                    <img src={Correct} className='ProblemTile-Field-Icon' alt='Correct'></img>
                    <div className='ProblemTile-Field-Title'>
                        Solved By:
                    </div>
                    <div className='ProblemTile-Field-Value'>
                        {problem.solvedBy}
                    </div>
                </div>
                <div className='ProblemTile-Field'>
                    <img src={Tag} className='ProblemTile-Field-Icon' alt='Tag'></img>
                    <div className='ProblemTile-Field-Title'>
                        Tags:
                    </div>
                    <div className='ProblemTile-Field-Value'>
                        {problem.tags.join(', ')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProblemTile;