import {create} from 'zustand';

export interface ITicket {
    id: number;
    gameStartTime: Date;
    stadium: string;
    homeTeam: string;
    awayTeam: string;
    category: string;
    poster: string;
    areaId: string;
    seatNum: number;
    price: number;
    filterId: number;
    backGroundId: number;
}

export interface ITicketStore {
    tickets: ITicket[];
    showUpcoming: boolean;
    toggleShowUpcoming: () => void;
}

export const useTicketSort = create<ITicketStore>((set) => ({
    tickets: [],
    showUpcoming: false,
    toggleShowUpcoming: () => set((state) => ({ showUpcoming: !state.showUpcoming })),
}));

// 더미 데이터 추가
useTicketSort.getState().tickets = [
    {
        id: 1,
        gameStartTime: new Date('2024-03-22T08:00:00'),
        stadium: 'Stadium A',
        homeTeam: 'Home Team A',
        awayTeam: 'Away Team A',
        category: 'Football',
        poster: '',
        areaId: 'S구역 2',
        seatNum: 23,
        price: 50000,
        filterId: 1,
        backGroundId: 1
    },
    {
        id: 2,
        gameStartTime: new Date('2024-03-23T15:00:00'),
        stadium: 'Stadium B',
        homeTeam: 'Home Team B',
        awayTeam: 'Away Team B',
        category: 'Basketball',
        poster: '',
        areaId: 'S구역 2',
        seatNum: 45,
        price: 40000,
        filterId: 2,
        backGroundId: 2
    },
    {
        id: 3,
        gameStartTime: new Date('2024-03-24T18:30:00'),
        stadium: 'Stadium C',
        homeTeam: 'Home Team C',
        awayTeam: 'Away Team C',
        category: 'Soccer',
        poster: '',
        areaId: 'S구역 2',
        seatNum: 2,
        price: 60000,
        filterId: 3,
        backGroundId: 3
    },
    {
        id: 4,
        gameStartTime: new Date('2024-03-25T20:00:00'),
        stadium: 'Stadium D',
        homeTeam: 'Home Team D',
        awayTeam: 'Away Team D',
        category: 'Baseball',
        poster: '',
        areaId: 'S구역 2',
        seatNum: 3,
        price: 70000,
        filterId: 4,
        backGroundId: 4
    },
    {
        id: 5,
        gameStartTime: new Date('2024-03-26T12:00:00'),
        stadium: 'Stadium E',
        homeTeam: 'Home Team E',
        awayTeam: 'Away Team E',
        category: 'Tennis',
        poster: '',
        areaId: 'S구역 2',
        seatNum: 14,
        price: 80000,
        filterId: 5,
        backGroundId: 5
    }
];
