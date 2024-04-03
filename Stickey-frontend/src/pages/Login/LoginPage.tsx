import Header, { IHeaderInfo } from "../../components/@common/Header";
import Back from '../../assets/image/Back.png'
import NavigationBar from "../../components/@common/NavigationBar";
import Bell from '../../assets/image/Bell.png'
import TabBar from "../../components/@common/TabBar";
import LoginForm from "../../components/Login/LoginForm";
import { useState } from "react";

const LoginPage = () => {

  const [selectedTab, setSelectedTab] = useState('개인회원');

  const info : IHeaderInfo = {
    left_1:  null,
    left_2: <img src={Back} alt="" />,
    center:'로그인',
    right: <img src={Bell} alt="" />
  }

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return(
    <>
    <div className="top-0 bottom-0 h-screen bg-white">
      <Header info={info} />
      <div>
        <TabBar leftTab="개인회원" rightTab="단체회원" onTabChange={handleTabChange} />
        <LoginForm selectedTab={selectedTab} />
      </div>
      <NavigationBar />
    </div>
    </>
  )
}

export default LoginPage;