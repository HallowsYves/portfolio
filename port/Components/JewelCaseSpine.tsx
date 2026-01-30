const JewelCaseSpine = ({ disc, onClick, disabled }: { disc: any, onClick: any, disabled: boolean }) => (
  <button
    onClick={() => !disabled && onClick(disc)}
    className={`group relative h-full w-12 md:w-16 transition-all duration-500 ease-out flex flex-col items-center justify-center border-r border-white/10 shadow-2xl ${disabled ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:w-20 md:hover:w-24 cursor-pointer hover:z-10'}`}
  >
    <div className={`absolute inset-0 bg-gradient-to-b ${disc.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
    <div className="relative z-10 h-full flex flex-col items-center py-8 justify-between">
      <span className="[writing-mode:vertical-rl] text-[10px] font-bold tracking-widest text-black/60 uppercase">Vol. {disc.year}</span>
      <h3 className="[writing-mode:vertical-rl] text-sm md:text-base font-black tracking-widest text-white drop-shadow-md whitespace-nowrap">{disc.title}</h3>
      <div className="w-1 h-8 bg-black/20 rounded-full" />
    </div>
  </button>
);

export default JewelCaseSpine;