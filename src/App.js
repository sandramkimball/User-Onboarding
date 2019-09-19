import React from 'react';
import '/App.css';
import Form from './components/Form';

function App(){
    return(
        <div className='app'>
            <header className='app-header'>
                <h1>Welcome, Gorgeous</h1>
            </header>
            <body className='app-body'>
                <Form/>
            </body>
        </div>
    );
}

export default App;