import { PageFlip } from 'page-flip';

export type PageState = 'user_fold' | 'fold_corner' | 'flipping' | 'read';
export type PageOrientation = 'portrait' | 'landscape';
export type SizeType = 'fixed' | 'stretch';

export interface IFlipSetting {
    /** Page number from which to start viewing */
    startPage: number;
    /** Whether the book will be stretched under the parent element or not */
    size: SizeType;

    width: number;
    height: number;

    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;

    /** Draw shadows or not when page flipping */
    drawShadow: boolean;
    /** Flipping animation time */
    flippingTime: number;

    /** Enable switching to portrait mode */
    usePortrait: boolean;
    /** Initial value to z-index */
    startZIndex: number;
    /** If this value is true, the parent element will be equal to the size of the book */
    autoSize: boolean;
    /** Shadow intensity (1: max intensity, 0: hidden shadows) */
    maxShadowOpacity: number;

    /** If this value is true, the first and the last pages will be marked as hard and will be shown in single page mode */
    showCover: boolean;
    /** Disable content scrolling when touching a book on mobile devices */
    mobileScrollSupport: boolean;

    /** Set the forward event of clicking on child elements (buttons, links) */
    clickEventForward: boolean;

    /** Using mouse and touch events to page flipping */
    useMouseEvents: boolean;

    swipeDistance: number;

    /** if this value is true, fold the corners of the book when the mouse pointer is over them. */
    showPageCorners: boolean;

    /** if this value is true, flipping by clicking on the whole book will be locked. Only on corners */
    disableFlipByClick: boolean;
}

export interface IBookState {
    page: number;
    mode: PageOrientation;
}

export interface EventDataMap {
    flip: string | number;
    changeOrientation: PageOrientation;
    changeState: PageState;
    init: IBookState;
    update: IBookState;
}

export type FlipEvent<K extends keyof EventDataMap = keyof EventDataMap> = {
    data: EventDataMap[K];
    object: PageFlip;
};

export interface IEventProps {
    onFlip?: (e: FlipEvent<'flip'>) => void;
    onChangeOrientation?: (e: FlipEvent<'changeOrientation'>) => void;
    onChangeState?: (e: FlipEvent<'changeState'>) => void;
    onInit?: (e: FlipEvent<'init'>) => void;
    onUpdate?: (e: FlipEvent<'update'>) => void;
}
