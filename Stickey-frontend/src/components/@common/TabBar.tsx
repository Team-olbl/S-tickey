import React, { useState } from 'react';

interface ProfileTabBarProps {
  leftTab: string;
  rightTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar: React.FC<ProfileTabBarProps> = ({ leftTab, rightTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(leftTab);

  const handleLeftTabClick = () => {
    setActiveTab(leftTab);
    onTabChange(leftTab);
  };

  const handleRightTabClick = () => {
    setActiveTab(rightTab);
    onTabChange(rightTab);
  };

  return (
    <div className="text-sm w-full flex relative pb-2 text-center pt-16 max-w-[500px]">
      <button
        onClick={handleLeftTabClick}
        className={activeTab === leftTab ? 'font-bold flex-1 text-Stickey_BGC' : 'text-gray-400 flex-1'}
      >
        <p>{leftTab}</p>
      </button>
      <button
        onClick={handleRightTabClick}
        className={activeTab === rightTab ? 'font-bold flex-1 text-Stickey_BGC' : 'text-gray-400 flex-1'}
      >
        <p>{rightTab}</p>
      </button>
      <button className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300">
        <div
          className={`${activeTab !== leftTab ? 'left-1/2' : 'left-0'} duration-500 ease-in-out relative bottom-[1px] z-10 w-1/2 h-[2px] bg-Stickey_BGC`}
        ></div>
      </button>
    </div>
  );
};

export default TabBar;
