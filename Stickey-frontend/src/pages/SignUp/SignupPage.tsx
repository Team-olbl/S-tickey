import Header, { IHeaderInfo } from "../../components/@common/Header";
import Back from '../../assets/image/Back.png'
import Bell from '../../assets/image/Bell.png'
import Individual from '../../assets/image/individual.png'
import Organization from '../../assets/image/organization.png'
import NavigationBar from "../../components/@common/NavigationBar";
import { useState } from "react";
import IndividualForm from "../../components/Signup/IndividualForm";
import OrganizationForm from "../../components/Signup/OrganizationForm";

const SignupPage = () => {
  const info: IHeaderInfo = {
    left_1:  null,
    left_2: <img src={Back} alt="" />,
    center: '회원가입',
    right: <img src={Bell} alt="" />
  }

  const [selectedType, setSelectedType] = useState("");

  const handleUserType = (type: string) => {
    if (selectedType === type) {
      setSelectedType("");
    } else {
      setSelectedType(type);
    }
  };

  console.log(selectedType)

  const renderForm = () => {
    switch(selectedType) {
      case 'individual':
        return <IndividualForm />;
      case 'organization':
        return <OrganizationForm />;
      default:
        return null;
    }
  };

  const [formState, setFormState] = useState<boolean>(false);

  const handleFormState = () => {
    setFormState(true)
  }
  return (
    <>
      <div className="top-0 bottom-0 h-screen bg-white">
        <Header info={info} />

        { !formState ? <>          
        <div className="pt-20 px-4 text-center text-xs">
            <p>회원 유형을 선택해주세요</p>
            <div className="pt-8 flex justify-center">
              <div className={`px-6 py-2 border ${selectedType === "individual" ? 'border-Stickey_Main' : 'border-Stickey_Gray'} rounded-2xl mx-2 cursor-pointer`} onClick={() => handleUserType('individual')}>
                <img src={Individual} className="w-16 py-2" />
                <p className="text-[10px] pb-4">개인 회원</p>
              </div>
              <div className={`px-6 py-2 border ${selectedType === "organization" ? 'border-Stickey_Main' : 'border-Stickey_Gray'} rounded-2xl mx-2 cursor-pointer`} onClick={() => handleUserType('organization')}>
                <img src={Organization} className="w-16 py-2" />
                <p className="text-[10px] pb-4">단체 회원</p>
              </div>
            </div>
          </div>

          <div className="fixed bottom-16 w-full max-w-[360px] m-auto px-4">
            <button className={`bg-Stickey_Main w-full text-white rounded-xl p-2 text-md ${selectedType ? '' : 'opacity-50 cursor-not-allowed'}`} disabled={!selectedType} onClick={() => handleFormState()}>다음</button>
          </div>

          </>
         :
         <div>{renderForm()}</div>}

        <NavigationBar />
      </div>
    </>
  )
}

export default SignupPage;
