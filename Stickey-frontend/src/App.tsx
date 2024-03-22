import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import PaymentHistoryPage from './pages/Profile/Personal/Payment/PaymentHistory';
import DreamHistoryPage from './pages/Profile/Personal/Dream/DreamHistoryPage';
import ProfileEditPage from './pages/Profile/ProfileEditPage';
import PlayerListPage from './pages/Profile/Group/PlayerList/PlayerListPage';
import SponsorDetailPage from './pages/Sponsor/SponsorDetailPage/SponsorDetailPage';
import SponListPage from './pages/Profile/Group/SponList/SponListPage';
import TicketEditPage from './pages/MyTicket/TicketEdit/TicketEditPage';
import SponsorCreatePage from './pages/Sponsor/SponsorCreatePage/SponsorCreatePage';


const router = createBrowserRouter(
  [
    {
      path:'/',
      element: <HomePage />
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
      element: <AlarmPage />
    },
    {
      path:'/:id/section',
      element: <BookSectionPage />
    },
    {
      path:'/:id/seat',
      element: <BookSeatPage />
    },
    {
      path:'/:id/payment',
      element: <BookPaymentPage />
    },
    {
      path:'/:id/confirm',
      element: <BookConfirmPage />
    },
    {
      path:'/mytickets',
      element: <MyTicketPage />
    },
    {
      path:'/mytickets/:id/edit',
      element: <TicketEditPage />
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
      element: <SponsorCreatePage />
    },
    // 단체랑 개인은 role로 구분할 것
    {
      path:'/profile',
      element: <ProfilePage />
    },
    {
      path:'/profile/playerlist',
      element: <PlayerListPage />
    },
    {
      path:'/profile/edit',
      element: <ProfileEditPage />
    },
    {
      path:'/profile/sponlist',
      element: <SponListPage />
    },
    {
      path:'/profile/dreamhistory',
      element: <DreamHistoryPage />
    },
    {
      path:'/profile/paymenthistory',
      element: <PaymentHistoryPage />
    },
  ]
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
