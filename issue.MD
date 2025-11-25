# Issue: Refactor main.tsx to use React Router

**User Query:** `d:\weappgroup\huasanJD\weFix-nitro-vite\app\main.tsx` 是否可以使用Routes 方式？ (Can `d:\weappgroup\huasanJD\weFix-nitro-vite\app\main.tsx` use the Routes method?)

**Analysis:**

The file `app/main.tsx` currently uses a manual, imperative routing system based on `window.location.hash` and a `switch` statement. While functional, this is not idiomatic for a React application and has several drawbacks:
- Manual DOM manipulation (`outlet.innerHTML = ''`).
- Verbose and harder to maintain as the application grows.
- Doesn't leverage the power of the React component model for routing.

The file already imports routing components from `react-router-dom`, but they are unused.

**Proposed Solution:**

Refactor `app/main.tsx` to use the declarative, component-based routing provided by `react-router-dom`.

**Key Changes:**
1.  **Remove Manual Router:** The `router()` function and the `hashchange` event listener will be removed.
2.  **Introduce Root `App` Component:** A new root component (`App`) will be created to house the `Router`, navigation links, and `Routes` configuration.
3.  **Use `<Link>` for Navigation:** The vanilla JavaScript `<a>` tags for navigation will be replaced with `react-router-dom`'s `<Link>` component for client-side routing without page reloads.
4.  **Define Routes with `<Routes>` and `<Route>`:** The `switch` statement will be replaced by a `<Routes>` block where each `<Route>` maps a path to a specific component.
5.  **Create `LegacyWrapper` Component:** To integrate the existing non-React `setupApp` and `setupDatabaseExplorer` functions, a wrapper component (`LegacyWrapper`) is introduced. This component uses `useEffect` and `useRef` to safely call these imperative setup functions within the React component lifecycle.
6.  **Render the App:** The application will be rendered once by calling `ReactDOM.createRoot(outlet).render(<App />)`.

This refactoring will make the routing logic more robust, maintainable, and aligned with modern React best practices.
