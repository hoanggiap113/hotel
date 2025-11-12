// ProgressBar.tsx đã sửa để mô phỏng Ant Design Steps (Visual-Only)
import React from 'react';

// Icon checkmark đơn giản (có thể thay bằng SVG nếu muốn)
const CheckIcon = () => (
    <svg 
        className="h-5 w-5 fill-white" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
    </svg>
);

interface ProgressBarProps {
    stage: number;
}

export default function ProgressBar({ stage }: ProgressBarProps) {

    const getStageStyle = (targetStage: number) => {
        if (stage > targetStage) {
            return "bg-green-500 text-white"; 
        } else if (stage === targetStage) {
            return "bg-blue-600 text-white"; 
        } else {
            return "bg-gray-200 text-gray-500"; 
        }
    };
    
    // Tách phần tử thành một Component con để tái sử dụng
    const StageItem = ({ number }: { number: number }) => (
        <div 
            className={`flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold transition-colors duration-200 ${getStageStyle(number)}`}
        >
            {stage > number ? <CheckIcon /> : number}
        </div>
    );

    const Separator = ({ targetStage }: { targetStage: number }) => (
        <div 
            className={`h-0.5 flex-1 mx-2 transition-colors duration-200 ${stage > targetStage ? "bg-green-500" : "bg-gray-300"}`}
        />
    );

    return (
        <div className="flex w-full items-center justify-center max-w-sm mx-auto">
            <StageItem number={1} />
            
            <Separator targetStage={1} />

            <StageItem number={2} />

            <Separator targetStage={2} />
            
            <StageItem number={3} />
        </div>
    );
}