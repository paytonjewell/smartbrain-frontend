import React from 'react';

function Navigation({onSignOut}) {
    return (
        <nav className={'flex justify-end'}>
            <p onClick={onSignOut} className={'f4 dim black underline pa3 pointer'}>Sign Out</p>
        </nav>
    );
}

export default Navigation;