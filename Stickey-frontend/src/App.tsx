import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import SoccerPage from './pages/Home/Soccer/SoccerPage';
import BaseBallPage from './pages/Home/BaseBall/BaseBallPage';
import BasketBallPage from './pages/Home/BasketBall/BasketBallPage';
import AlarmPage from './pages/Alarm/AlarmPage';
import BookSectionPage from './pages/Book/BookDetail/BookSectionPage';
import BookSeatPage from './pages/Book/BookDetail/BookSeatPage';
import BookPaymentPage from './pages/Book/BookDetail/BookPaymentPage';
import BookConfirmPage from './pages/Book/BookConfirm/BookConfirmPage';
import MyTicketPage from './pages/MyTicket/MyTicketPage';
import SignupPage from './pages/SignUp/SignupPage';
import LoginPage from './pages/Login/LoginPage';
import SponsorPage from './pages/Sponsor/SponsorPage';
import ProfilePage from './pages/Profile/ProfilePage';
import PaymentHistoryPage from './pages/Profile/User/PaymentHistory';
import DreamHistoryPage from './pages/Profile/User/DreamHistoryPage';
import ProfileEditPage from './pages/Profile/User/ProfileEditPage';
import PlayerListPage from './pages/Profile/Group/PlayerListPage';
import SponsorDetailPage from './pages/Sponsor/SponsorDetailPage/SponsorDetailPage';
import SponListPage from './pages/Profile/Group/SponListPage';
import TicketEditPage from './pages/MyTicket/TicketEdit/TicketEditPage';
import SponsorCreatePage from './pages/Sponsor/SponsorCreatePage/SponsorCreatePage';
import GroupProfileEditPage from './pages/Profile/Group/GroupProfileEditPage';
import PlayerRegistration from './pages/Profile/Group/PlayerRegistrationPage';
import BlockchainTest from "./pages/Admin/BlockchainTest";
import userStore from './stores/userStore';
import AdminPage from './pages/Admin/AdminPage';
import { useEffect } from 'react';
import { EventSourcePolyfill, NativeEventSource  } from "event-source-polyfill";
import { toast } from 'react-toastify';
import useNotifyStore from './stores/useNotifyStore';
import useNotifyReadStore from './stores/useNotifyReadStore';
import SplashPage from './pages/Splash/SplashPage';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const isLogin = userStore((state) => state.isLogin);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter(
  [
    {
      path:'/',
      element: <HomePage />
    },
    {
      path:'/welcome',
      element: <SplashPage />
    },
    {
      path:'/admin',
      element: <AdminPage />
    },
    {
      path:'/soccer',
      element: <SoccerPage />
    },
    {
      path:'/baseball',
      element: <BaseBallPage />
    },
    {
      path:'/basketball',
      element: <BasketBallPage />
    },
    {
      path:'/alarm',
      element: (
        <AuthWrapper>
          <AlarmPage/>
        </AuthWrapper>
      ) 
    },
    {
      path:'/:id/section',
      element:  (
        <AuthWrapper>
          <BookSectionPage />
        </AuthWrapper>
      )
    },
    {
      path:'/:id/seat',
      element: (
        <AuthWrapper>
          <BookSeatPage />
        </AuthWrapper>
      )
    },
    {
      path:'/:id/payment',
      element: (
        <AuthWrapper>
          <BookPaymentPage /> 
        </AuthWrapper>
      )
    },
    {
      path:'/:id/confirm',
      element: (
        <AuthWrapper>
          <BookConfirmPage /> 
        </AuthWrapper>
      ) 
    },
    {
      path:'/mytickets',
      element: (
        <AuthWrapper>
          <MyTicketPage />
        </AuthWrapper>
      )
    },
    {
      path:'/mytickets/:id/edit',
      element: (
        <AuthWrapper>
          <TicketEditPage /> 
        </AuthWrapper>
      )
    },
    {
      path:'/signup',
      element: <SignupPage />
    },
    {
      path:'/login',
      element: <LoginPage />
    },
    {
      path:'/sponsor',
      element: <SponsorPage />
    },
    {
      path:'/sponsor/:id',
      element: <SponsorDetailPage />
    },
    {
      path:'/sponsor/create',
      element: (
        <AuthWrapper>
          <SponsorCreatePage /> 
        </AuthWrapper>
      )
    },
    // 단체랑 개인은 role로 구분할 것
    {
      path:'/profile',
      element: (
        <AuthWrapper>
          <ProfilePage /> 
        </AuthWrapper>
      )
    },
    {
      path:'/profile/playerlist',
      element: (
        <AuthWrapper>
          <PlayerListPage />
        </AuthWrapper>
      )
    },
    {
      path:'/profile/playerlist/register',
      element: (
        <AuthWrapper>
          <PlayerRegistration />
        </AuthWrapper>
      ) 
    },
    {
      path:'/profile/edit',
      element: (
        <AuthWrapper>
          <ProfileEditPage />
        </AuthWrapper>
      )   
    },
    {
      path:'/profile/group/edit',
      element: (
        <AuthWrapper>
          <GroupProfileEditPage />
        </AuthWrapper>
      )
    },
    {
      path:'/profile/sponlist',
      element: (
        <AuthWrapper>
          <SponListPage /> 
        </AuthWrapper>
      )
    },
    {
      path:'/profile/dreamhistory',
      element: (
        <AuthWrapper>
          <DreamHistoryPage />
        </AuthWrapper>
      )  
    },
    {
      path:'/profile/paymenthistory',
      element: (
        <AuthWrapper>
          <PaymentHistoryPage />
          </AuthWrapper>
      )  
    },
    {
      path:'/test',
      element: <BlockchainTest/> 
    },
  ]
)

function App() {
  const { accessToken, role, id } = userStore();
  const { addNotification } = useNotifyStore();
  const { setUnRead  } = useNotifyReadStore()
  
  useEffect(() => {
    if (!id) return;
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const fetchData = async () => {
      try {
        const sseUrl = import.meta.env.VITE_SSE_URL;
        const eventSource = new EventSource(sseUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          heartbeatTimeout: 120000,
        });

        eventSource.onopen = () => {
          console.log('SSE 연결됨');
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        eventSource.addEventListener('sse', function (event: any) {
          try {
            const notify = JSON.parse(event.data);
            console.log(notify.content);
            if (notify.userId == id) {
              if (role === 'INDIVIDUAL' && notify.notificationType === 'GAME') {
                addNotification(notify);
                setUnRead();
                toast.info('알람이 도착했습니다.');
              } else if (role !== 'INDIVIDUAL' && notify.notificationType === 'APPROVE') {
                addNotification(notify);
                setUnRead();
                toast.info('알람이 도착했습니다.');
              }
            }
          } catch (err) {
            return;
          }
        });

        eventSource.onerror = (error) => {
          console.error('SSE 오류:', error);
        };
      } catch (error) {
        console.error('SSE 연결 에러:', error);
      }
    };

    fetchData();
  }, [accessToken, role]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
