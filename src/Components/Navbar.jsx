import React from 'react';

export const Navbar = ({ navBarItems, handleNav }) => {
    return (
        <div className="navbar">
            {navBarItems.length > 0 && 
            navBarItems.map(( item,i ) => (
                <div key={i}>
                    <a 
                        onClick={() => handleNav(item)}
                        href="#;" 
                        className={`${item.isActive ? 'navbarActive' : ''}`}
                    >
                        {item.name}
                    </a>
                </div>
            ))}
        </div>
    )
};