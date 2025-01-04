const CommentBubble = ({ size, left, speed, delay, startY }: { size: string, left: number, speed: number, delay: number, startY: number }) => {
    return (
        <div
            className="absolute bg-white rounded-full opacity-70"
            style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: `${startY}px`, // Start from a random vertical position
                animation: `rise ${speed}s linear infinite`,
                animationDelay: `${delay}s`, // Random delay for each bubble
            }}
        />
    );
};

const generateBubbles = (count: number) => {
    const bubbles = [];
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1; // Size between 1px and 3px
        const left = Math.random() * 100; // Random horizontal position
        const speed = Math.random() * 8 + 20; // Speed between 20 and 28 seconds
        const delay = Math.random() * 5; // Random delay between 0 and 5 seconds
        const startY = Math.random() * 1000; // Random starting vertical position between 0 and 100px
        
        bubbles.push(
            <CommentBubble 
                key={i} 
                size={`${size}px`} 
                left={left} 
                speed={speed}
                delay={delay}
                startY={startY} // Pass the random starting vertical position
            />
        );
    }
    return bubbles;
};

export default function Bubbles() {
    return (
        <div>
            {generateBubbles(150)}
            <style>{`
                @keyframes rise {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-100vh); /* Move up out of the view */
                    }
                }
            `}</style>
        </div>
    );
}