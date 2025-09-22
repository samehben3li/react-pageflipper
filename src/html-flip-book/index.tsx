import React, {
    ReactElement,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
    forwardRef,
    type MutableRefObject,
} from 'react';

import { PageFlip } from 'page-flip';
import type { FlipEvent } from './settings';
import type { IFlipperBookProps } from './types';
import { useFlipper } from './FlipperProvider';

const HTMLFlipperBookForward = forwardRef(
    (props: IFlipperBookProps, ref: MutableRefObject<PageFlip>) => {
        const htmlElementRef = useRef<HTMLDivElement>(null);
        const childRef = useRef<HTMLElement[]>([]);
        const pageFlip = useRef<PageFlip>();

        const [pages, setPages] = useState<ReactElement[]>([]);

        const { setPageFlipRef } = useFlipper();

        useImperativeHandle(ref, () => ({
            pageFlip: () => pageFlip.current,
        }));

        // 🔹 Reset book if pages are removed
        const refreshOnPageDelete = useCallback(() => {
            // TODO: check if this is needed
            if (pageFlip.current) {
                pageFlip.current.clear();
            }
        }, []);

        // 🔹 Remove all handlers before re-adding
        const removeHandlers = useCallback(() => {
            const flip = pageFlip.current;

            if (flip) {
                flip.off('flip');
                flip.off('changeOrientation');
                flip.off('changeState');
                flip.off('init');
                flip.off('update');
            }
        }, []);

        // 🔹 Handle children as pages
        useEffect(() => {
            childRef.current = [];

            if (props.children) {
                const childList = React.Children.map(props.children, (child) =>
                    React.cloneElement(child as ReactElement, {
                        ref: (dom) => {
                            if (dom) {
                                childRef.current.push(dom);
                            }
                        },
                    })
                );

                if (!props.renderOnlyPageLengthChange || pages.length !== childList.length) {
                    if (childList.length < pages.length) {
                        refreshOnPageDelete();
                    }

                    setPages(childList);
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [props.children]);

        // 🔹 Init / Update pageFlip
        useEffect(() => {
            const setHandlers = () => {
                const flip = pageFlip.current;
                // TODO use if (!flip) return;
                if (flip) {
                    if (props.onFlip) {
                        flip.on('flip', (e: FlipEvent<'flip'>) => props.onFlip(e));
                    }

                    if (props.onChangeOrientation) {
                        flip.on('changeOrientation', (e: FlipEvent<'changeOrientation'>) =>
                            props.onChangeOrientation(e)
                        );
                    }

                    if (props.onChangeState) {
                        flip.on('changeState', (e: FlipEvent<'changeState'>) =>
                            props.onChangeState(e)
                        );
                    }

                    if (props.onInit) {
                        flip.on('init', (e: FlipEvent<'init'>) => props.onInit(e));
                    }

                    if (props.onUpdate) {
                        flip.on('update', (e: FlipEvent<'update'>) => props.onUpdate(e));
                    }
                }
            };

            if (pages.length > 0 && childRef.current.length > 0) {
                removeHandlers();

                if (htmlElementRef.current && !pageFlip.current) {
                    pageFlip.current = new PageFlip(htmlElementRef.current, props);
                    setPageFlipRef(pageFlip.current);
                }

                if (!pageFlip.current.getFlipController()) {
                    pageFlip.current.loadFromHTML(childRef.current);
                } else {
                    pageFlip.current.updateFromHtml(childRef.current);
                }

                setHandlers();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [pages]);

        return (
            <div ref={htmlElementRef} className={props.className} style={props.style}>
                {pages}
            </div>
        );
    }
);

export const HTMLFlipperBook = React.memo(HTMLFlipperBookForward);
