const FloatingBubbles = () => {
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-primary/10 backdrop-blur-sm animate-float"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: '-100px',
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;
