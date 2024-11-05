import React, { useRef, useCallback, useEffect } from 'react';

interface ResizableSliderProps {
    editorWidth: number;
    setEditorWidth: (width: number) => void;
}

const ResizableSlider: React.FC<ResizableSliderProps> = ({ editorWidth, setEditorWidth }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMouseDown = useCallback(() => {
        isDragging.current = true;
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging.current) return;
        const container = sliderRef.current?.parentElement;
        if (!container) return;
        const newWidth = (e.clientX / container.offsetWidth) * 100;
        setEditorWidth(Math.max(20, Math.min(76, newWidth))); // Change the maximum width % it can take, as we add more features (buttons)
    }, [setEditorWidth]);

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return (
        <div
            ref={sliderRef}
            className="w-1 bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors"
            onMouseDown={handleMouseDown}
        />
    );
};

export default ResizableSlider;