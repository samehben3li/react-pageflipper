[![GitHub license](https://img.shields.io/github/license/samehben3li/react-pageflipper)](https://github.com/samehben3li/react-pageflipper/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/react-pageflipper)](https://www.npmjs.com/package/react-pageflipper) [![npm](https://img.shields.io/npm/dm/react-pageflipper)](https://npmcharts.com/compare/react-pageflipper?minimal=true)

# react-pageflipper

A modern React.js wrapper for **StPageFlip**, providing a realistic and customizable page-flipping effect.  
This project extends [react-pageflip](https://github.com/Nodlik/react-pageflip) with **better TypeScript support**, bug fixes, and a new **FlipperProvider API** for easier access to methods inside and outside the `HTMLFlipperBook`.

With `FlipperProvider`, you no longer need to rely only on `ref` to control the book — you can call methods like `flipNext()` or `getCurrentPageIndex()` from anywhere in your component tree.

## Version 2.0.0

✨ Highlights in this release:

- 🔄 Fully rewritten with **React hooks**  
- 🛠️ Introduced **FlipperProvider** for global, context-based access to API methods  
- ✅ Improved TypeScript definitions for safer and cleaner integration  
- 🐛 Fixed multiple bugs from the original package  
- ⚠️ **Breaking change**: method access API updated →  
  - Use `FlipperProvider` (recommended) for top-level method access  
  - Or follow the classic `ref` approach documented in [react-pageflip](https://github.com/Nodlik/react-pageflip/blob/master/README.md#methods)  


## Installation

``` bash
npm install react-pageflipper
# or
yarn add react-pageflipper
```

### Basic Usage

```jsx
import HTMLFlipperBook, { FlipperProvider } from 'react-pageflipper';

function MyBook(props) {
    return (
        <FlipperProvider>
            <HTMLFlipperBook width={300} height={500}>
                <div className="demoPage">Page 1</div>
                <div className="demoPage">Page 2</div>
                <div className="demoPage">Page 3</div>
                <div className="demoPage">Page 4</div>
            </HTMLFlipperBook>
        </FlipperProvider>
    );
}
```
<!-- TODO add Advanced Usage -->

### Props

To set configuration use these props:

-   `width: number` - required
-   `height: number` - required
-   `size: ("fixed", "stretch")` - default: `"fixed"` Whether the book will be stretched under the parent element or not
-   `minWidth, maxWidth, minHeight, maxHeight: number` You must set threshold values ​​with size: `"stretch"`
-   `drawShadow: boolean` - default: `true` Draw shadows or not when page flipping
-   `flippingTime: number` (milliseconds) - default: `1000` Flipping animation time
-   `usePortrait: boolean` - default: `true` Enable switching to portrait mode
-   `startZIndex: number` - default: `0` Initial value to z-index
-   `autoSize: boolean` - default: `true` If this value is true, the parent element will be equal to the size of the book
-   `maxShadowOpacity: number [0..1]` - default: `1` Shadow intensity (1: max intensity, 0: hidden shadows)
-   `showCover: boolean` - default: `false` If this value is true, the first and the last pages will be marked as hard and will be shown in single page mode
-   `mobileScrollSupport: boolean` - default: `true` disable content scrolling when touching a book on mobile devices
-   `swipeDistance: number` - default: `30` (px) minimum distance to detect swipe
-   `clickEventForward: boolean` - default: `true` forwarding click events to the page children html elements (only for `a` and `button` tags)
-   `useMouseEvents: boolean` - default: `true` using mouse and touch events to page flipping
-   `renderOnlyPageLengthChange: boolean` - default: `false` (NEW on 2.0.0) if this flag is active, the book will be updated and re-rendered ONLY if the number of pages has changed.

Note: when `size: "stretch"`, you should set reasonable thresholds for `minWidth`, `maxWidth`, `minHeight`, and `maxHeight`.

### Events

You can use the following events:

```jsx
...
function DemoBook() {
    const onFlip = useCallback((e) => {
        console.log('Current page: ' + e.data);
    }, []);

    return (
        <HTMLFlipperBook
            /* props */
            onFlip={onFlip}
        >
        /* ... pages */
        </HTMLFlipperBook>
    )
}
```

**Available events:**

-   `onFlip: number` - triggered by page turning
-   `onChangeOrientation: ("portrait", "landscape")` - triggered when page orientation changes
-   `onChangeState: ("user_fold", "fold_corner", "flipping", "read")` - triggered when the state of the book changes
-   `onInit: ({page: number, mode: 'portrait', 'landscape'})` - triggered when the book is init and the start page is loaded. Listen (`on`) this event before using the "loadFrom..." methods
-   `onUpdate: ({page: number, mode: 'portrait', 'landscape'})` - triggered when the book pages are updated (using the "updateFrom..." methods)

Event object has two fields: `data: number | string` and `object: PageFlip`

### Methods

You can access the `PageFlip` API in **two ways**:

#### 1. Using `FlipperProvider` (Recommended)

Wrap your code at the **top level** with `FlipperProvider`.  
This allows you to easily access methods from anywhere inside/outside the `HTMLFlipperBook` without manually handling refs.

```tsx
  import HTMLFlipperBook, { FlipperProvider, useFlipper } from "react-pageflipper";

function Controls() {
    const { flipNext, flipPrev, getCurrentPageIndex } = useFlipper();

    return (
        <div>
            <button onClick={() => flipPrev()}>Previous</button>
            <button onClick={() => flipNext()}>Next</button>
        </div>
    );
}

function App() {
    return (
        <FlipperProvider>
            <Controls />
            <HTMLFlipperBook width={300} height={500}>
                <div>Page 1</div>
                <div>Page 2</div>
                <div>Page 3</div>
                <div>Page 4</div>
            </HTMLFlipperBook>
        </FlipperProvider>
    );
}
```

#### 2. Using ref (Classic way, same as [react-pageflip](https://github.com/Nodlik/react-pageflip/blob/master/README.md#methods))


**Available methods:**

| Method name           | Parameters                                   | Return type               | Description                                                    |
| --------------------- | -------------------------------------------- | ------------------------- | -------------------------------------------------------------- |
| `getPageCount`        | ` `                                          | `number`                  | Get number of all pages                                        |
| `getCurrentPageIndex` | ` `                                          | `number`                  | Get the current page number (starts at 0)                      |
| `getOrientation`      | ` `                                          | `'portrait', 'landscape'` | Get the current orientation: portrait or landscape             |
| `getBoundsRect`       | ` `                                          | `PageRect`                | Get current book sizes and position                            |
| `turnToPage`          | `pageNum: number`                            | `void`                    | Turn to the specified page number (without animation)          |
| `turnToNextPage`      | ` `                                          | `void`                    | Turn to the next page (without animation)                      |
| `turnToPrevPage`      | ` `                                          | `void`                    | Turn to the previous page (without animation)                  |
| `flipNext`            | `corner: ['top', 'bottom']`                  | `void`                    | Turn to the next page (with animation)                         |
| `flipPrev`            | `corner: ['top', 'bottom']`                  | `void`                    | Turn to the previous page (with animation)                     |
| `flip`                | `pageNum: number, corner: ['top', 'bottom']` | `void`                    | Turn to the specified page (with animation)                    |
| `loadFromImages`      | `images: ['path-to-image1.jpg', ...]`        | `void`                    | Load page from images                                          |
| `loadFromHtml`        | `items: NodeListOf, HTMLElement[]`           | `void`                    | Load page from html elements                                   |
| `updateFromHtml`      | `items: NodeListOf, HTMLElement[]`           | `void`                    | Update page from html elements                                 |
| `updateFromImages`    | `images: ['path-to-image1.jpg', ...]`        | `void`                    | Update page from images                                        |
| `destroy`             | ` `                                          | `void`                    | Destructor. Removes Parent HTML Element and all event handlers |

### License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/samehben3li/react-pageflipper/blob/master/LICENSE)
 file for details.

### Maintainer

- 👤 Sameh Benali
- 📧 [sameh@ranadev.io](mailto:sameh@ranadev.io)
- 🌍 [GitHub](https://github.com/samehben3li)
- [🌐 Portfolio](https://samehben3li.netlify.app/)
- [💼 LinkedIn](https://www.linkedin.com/in/sameh-benali-9381191a7/)
