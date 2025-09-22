import type { CSSProperties, ReactNode } from 'react';
import type { PageRect, PageFlip } from 'page-flip';
import type { IEventProps, IFlipSetting } from './settings';

export type Corner = 'top' | 'bottom';

export type ElementList = NodeListOf<Element> | Element[];

export type PageFlipMethods = {
    getPageCount: () => number;
    getCurrentPageIndex: () => number;
    getOrientation: () => 'portrait' | 'landscape';
    getBoundsRect: () => PageRect;
    turnToPage: (pageNum: number) => void;
    turnToNextPage: () => void;
    turnToPrevPage: () => void;
    flipNext: (corner?: Corner) => void;
    flipPrev: (corner?: Corner) => void;
    flip: (pageNum: number, corner?: Corner) => void;
    loadFromImages: (images: string[]) => void;
    loadFromHtml: (items: ElementList) => void;
    updateFromHtml: (items: ElementList) => void;
    updateFromImages: (images: string[]) => void;
    destroy: () => void;
};

export interface IFlipperContext extends PageFlipMethods {
    setPageFlipRef: (ref: PageFlip | null) => void;
}

export interface IFlipperBookProps extends IFlipSetting, IEventProps {
    // TODO: make optional (className, style)
    className: string;
    style: CSSProperties;
    children: ReactNode;
    renderOnlyPageLengthChange?: boolean;
}

export type HTMLFlipperBookHandle = { pageFlip: () => PageFlip | undefined };
