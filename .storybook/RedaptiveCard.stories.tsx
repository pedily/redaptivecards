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

const actionExample = {
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "TextBlock",
            "size": "Medium",
            "weight": "Bolder",
            "text": "${title}"
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "Image",
                            "style": "Person",
                            "url": "${creator.profileImage}",
                            "size": "Small"
                        }
                    ],
                    "width": "auto"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "weight": "Bolder",
                            "text": "${creator.name}",
                            "wrap": true
                        },
                        {
                            "type": "TextBlock",
                            "spacing": "None",
                            "text": "Created {{DATE(${createdUtc},SHORT)}}",
                            "isSubtle": true,
                            "wrap": true
                        }
                    ],
                    "width": "stretch"
                }
            ]
        },
        {
            "type": "TextBlock",
            "text": "${description}",
            "wrap": true
        },
        {
            "type": "FactSet",
            "facts": [
                {
                    "$data": "${properties}",
                    "title": "${key}:",
                    "value": "${value}"
                }
            ]
        },
        {
            "type": "ActionSet",
            "actions": [
                {
                    "type": "Action.OpenUrl",
                    "title": "Action.OpenUrl",
                    "id": "id1",
                    "iconUrl": "https://placekitten.com/50/50",
                    "url": "https://placekitten.com"
                },
                {
                    "type": "Action.Submit",
                    "title": "Action.Submit",
                    "id": "id2"
                },
                {
                    "type": "Action.ShowCard",
                    "title": "Action.ShowCard",
                    "card": {
                        "type": "AdaptiveCard"
                    },
                    "id": "id3"
                },
                {
                    "type": "Action.ToggleVisibility",
                    "title": "Action.ToggleVisibility",
                    "id": "id4"
                }
            ]
        }
    ],
    "actions": [
        {
            "type": "Action.ShowCard",
            "title": "Set due date",
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "Input.Date",
                        "id": "dueDate"
                    },
                    {
                        "type": "Input.Text",
                        "id": "comment",
                        "placeholder": "Add a comment",
                        "isMultiline": true
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        },
        {
            "type": "Action.OpenUrl",
            "title": "View",
            "url": "${viewUrl}"
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.2"
}

export const actions = () => {
    const handleAction = console.log.bind(console);

    return <RedaptiveCard card={actionExample} onExecuteAction={handleAction} />
}

const inputCard = {
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "TextBlock",
            "size": "Medium",
            "weight": "Bolder",
            "text": "${title}"
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "Image",
                            "style": "Person",
                            "url": "${creator.profileImage}",
                            "size": "Small"
                        }
                    ],
                    "width": "auto"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "weight": "Bolder",
                            "text": "${creator.name}",
                            "wrap": true
                        },
                        {
                            "type": "TextBlock",
                            "spacing": "None",
                            "text": "Created {{DATE(${createdUtc},SHORT)}}",
                            "isSubtle": true,
                            "wrap": true
                        }
                    ],
                    "width": "stretch"
                }
            ]
        },
        {
            "type": "TextBlock",
            "text": "${description}",
            "wrap": true
        },
        {
            "type": "FactSet",
            "facts": [
                {
                    "$data": "${properties}",
                    "title": "${key}:",
                    "value": "${value}"
                }
            ]
        },
        {
            "type": "Input.Text",
            "placeholder": "Placeholder text",
            "id": "textinput"
        },
        {
            "type": "Input.Date",
            "id": "dateinput"
        },
        {
            "type": "Input.Time",
            "id": "timeinput"
        },
        {
            "type": "Input.Number",
            "placeholder": "Placeholder text",
            "id": "numberinput"
        },
        {
            "type": "Input.ChoiceSet",
            "choices": [
                {
                    "title": "Choice 1",
                    "value": "Choice 1"
                },
                {
                    "title": "Choice 2",
                    "value": "Choice 2"
                }
            ],
            "placeholder": "Placeholder text",
            "id": "choicesetinput"
        },
        {
            "type": "Input.Toggle",
            "title": "New Input.Toggle",
            "id": "toggleinput"
        },
        {
            "type": "ActionSet",
            "actions": [
                {
                    "type": "Action.Submit",
                    "title": "Action.Submit"
                }
            ]
        }
    ],
    "actions": [
        {
            "type": "Action.ShowCard",
            "title": "Set due date",
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "Input.Date",
                        "id": "dueDate"
                    },
                    {
                        "type": "Input.Text",
                        "id": "comment",
                        "placeholder": "Add a comment",
                        "isMultiline": true
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        },
        {
            "type": "Action.OpenUrl",
            "title": "View",
            "url": "${viewUrl}"
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.2"
}

export const forms = () => {
    const handleAction = console.log.bind(console);

    return <RedaptiveCard card={inputCard} onExecuteAction={handleAction} />
}