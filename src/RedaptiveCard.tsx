import React, { FC, useRef, useEffect } from 'react';
import { AdaptiveCard, SerializableObject } from 'adaptivecards';

interface RedaptiveCardProps {
    card: SerializableObject;
}

export const RedaptiveCard: FC<RedaptiveCardProps> = props => {
    const { card } = props;

    const rootRef = useRef<HTMLDivElement>(null);
    const { current: rootEl } = rootRef;
    const { current: adaptiveCard } = useRef(new AdaptiveCard());

    useEffect(() => {
        if (!rootEl)
            return;

        adaptiveCard.parse(card);
        adaptiveCard.render(rootEl);
    }, [card]);

    return <div ref={rootRef} />
};

