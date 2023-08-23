import React, { useEffect, useState } from 'react';

import { MdClose } from 'react-icons/md';

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

    const [existingTags, setExistingTags] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/tags/all')
            .then(res => (res.ok ? res.json() : { tags: [] }))
            .then(data => setExistingTags(data.tags));
    }, []);

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
                                <MdClose className='util-icon' />
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
                    list='existing-tags'
                />
                <datalist id='existing-tags'>
                    {existingTags &&
                        existingTags
                            .filter(t => !tags.includes(t))
                            .map((t, i) => <option key={i} value={t} />)}
                </datalist>
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

