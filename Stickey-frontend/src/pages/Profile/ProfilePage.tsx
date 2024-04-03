import Header, { IHeaderInfo } from '../../components/@common/Header';
import NavigationBar from '../../components/@common/NavigationBar';
import Bell from '../../assets/image/Bell.png';
import { useProfile } from '../../hooks/Profile/useProfile';
import UserProfile from '../../components/Profile/User/UserProfile';
import GroupProfile from '../../components/Profile/Group/GroupProfile';
import UserMenu from '../../components/Profile/User/UserMenu';
import YellowBell from '../../assets/image/YellowBell.png';
import GroupMenu from '../../components/Profile/Group/GroupMenu';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const { useGetProfile } = useProfile();

  const { data: userProfileInfo, isSuccess, refetch } = useGetProfile();
  if (isSuccess) {
    if (userProfileInfo.data.role === 'ADMIN') {
      return <Navigate to={'/admin'} replace={true} />;
    }
  }
  const info: IHeaderInfo = {
    left_1: null,
    left_2: null,
    center: '프로필',
    right: <img src={Bell} />,
  };
  if (!userProfileInfo) return null;

  // role에 따라 조건부 랜더링으로 컴포넌트를 구분
  return (
    <>
      <Header info={info} />
      <div className="pt-16 h-screen">
        {userProfileInfo?.data.role === 'INDIVIDUAL' ? (
          <>
            <UserProfile userInfo={userProfileInfo.data} />

            {/* 안내 문구 섹션 */}
            <div className="flex justify-center pb-2 px-4">
              <div className="w-full h-auto py-2 border-none bg-Stickey_Gray rounded-md flex flex-row items-center gap-1">
                <img src={YellowBell} className="w-5 h-5 ml-2" />
                <p className="text-red-600 font-bold text-sm">[ Notice ]</p>
                <p className="text-xs">2024.04.13 서울 FC 경기 취소 안내</p>
              </div>
            </div>

            <UserMenu refetch={refetch} />
          </>
        ) : (
          <>
            <GroupProfile groupInfo={userProfileInfo?.data} />

            {/* 안내 문구 섹션 */}
            <div className="flex justify-center pb-2 px-5">
              <div className="w-full h-auto py-2 border-none bg-Stickey_Gray rounded-md flex flex-row items-center gap-1">
                <img src={YellowBell} className="w-5 h-5 ml-2" />
                <p className="text-red-600 font-bold text-sm">[ TIP ]</p>
                <p className="text-xs">단체 후원 등록 유의사항 안내</p>
              </div>
            </div>

            <GroupMenu status={userProfileInfo.data.status === 'ACCEPTED'} />
          </>
        )}
      </div>

      <NavigationBar />
    </>
  );
};

export default ProfilePage;
