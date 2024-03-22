import YellowBell from '../../assets/image/YellowBell.png'

const Notice = () => {
  return (
    
    <div className="flex justify-center pt-5 px-5">
      <div className="w-full h-[32px] border-none bg-Stickey_Gray rounded flex flex-row items-center gap-1">
        <img src={YellowBell} className="w-5 h-5 ml-2"/>
        <p className="text-red-600 text-[12px]">[TIP]</p>
        <p className="text-[12px]">IOS 서비스 미지원임.</p>
      </div>
    </div>
  )
}

export default Notice;