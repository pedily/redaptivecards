import React, { FC, useRef, useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { AdaptiveCard } from 'adaptivecards';

interface RedaptiveCardProps {
    card: any;
}

export const RedaptiveCard: FC<RedaptiveCardProps> = props => {
    const { card } = props;

    const [instance] = useState(() => new AdaptiveCard());
    const [node, setNode] = useState<HTMLDivElement | null>(null);

    const mountRef = useCallback((newNode: HTMLDivElement) => {
        if (newNode !== null && newNode !== node) {
            setNode(newNode);
        }
    }, []);

    useEffect(() => {
        if (!node)
            return;

        instance.parse(card);
        const renderedCard = instance.render();

        if (!renderedCard)
            return;

        if (node.firstChild)
            node.removeChild(node.firstChild);

        node.appendChild(renderedCard);
    }, [node, card]);

    return <div ref={mountRef} />
};

