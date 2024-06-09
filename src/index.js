import React from 'react'; // Importing React to use JSX and other React features
import ReactDOM from 'react-dom'; // Importing ReactDOM for rendering the application to the DOM

import './index.css'; // Importing global CSS styles
import App from './App'; // Importing the main App component
import { ContextProvider } from './contexts/ContextProvider'; // Importing the ContextProvider for state management

// Rendering the App component within the ContextProvider and React.StrictMode
ReactDOM.render(
  <React.StrictMode> {/* Enables strict mode checks for the app */}
    <ContextProvider> {/* Provides context to the entire app */}
      <App /> {/* Main App component */}
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'), // Mounting the app to the DOM element with id 'root'
);
