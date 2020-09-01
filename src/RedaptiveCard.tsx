import React, { FC, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { AdaptiveCard } from 'adaptivecards';

interface RedaptiveCardProps {
    card: any;
}

export const RedaptiveCard: FC<RedaptiveCardProps> = props => {
    const { card } = props;
    const { current: adaptiveCard } = useRef(new AdaptiveCard());

    const mountRef = useCallback((node: HTMLDivElement) => {
        if (node !== null) {
            adaptiveCard.parse(card);
            const renderedCard = adaptiveCard.render();

            if (!renderedCard)
                return;

            if (node.firstChild)
                node.removeChild(node.firstChild);

            node.appendChild(renderedCard);
        }
    }, [card]);

    return <div ref={mountRef} />
};

