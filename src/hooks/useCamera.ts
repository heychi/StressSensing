// src/hooks/useCamera.ts
import { useEffect, useRef } from 'react';

export const useCamera = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }, // 후면 카메라
                    audio: false,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('카메라 접근 실패:', err);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current?.srcObject instanceof MediaStream) {
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return videoRef;
};
