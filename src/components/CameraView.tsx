// src/components/CameraView.tsx
import React from 'react';
import { useCamera } from '../hooks/useCamera';
import Header from './Header';

const CameraView: React.FC = () => {
    const videoRef = useCamera();

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                position: 'relative',
                backgroundColor: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '60px',
                boxSizing: 'border-box',
            }}
        >
            <Header />
            <video
                ref={videoRef}
                style={{
                    width: '90vw',
                    height: '75vh',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px rgba(255,255,255,0.1)',
                }}
                autoPlay
                playsInline
                muted
            />
        </div>
    );
};

export default CameraView;
