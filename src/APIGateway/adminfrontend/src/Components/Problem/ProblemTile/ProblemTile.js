import React from 'react';
import './ProblemTile.css';
import { Link } from 'react-router-dom';
import Tag from '../../../Icons/tag-solid.svg';
import Correct from '../../../Icons/check-solid.svg';
import TagCard from '../../TagCard/TagCard';


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
                <TagCard icon={Correct} alt='Correct' title='Solved By' value={problem.solvedBy}/>
                <TagCard icon={Tag} alt='Tag' title='Tags' value={problem.tags.join(', ')}/>
            </div>
        </div>
    )
}

export default ProblemTile;