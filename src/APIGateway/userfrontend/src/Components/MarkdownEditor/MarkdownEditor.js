import React, { useState } from 'react';
import './MarkdownEditor.css';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'github-markdown-css';

const MarkdownEditor = (props) => {
    const [write, setWrite] = useState(true);
    const { content, setContent } = props;

    const changeContent = (event) => {
        setContent(event.target.value);
    }

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
                    <textarea value={content} onChange={changeContent} placeholder='Write your content here' className='MarkdownEditor-Body-Write'></textarea> :
                    <div className='MarkdownEditor-Body-Preview'>
                        <ReactMarkdown remarkPlugins={[gfm]} className='markdown-body'>
                            {content}
                        </ReactMarkdown>
                    </div>
                }
            </div>
        </div>
    )
}

export default MarkdownEditor;