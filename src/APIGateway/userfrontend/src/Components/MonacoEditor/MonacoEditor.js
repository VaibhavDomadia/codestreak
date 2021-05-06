import React from 'react';
import CodeEditor from '@monaco-editor/react';
import './MonacoEditor.css';
import Select from '../Select/Select';
import Button from '../Button/Button';

const MonacoEditor = (props) => {
    const { code, language, onCodeChange, onLanguageChange, onCodeSubmit } = props;
    return (
        <div className='MonacoEditor-Container'>
            <div className='MonacoEditor-Controls'>
                <div className='MonacoEditor-Language-Control'>
                    <div className='MonacoEditor-Language-Title'>Language</div>
                    <Select value={language} setValue={onLanguageChange} options={['Java', 'Cpp', 'Python']}/>
                </div>
            </div>
            <div className='MonacoEditor-Editor'>
                <CodeEditor
                    value={code}
                    onChange={onCodeChange}
                    language={language.toLowerCase()}
                    theme='vs-dark'
                    height='500px'
                    />
            </div>
            <div className='MonacoEditor-Code-Submission-Buttons'>
                <Button name='Submit' type='solid' color='#1389f4' onClick={onCodeSubmit}/>
            </div>
        </div>
    )
}

export default MonacoEditor;