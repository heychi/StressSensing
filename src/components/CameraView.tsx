// src/components/CameraView.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs-backend-webgl';
import Header from './Header';
import { useCamera } from '../hooks/useCamera';

const STRESS_THRESHOLD = 5; // 예시: 5명 이상이면 High 스트레스

const CameraView: React.FC = () => {
    const videoRef = useCamera();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [count, setCount] = useState(0);
    const [stress, setStress] = useState<'Low' | 'High'>('Low');

    useEffect(() => {
        let model: cocoSsd.ObjectDetection | null = null;
        let detectInterval: number;

        const setupModel = async () => {
            model = await cocoSsd.load();
            // 모델 로드 후 감지 루프 시작
            detectInterval = window.setInterval(detectFrame, 500);
        };

        const detectFrame = async () => {
            if (!model || !videoRef.current || videoRef.current.readyState !== 4) return;
            const predictions = await model.detect(videoRef.current);
            // 사람(class='person') 만 필터
            const persons = predictions.filter(p => p.class === 'person');
            setCount(persons.length);
            setStress(persons.length >= STRESS_THRESHOLD ? 'High' : 'Low');
            drawDetections(persons);
        };

        const drawDetections = (persons: cocoSsd.DetectedObject[]) => {
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext('2d')!;
            // 캔버스 초기화
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 사람 위치마다 붉은 점
            persons.forEach(p => {
                const [x, y, w, h] = p.bbox;
                const cx = x + w / 2;
                const cy = y + h / 2;
                const radius = Math.max(5, (w + h) / 50);
                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
                ctx.fillStyle = 'red';
                ctx.fill();
            });
        };

        setupModel();

        return () => {
            if (detectInterval) clearInterval(detectInterval);
        };
    }, [videoRef]);

    return (
        <div
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                backgroundColor: '#000',
                overflow: 'hidden',
            }}
        >
            {/* 헤더 */}
            <Header />

            {/* 비디오 + 캔버스 오버레이 */}
            <div
                style={{
                    position: 'absolute',
                    top: '60px', // 헤더 높이
                    left: 0,
                    right: 0,
                    bottom: '150px', // 아래 정보창 공간 남김
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <video
                    ref={videoRef}
                    style={{
                        width: '90vw',
                        height: '75vh',
                        objectFit: 'cover',
                        borderRadius: '12px',
                    }}
                    autoPlay
                    playsInline
                    muted
                />
                <canvas
                    ref={canvasRef}
                    width={window.innerWidth * 0.9}
                    height={window.innerHeight * 0.75}
                    style={{
                        position: 'absolute',
                        width: '90vw',
                        height: '75vh',
                        pointerEvents: 'none',
                        borderRadius: '12px',
                    }}
                />
            </div>

            {/* 하단 정보창 */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '150px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    fontSize: '1.1rem',
                    padding: '0 16px',
                    boxSizing: 'border-box',
                }}
            >
                <div>
                    <div style={{ fontWeight: 'bold' }}>현재 스트레스 상태</div>
                    <div>{stress}</div>
                </div>
                <div>
                    <div style={{ fontWeight: 'bold' }}>현재 인원 수</div>
                    <div>{count} 명</div>
                </div>
            </div>
        </div>
    );
};

export default CameraView;
