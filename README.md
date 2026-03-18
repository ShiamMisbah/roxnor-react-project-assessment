# Product Dashboard

A React + TypeScript product dashboard built with Ant Design, Redux Toolkit, and RTK Query. The app focuses on two core flows: browsing products in a paginated table and viewing a single product in a detailed page with an edit drawer.

## Architecture at a glance

The project is organized by responsibility:

- `pages/` contains route-level screens and page orchestration.
- `components/` contains reusable UI pieces such as the table, search bar, dropdown, drawer, and form.
- `state/` contains the Redux store, RTK Query API slice, and product slice.
- `types/` contains shared domain models.

This structure keeps data fetching, screen logic, and UI rendering separated enough to stay maintainable without adding unnecessary abstraction.

## Key architecture decisions

### 1. RTK Query for server state
All API calls are centralized in `productApiSlice.ts`. It defines endpoints for:

- product list with pagination
- single product details
- keyword search
- category list
- category-based filtering

This keeps fetching logic in one place and gives the UI generated hooks with built-in loading, error, and caching behavior.

### 2. Redux slice for selected product state
The app also keeps a `singleProduct` slice in Redux. When the single product page loads, the fetched product is dispatched into this slice and reused by the edit form.

This separates:

- **server state** from RTK Query
- **UI working state** for the selected product in Redux

That is useful for edit flows, form prefilling, and future update features.

### 3. Pages own orchestration
Page components decide what data source is active, what loading state to show, and what error screen to render.

- `ProductPage.tsx` manages pagination, search, category filtering, and the active dataset.
- `SingleProductPage.tsx` manages route validation, product fetching, skeleton/error handling, and drawer visibility.

This keeps reusable components focused on presentation instead of business logic.

### 4. Components stay mostly presentational
Shared components such as `TableComponent`, `SearchTab`, `DropDownComponent`, and `DrawerComponent` are intentionally thin. They receive data and callbacks from their parent rather than managing fetching logic themselves.

This makes them easier to reuse and easier to test.

### 5. Dedicated loading and error screens
The app uses dedicated skeleton pages and error pages instead of scattering spinners and fallback messages throughout the UI.

- `ProductSkeletonPage`
- `SingleProductSkeleton`
- `GenericErrorPage`
- `Error404Page`

That improves consistency and keeps page-level rendering rules explicit.

## Data flow

### Product list flow
1. `ProductPage` requests products, categories, search results, and category-filtered results.
2. A derived response model picks the active dataset based on search text and selected category.
3. The final dataset is passed to `TableComponent`.

### Single product flow
1. `SingleProductPage` reads the `id` route param.
2. It validates the param before firing the query.
3. On success, the product is shown and also stored in Redux.
4. `DrawerComponent` opens an edit form prefilled from Redux state.

## Strengths of the current design

- Clear separation between page logic and reusable UI
- Centralized API definitions
- Predictable loading and error handling
- Good base for future edit/update features
- Strong TypeScript support across the app

## Current tradeoffs

- Search and category filters are handled as separate modes rather than combined filters.
- The edit form is prepared for updates, but submit handling is not yet connected to a mutation endpoint.
- Some reusable components still use broad `any` typing and could be made more generic.

## Suggested next improvements

- Add RTK Query mutations for updating products
- Support combined search + category filtering
- Replace `any` in shared components with generic row typing
- Move repeated selector logic into dedicated selectors
- Add route-level README notes or feature folders if the app grows further

## Tech stack

- React
- TypeScript
- React Router
- Redux Toolkit
- RTK Query
- Ant Design
- SCSS

## Summary

The architecture favors clarity over complexity. RTK Query handles remote data, Redux stores selected product UI state, pages coordinate behavior, and shared components stay lightweight. For a small-to-medium dashboard app, this is a practical and scalable foundation.
