import React from 'react';
import logo from '../images/mesto-logo.svg';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <>
      <div className="page">
        <Header logo={logo} />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default App;
