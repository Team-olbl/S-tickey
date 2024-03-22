import React from "react";

export type ProfileProps = {
  teamNames: string[];
}

const Profile: React.FC<ProfileProps> = ({ teamNames }) => {
  return (
    <div className="flex justify-center">
        <div className="flex flex-row gap-3 max-w-[500px] w-full h-[60px] border-none px-6">
          <div className="w-[56px] h-[56px] rounded-full border border-none bg-Stickey_Gray"></div>
          <div className="flex flex-col gap-2">
            <p className="text-[20px] text-white font-semibold">사용자</p>
            <div className="flex flex-row">
            { teamNames.map((teamName, id) => (
              <div key={id} className="p-1 px-2 border border-none font-bold bg-[#E4E4E4] text-[#5959E7] text-[8px] flex items-center justify-center rounded-xl mr-2">
                <p className="">{teamName}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;
