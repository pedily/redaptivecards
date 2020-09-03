import React, { FC, useRef, useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { AdaptiveCard, AdaptiveCardConfig, Action } from 'adaptivecards';

interface ISerializedAction {
    type: string;
    title: string;
    url: string;
}

interface RedaptiveCardProps {
    card: any;
    onExecuteAction?: (action: any) => any;
}

export const RedaptiveCard: FC<RedaptiveCardProps> = props => {
    const { card, onExecuteAction } = props;

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

    useEffect(() => {
        if (!node)
            return;

        instance.onExecuteAction = (action) => {
            onExecuteAction?.(action.toJSON())
        }
    }, [node, onExecuteAction]);

    return <div ref={mountRef} />
};

