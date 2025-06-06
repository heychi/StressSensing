// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
    return (
        <header
            style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '60px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                zIndex: 10,
            }}
        >
            <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Stress Status</h1>
            <div style={{ fontSize: '1.5rem', cursor: 'pointer' }}>☰</div>
        </header>
    );
};

export default Header;
