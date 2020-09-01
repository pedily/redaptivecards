import React, { useState, useMemo, useCallback } from 'react';
import { RedaptiveCard } from '../src/RedaptiveCard'

export default {
    title: 'RedaptiveCard'
}

const exampleCard = {
    "type": "AdaptiveCard",
    "version": "1.0",
    "body": [
        {
            "type": "Image",
            "url": "https://adaptivecards.io/content/adaptive-card-50.png"
        },
        {
            "type": "TextBlock",
            "text": "Hello **Adaptive Cards!**"
        }
    ],
    "actions": [
        {
            "type": "Action.OpenUrl",
            "title": "Learn more",
            "url": "https://adaptivecards.io"
        },
        {
            "type": "Action.OpenUrl",
            "title": "GitHub",
            "url": "https://github.com/Microsoft/AdaptiveCards"
        }
    ]
};

export const example = () => {
    return <RedaptiveCard card={exampleCard} />;
}

export const input = () => {
    const [value, setValue] = useState(JSON.stringify(exampleCard));

    const card = useMemo(() => {
        try {
            setValue(JSON.parse(value));
        } catch {
            return {}
        }
    }, [value]);

    return (
        <div>
            <input value={value} onChange={e => setValue(e.target.value)} />
            <RedaptiveCard card={card} />
        </div>
    )
}

export const someArray = () => {
    const [values, setValues] = useState([exampleCard]);
    const add = useCallback(() => {
        setValues(values => [...values, values[0]]);
    }, []);

    return (
        <div>
            <button type='button' onClick={add}>add</button>
            {values.map((value, index) => <RedaptiveCard key={index} card={value} />)}
        </div>
    )
}

export const change = () => {
    const [value, setValue] = useState(exampleCard);
    const change = useCallback(() => setValue(value => {
        const newValue = {...value};
        newValue.body[1] = {
            ...newValue.body[1],
            text: `test ${Date.now()}`,
            url: undefined
        }
        return newValue;
    }), []);

    return (
        <div>
            <button type='button' onClick={change}>change</button>
            <RedaptiveCard card={value} />
        </div>
    )
}