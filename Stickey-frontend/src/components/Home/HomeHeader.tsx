const HomeHeader = () => {
  return (
    <div className=" w-[360px] h-[48px] flex flex-row items-center justify-center border-b-[0.5px] border-white gap-[240px]">
      <p className="font-sans font-extrabold italic text-white">S:tickey</p>
      <button>
        <img src="src/assets/Alarm/bell.png" alt="Alarm" className="w-[32px] h-[32px]"/>
      </button>
    </div>
  )
}

export default HomeHeader;