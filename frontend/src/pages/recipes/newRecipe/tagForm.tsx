import React from 'react';

import CloseIcon from '../../../components/icons/closeIcon';

export default function TagForm({
    tags,
    setTags,
    tempTag,
    setTempTag
}: {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    tempTag: string;
    setTempTag: React.Dispatch<React.SetStateAction<string>>;
}) {
    const tempTagIsValid = () => !!tempTag && !tags.includes(tempTag);

    const addNewTag = () => {
        if (tempTagIsValid()) setTags([...tags, tempTag.toLowerCase()]);
        setTempTag('');
    };

    return (
        <fieldset id='tags' className='cb-form'>
            <legend>Tags</legend>
            {tags.length > 0 && (
                <div className='recipe-tags'>
                    {tags.map((tag, index) => (
                        <div key={index} className='nrf-tag'>
                            <div className='nrf-tag-contents'>{tag}</div>
                            <div
                                className='nrf-tag-x'
                                onClick={() =>
                                    setTags(tags.filter((t, i) => i !== index))
                                }
                            >
                                <CloseIcon />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className='cb-form-field'>
                <input
                    onChange={e =>
                        setTempTag(e.target.value ? e.target.value : '')
                    }
                    value={tempTag}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addNewTag();
                        }
                    }}
                />
                {tempTagIsValid() && (
                    <button
                        onClick={e => {
                            e.preventDefault();
                            addNewTag();
                        }}
                    >
                        Add tag
                    </button>
                )}
            </div>
        </fieldset>
    );
}
