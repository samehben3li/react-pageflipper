import React, { createContext, useContext, useRef, type ReactNode, type FC, useMemo } from 'react';
import { PageFlip } from 'page-flip';
import type { Corner, ElementList, IFlipperContext } from './types';

const FlipperContext = createContext<IFlipperContext | null>(null);

export const useFlipper = (): IFlipperContext => {
    const ctx = useContext(FlipperContext);
    if (!ctx) {
        throw new Error('useFlipper must be used inside <FlipperProvider>');
    }
    return ctx;
};

export const FlipperProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const pageFlipRef = useRef<PageFlip | null>(null);

    // 🔹 Context values (methods)
    const contextValue = useMemo(
        () => ({
            setPageFlipRef: (ref: PageFlip | null) => {
                pageFlipRef.current = ref;
            },
            getPageCount: () => pageFlipRef.current?.getPageCount() || 0,
            getCurrentPageIndex: () => pageFlipRef.current?.getCurrentPageIndex() || 0,
            getOrientation: () => pageFlipRef.current?.getOrientation() || 'portrait',
            getBoundsRect: () => pageFlipRef.current?.getBoundsRect(),
            turnToPage: (pageNum: number) => pageFlipRef.current?.turnToPage(pageNum),
            turnToNextPage: () => pageFlipRef.current?.turnToNextPage(),
            turnToPrevPage: () => pageFlipRef.current?.turnToPrevPage(),
            flipNext: (corner: Corner = 'bottom') => pageFlipRef.current?.flipNext(corner),
            flipPrev: (corner: Corner = 'bottom') => pageFlipRef.current?.flipPrev(corner),
            flip: (pageNum: number, corner: Corner = 'bottom') =>
                pageFlipRef.current?.flip(pageNum, corner),
            loadFromImages: (images: string[]) => pageFlipRef.current?.loadFromImages(images),
            loadFromHtml: (items: ElementList) => pageFlipRef.current?.loadFromHtml(items),
            updateFromHtml: (items: ElementList) => pageFlipRef.current?.updateFromHtml(items),
            updateFromImages: (images: string[]) => pageFlipRef.current?.updateFromImages(images),
            destroy: () => pageFlipRef.current?.destroy(),
        }),
        []
    );

    return <FlipperContext.Provider value={contextValue}>{children}</FlipperContext.Provider>;
};
