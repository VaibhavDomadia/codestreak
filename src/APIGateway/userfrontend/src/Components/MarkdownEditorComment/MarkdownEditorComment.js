import React, { useState } from 'react';
import './MarkdownEditorComment.css';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'github-markdown-css';

const MarkdownEditorComment = (props) => {
    const [write, setWrite] = useState(true);
    const { content, onContentChange, error, saveTitle, onSave } = props;

    const onWrite = () => {
        setWrite(true);
    }

    const onPreview = () => {
        setWrite(false);
    }

    let writeButtonClass = 'MarkdownEditorComment-Header-Button';
    let previewButtonClass = 'MarkdownEditorComment-Header-Button';
    if(write) {
        writeButtonClass = 'MarkdownEditorComment-Header-Button MarkdownEditorComment-Header-ActiveButton'
    }
    else {
        previewButtonClass = 'MarkdownEditorComment-Header-Button MarkdownEditorComment-Header-ActiveButton';
    }

    return (
        <div className='MarkdownEditorComment'>
            <div className='MarkdownEditorComment-Header'>
                <div className={writeButtonClass} onClick={onWrite}>
                    Write
                </div>
                <div className={previewButtonClass} onClick={onPreview}>
                    Preview
                </div>
            </div>
            <div className='MarkdownEditorComment-Body'>
                {
                    write ?
                    <textarea value={content} onChange={onContentChange} placeholder='Write your content here, Markdown is supported' className='MarkdownEditorComment-Body-Write'></textarea> :
                    <div className='MarkdownEditorComment-Body-Preview'>
                        <ReactMarkdown remarkPlugins={[gfm]} className='markdown-body'>
                            {content}
                        </ReactMarkdown>
                    </div>
                }
            </div>
            <div className='MarkdownEditorComment-Controls'>
                <button className='MarkdownEditorComment-SaveButton' onClick={onSave}>
                    {saveTitle}
                </button>
            </div>
            {
                error.length !== 0 &&
                <div className='MarkdownEditorComment-Error-Container'>
                    <div className='MarkdownEditorComment-Error'>{error}</div>
                </div>
            }
        </div>
    )
}

export default MarkdownEditorComment;