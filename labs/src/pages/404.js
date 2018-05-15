import React from 'react';
import Link from 'gatsby-link';

export default function NotFound() {
  return (
    <div>
      <h1>404: Not Found</h1>
      <p>Oh no! This route was not found.</p>
      <p>
        Back to the <Link to="/">Home page</Link>
      </p>
    </div>
  );
}
