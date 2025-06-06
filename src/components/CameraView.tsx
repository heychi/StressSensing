// src/components/CameraView.tsx
import React from 'react';
import { useCamera } from '../hooks/useCamera';

const CameraView: React.FC = () => {
    const videoRef = useCamera();

    return (
        <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000' }}>
            <video
                ref={videoRef}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                autoPlay
                playsInline
                muted
            />
        </div>
    );
};

export default CameraView;
