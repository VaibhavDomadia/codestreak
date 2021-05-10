import React, { useState } from 'react';
import './MarkdownEditor.css';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'github-markdown-css';

const MarkdownEditor = (props) => {
    const [write, setWrite] = useState(true);
    const { content, onContentChange, error } = props;

    const onWrite = () => {
        setWrite(true);
    }

    const onPreview = () => {
        setWrite(false);
    }

    let writeButtonClass = 'MarkdownEditor-Header-Button';
    let previewButtonClass = 'MarkdownEditor-Header-Button';
    if(write) {
        writeButtonClass = 'MarkdownEditor-Header-Button MarkdownEditor-Header-ActiveButton'
    }
    else {
        previewButtonClass = 'MarkdownEditor-Header-Button MarkdownEditor-Header-ActiveButton';
    }

    return (
        <div className='MarkdownEditor'>
            <div className='MarkdownEditor-Header'>
                <div className={writeButtonClass} onClick={onWrite}>
                    Write
                </div>
                <div className={previewButtonClass} onClick={onPreview}>
                    Preview
                </div>
            </div>
            <div className='MarkdownEditor-Body'>
                {
                    write ?
                    <textarea value={content} onChange={onContentChange} placeholder='Write your content here, Markdown is supported' className='MarkdownEditor-Body-Write'></textarea> :
                    <div className='MarkdownEditor-Body-Preview'>
                        <ReactMarkdown remarkPlugins={[gfm]} className='markdown-body'>
                            {content}
                        </ReactMarkdown>
                    </div>
                }
            </div>
            {
                error.length !== 0 &&
                <div className='MarkdownEditor-Error-Container'>
                    <div className='MarkdownEditor-Error'>{error}</div>
                </div>
            }
        </div>
    )
}

export default MarkdownEditor;