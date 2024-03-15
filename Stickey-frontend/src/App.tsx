import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import SoccerPage from './pages/Home/Soccer/SoccerPage';
import BaseBallPage from './pages/Home/BaseBall/BaseBallPage';
import BasketBallPage from './pages/Home/BasketBall/BasketBallPage';
import AlarmPage from './pages/Alarm/AlarmPage';
import BookPage from './pages/Book/BookPage';
import BookNoticePage from './pages/Book/BookNotice/BookNoticePage';
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
import PreferredTeamPage from './pages/Profile/Personal/PreferredTeam/PreferredTeamPage';
import ProfileEditPage from './pages/Profile/Edit/ProfileEditPage';
import PlayerListPage from './pages/Profile/Group/PlayerList/PlayerListPage';
import SponListPage from './pages/Profile/Group/SponList/SponListPage';
import TicketEditPage from './pages/MyTicket/TicketEdit/TicketEditPage';
import SponsorDetailPage from './pages/Sponsor/SponsorDetailPage/SponsorDetailPage';

const router = createBrowserRouter([
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
    path:'/book',
    element: <BookPage />
  },
  {
    path:'/book/notice',
    element: <BookNoticePage />
  },
  {
    path:'/book/section',
    element: <BookSectionPage />
  },
  {
    path:'/book/seat',
    element: <BookSeatPage />
  },
  {
    path:'/book/payment',
    element: <BookPaymentPage />
  },
  {
    path:'/book/confirm',
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
    // 단체랑 개인은 role로 구분할 것
    path:'/profile',
    element: <ProfilePage />
  },
  {
    path:'/profile/payment',
    element: <PaymentHistoryPage />
  },
  {
    path:'/profile/dream',
    element: <DreamHistoryPage />
  },
  {
    path:'/profile/preferred',
    element: <PreferredTeamPage />
  },
  {
    path:'/profile/edit',
    element: <ProfileEditPage />
  },
  {
    path:'/profile/player',
    element: <PlayerListPage />
  },
  {
    path:'/profile/sponlist',
    element: <SponListPage />
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
