import React from 'react'

type GenericErrorProps = {
    currentError: any
}

const GenericErrorPage = ({ currentError }: GenericErrorProps) => {
    console.log(currentError);
    
    const { statusCode, data } = currentError;
  return (
    <div className="error404">
      <div className="error404__content">
        <h1 className="error404__code">{statusCode}</h1>
        <h2 className="error404__title">Something is Wrong!!</h2>
        <p className="error404__text">
          {data.message ??
            "Sorry, the page you are looking for does not exist or has been moved."}
        </p>
        <a href="/" className="error404__button">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default GenericErrorPage;