import { SponsorItemData } from "../../pages/Sponsor/SponsorPage";

const SponsorItem = ({data} : {data: SponsorItemData}) => {
    return (
            <div className="flex flex-col">
                <p className="bg-gray-300 h-28 rounded-tl-2xl rounded-tr-2xl"></p>
                <div className="bg-black bg-opacity-20 px-4 rounded-bl-2xl rounded-br-2xl">
                    <div className="flex items-center pt-2">
                        <p className="bg-gray-500 w-6 h-6 rounded-full"></p>
                        <p className="text-white text-sm pl-2">{data.title}</p>
                    </div>
                    <div>
                        <p className="text-white text-[10px] p-1 text-left">{data.start_date} ~ {data.end_date}</p>
                    </div>
                    <div className="pt-1 pb-4">
                        <div className="w-full h-2 bg-white rounded-xl "></div>
                    </div>
                </div>
 
        </div>
    )
} 

export default SponsorItem;