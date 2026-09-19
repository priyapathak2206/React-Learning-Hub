# React Task Management App

## Practical 8: Performance Optimization and Lazy Loading

This practical focuses on improving the performance of the React Task Management application using route-based lazy loading and code splitting.

## Technologies Used

- React
- React Router
- Vite
- JavaScript
- CSS

## Lazy Loading Implementation

React.lazy() and Suspense are used to load pages and components only when they are required.

### Lazy-loaded Routes

The following routes are loaded lazily:

- Projects
- Contact

Example:

```jsx
const Projects = lazy(() => import("./pages/projects"));
const Contact = lazy(() => import("./pages/Contact"));