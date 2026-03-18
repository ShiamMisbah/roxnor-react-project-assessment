import React from 'react'

type Props = {}

const Error404Page = (props: Props) => {
  return (
    <div className="error404">
      <div className="error404__content">
        <h1 className="error404__code">404</h1>
        <h2 className="error404__title">Page Not Found</h2>
        <p className="error404__text">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <a href="/" className="error404__button">
          Go Home
        </a>
      </div>
    </div>
  );
}

export default Error404Page;