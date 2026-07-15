export default function AudioVisualizer({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end justify-center space-x-1 h-8 opacity-60">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-green-500 transition-all duration-100 ease-in-out ${isPlaying ? "animate-pulse" : "h-1"}`}
          style={{
            height: isPlaying ? `${Math.random() * 100}%` : "4px",
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}
