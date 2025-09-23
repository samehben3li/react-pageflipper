import type { CSSProperties, ReactNode } from 'react';
import type { PageRect, PageFlip } from 'page-flip';
import type { IEventProps, IFlipSetting, PageOrientation } from './settings';

export type Corner = 'top' | 'bottom';

export type ElementList = NodeListOf<Element> | Element[];

export type PageFlipMethods = {
    /**
     * @returns Number of pages in the book
     */
    getPageCount: () => number;
    /**
     * @returns Current page index (0 based)
     */
    getCurrentPageIndex: () => number;

    /**
     *  @returns Current page orientation ('portrait' or 'landscape')
     */
    getOrientation: () => PageOrientation;
    /**
     * @returns Current book sizes and position
     */
    getBoundsRect: () => PageRect;

    /**
     * @param { number } pageNum - Page number (0 based)
     *
     * Turn to the specified page (0 based)
     */
    turnToPage: (pageNum: number) => void;
    /**
     * Turn to the next page (if exists)
     */
    turnToNextPage: () => void;
    /**
     * Turn to the previous page (if exists)
     */
    turnToPrevPage: () => void;

    /**
     * @param { Corner } corner - 'top' | 'bottom' - corner of the page to flip
     *
     * Flip the next page with an animation (if possible)
     */
    flipNext: (corner?: Corner) => void;
    /**
     * @param { Corner } corner - 'top' | 'bottom' - corner of the page to flip
     *
     * Flip the prev page with an animation (if possible)
     */
    flipPrev: (corner?: Corner) => void;
    /**
     * @param { number } pageNum - Page number (0 based) - page number to flip
     * @param { Corner } corner - 'top' | 'bottom' - corner of the page to flip
     *
     * Flip to the specified page with an animation (if possible)
     */
    flip: (pageNum: number, corner?: Corner) => void;

    /**
     * @param { string[] } images - Array of image URLs to load as pages
     *
     * Load pages from an array of image URLs
     */
    loadFromImages: (images: string[]) => void;
    /**
     * @param { ElementList } items - List of HTML elements to load as pages
     *
     * Load pages from a list of HTML elements
     */
    loadFromHtml: (items: ElementList) => void;

    /**
     * @param { ElementList } items - List of HTML elements to update as pages
     *
     * Update the book pages from a list of HTML elements
     */
    updateFromHtml: (items: ElementList) => void;
    /**
     * @param { string[] } images - Array of image URLs to update as pages
     *
     * Update the book pages from an array of image URLs
     */
    updateFromImages: (images: string[]) => void;

    /**
     * Removes Parent HTML Element and all event handlers
     */
    destroy: () => void;
};

export interface IFlipperContext extends PageFlipMethods {
    setPageFlipRef: (ref: PageFlip | null) => void;
}

export interface IFlipperBookProps extends IFlipSetting, IEventProps {
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
    renderOnlyPageLengthChange?: boolean;
}

export type HTMLFlipperBookHandle = { pageFlip: () => PageFlip | undefined };
