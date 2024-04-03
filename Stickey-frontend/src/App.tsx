import './index.css';
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
import BlockchainTest from './pages/Admin/BlockchainTest';
import userStore from './stores/userStore';
import AdminPage from './pages/Admin/AdminPage';
import { useEffect } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { toast } from 'react-toastify';
import useNotifyStore from './stores/useNotifyStore';
import useNotifyReadStore from './stores/useNotifyReadStore';
import SplashPage from './pages/Splash/SplashPage';
import { WAITING_FLAG, changeFlag, getCancleReq } from './service/Book/api';
import useTicketStore from "./stores/useTicketStore";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const isLogin = userStore(state => state.isLogin);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const WaitingWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { clearSeatInfo } = useTicketStore();
  useEffect(() => {
    if (WAITING_FLAG.flag && WAITING_FLAG.id) {
      getCancleReq(WAITING_FLAG.id);
      clearSeatInfo();
      changeFlag(false, 0);
    }
  }, [WAITING_FLAG.flag])

  return <> {children} </>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/welcome'} replace={true} />,
  },
  {
    path: '/home',
    element: (
      <WaitingWrapper>
        <HomePage />
      </WaitingWrapper>
    ),
  },
  {
    path: '/welcome',
    element: (
      <WaitingWrapper>
        <SplashPage />
      </WaitingWrapper>
    ),
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/soccer',
    element: (
      <WaitingWrapper>
        <SoccerPage />
      </WaitingWrapper>
    ),
  },
  {
    path: '/baseball',
    element: (
      <WaitingWrapper>
        <BaseBallPage />
      </WaitingWrapper>
    ),
  },
  {
    path: '/basketball',
    element: (
      <WaitingWrapper>
        <BasketBallPage />
      </WaitingWrapper>
    ),
  },
  {
    path: '/alarm',
    element: (
      <WaitingWrapper>
        <AuthWrapper>
          <AlarmPage />
        </AuthWrapper>
      </WaitingWrapper>
    ),
  },
  {
    path: '/:id/section',
    element: (
      <AuthWrapper>
        <BookSectionPage />
      </AuthWrapper>
    ),
  },
  {
    path: '/:id/seat',
    element: (
      <AuthWrapper>
        <BookSeatPage />
      </AuthWrapper>
    ),
  },
  {
    path: '/:id/payment',
    element: (
      <AuthWrapper>
        <BookPaymentPage />
      </AuthWrapper>
    ),
  },
  {
    path: '/:id/confirm',
    element: (
      <WaitingWrapper>
        <AuthWrapper>
          <BookConfirmPage />
        </AuthWrapper>
      </WaitingWrapper>
    ),
  },
  {
    path: '/mytickets',
    element: (
      <WaitingWrapper>
        <AuthWrapper>
          <MyTicketPage />
        </AuthWrapper>
      </WaitingWrapper>
    ),
  },
  {
    path: '/mytickets/:id/edit',
    element: (
      <WaitingWrapper>
        <AuthWrapper>
          <TicketEditPage />
        </AuthWrapper>
      </WaitingWrapper>
    ),
  },
  {
    path: '/signup',
    element: (
      <WaitingWrapper>
        <SignupPage />
      </WaitingWrapper>
    ),
  },
  {
    path: '/login',
    element: (
      <WaitingWrapper>
        <LoginPage />
      </WaitingWrapper>
    ),
  },
  {
    path: '/sponsor',
    element: (
      <WaitingWrapper>
        <SponsorPage />
      </WaitingWrapper>
    ),
  },
  {
    path: '/sponsor/:id',
    element: (
      <WaitingWrapper>
        <SponsorDetailPage />
      </WaitingWrapper>
    ),
  },
  {
    path: '/sponsor/create',
    element: (
      <WaitingWrapper>
        <AuthWrapper>
          <SponsorCreatePage />
        </AuthWrapper>
      </WaitingWrapper>
    ),
  },
  // 단체랑 개인은 role로 구분할 것
  {
    path: '/profile',
    element: (
      <WaitingWrapper>
        <AuthWrapper>
          <ProfilePage />
        </AuthWrapper>
      </WaitingWrapper>
    ),
  },
  {
    path: '/profile/playerlist',
    element: (
      <WaitingWrapper>
        <AuthWrapper>
          <PlayerListPage />
        </AuthWrapper>
      </WaitingWrapper>
    ),
  },
  {
    path: '/profile/playerlist/register',
    element: (
      <WaitingWrapper>
        <AuthWrapper>
          <PlayerRegistration />
        </AuthWrapper>
      </WaitingWrapper>
    ),
  },
  {
    path: '/profile/edit',
    element: (
      <WaitingWrapper>
        <AuthWrapper>
          <ProfileEditPage />
        </AuthWrapper>
      </WaitingWrapper>
    ),
  },
  {
    path: '/profile/group/edit',
    element: (
      <WaitingWrapper>
        <AuthWrapper>
          <GroupProfileEditPage />
        </AuthWrapper>
      </WaitingWrapper>
    ),
  },
  {
    path: '/profile/sponlist',
    element: (
      <WaitingWrapper>
        <AuthWrapper>
          <SponListPage />
        </AuthWrapper>
      </WaitingWrapper>
    ),
  },
  {
    path: '/profile/dreamhistory',
    element: (
      <WaitingWrapper>
        <AuthWrapper>
          <DreamHistoryPage />
        </AuthWrapper>
      </WaitingWrapper>
    ),
  },
  {
    path: '/profile/paymenthistory',
    element: (
      <WaitingWrapper>
        <AuthWrapper>
          <PaymentHistoryPage />
        </AuthWrapper>
      </WaitingWrapper>
    ),
  },
  {
    path: '/test',
    element: <BlockchainTest />,
  },
]);

function App() {
  const { accessToken, role, id } = userStore();
  const { addNotification } = useNotifyStore();
  const { setUnRead } = useNotifyReadStore();

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

        eventSource.onerror = error => {
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
  );
}

export default App;
