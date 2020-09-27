import { some } from "../../../constants";

export const generalCompanySize = [
  { from: 1, to: 19 },
  { from: 20, to: 49 },
  { from: 50, to: 99 },
  { from: 100, to: 199 },
  { from: 200, to: 499 },
  { from: 500, to: 1000 },
];
export const fakeInvoiceStatus = [
  { id: undefined, name: 'global.all' },
  { id: 1, name: 'global.unSendRequest' },
  { id: 2, name: 'global.waitingHandle' },
  { id: 3, name: 'global.handling' },
  { id: 4, name: 'global.handled' },
  { id: 5, name: 'global.cancel' },
];
export const transactionsTypeData = [
  { id: 1, name: 'global.withDraw' },
  { id: 2, name: 'global.recharge' },
];

export const transactionsStatusData = [
  { id: 1, name: 'global.success' },
  { id: 2, name: 'global.waitingPayment' },
  { id: 3, name: 'global.fail' },
  { id: 4, name: 'global.canceled' },
];

export const departmentOptions = [
  {
    id: 1,
    name: 'department.ITDept',
  },
  {
    id: 2,
    name: 'department.directorDept',
  },
  {
    id: 3,
    name: 'department.securityDept',
  },
  {
    id: 4,
    name: 'department.adminDept',
  },
  {
    id: 5,
    name: 'department.HRDept',
  },
  {
    id: 6,
    name: 'department.accountingDept',
  },
  {
    id: 7,
    name: 'department.salesDept',
  },
];

export const roleOptions: some[] = [
  { value: 'TRIPI_ONE_OWNER', name: 'Owner' },
  { value: 'TRIPI_ONE_ADMIN', name: 'Admin' },
  { value: 'TRIPI_ONE_STAFF', name: 'User' },
];

export const approvalStatusOptions = [
  { id: undefined, name: 'global.all' },
  {
    id: 1,
    name: 'tripManagement.approved',
  },
  {
    id: 2,
    name: 'global.waitingApproval',
  },
  {
    id: 3,
    name: 'tripManagement.rejected',
  },
];
export const tripApprovalStatusOptions = [
  { id: undefined, name: 'all' },
  {
    id: 0,
    name: 'tripManagement.initialize',
  },
  {
    id: 1,
    name: 'tripManagement.sentRequest',
  },
  {
    id: 2,
    name: 'tripManagement.approving',
  },
  {
    id: 3,
    name: 'tripManagement.approved',
  },
  {
    id: 4,
    name: 'tripManagement.rejected',
  },
];
export const paymentStatusOptions = [
  { id: undefined, name: 'global.all' },
  {
    id: 0,
    name: 'global.waitingPayment',
  },
  {
    id: 1,
    name: 'global.success',
  },
  {
    id: 2,
    name: 'global.fail',
  },
];
export const generalFlight = {
  airlines: [
    {
      logo:
        'https://storage.googleapis.com/tripi-flights/agenticons/VietnamAirlines_logo_transparent.png',
      name: 'Vietnam Airlines',
      id: 1,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/bamboo_airway.png',
      name: 'Bamboo Airways',
      id: 2,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Jetstar_logo_transparent.png',
      name: 'Jetstar Airways',
      id: 3,
    },
    {
      logo:
        'https://storage.googleapis.com/tripi-flights/agenticons/Vietjet_Air_logo_transparent.png',
      name: 'VietJet Air',
      id: 4,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Air_Asia.png',
      name: 'AirAsia',
      id: 9,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Qatar_Airways.png',
      name: 'Qatar Airways',
      id: 11,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Singapore_airlines.png',
      name: 'Singapore Airlines',
      id: 13,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Cathay_pacific.png',
      name: 'Cathay Pacific',
      id: 14,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Thai_Airways.png',
      name: 'Thai Airways',
      id: 15,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Asiana.png',
      name: 'Asiana Airlines',
      id: 16,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/China_Southern_Airlines.png',
      name: 'China Southern Airlines',
      id: 17,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/korean_airway.png',
      name: 'Korean Air',
      id: 18,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/tiger_air_way.png',
      name: 'Tiger Air',
      id: 19,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/silkair_logo.png',
      name: 'Silk Air',
      id: 20,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Emirates.png',
      name: 'Emirates Airlines',
      id: 21,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Turkish_Airlines.png',
      name: 'Turkish Airlines',
      id: 22,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Lufthansa.png',
      name: 'Lufthansa',
      id: 23,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Air_France.png',
      name: 'Air France',
      id: 24,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Dragonair.png',
      name: 'Dragonair',
      id: 25,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Hong_kong_Airlines.png',
      name: 'Hong Kong Airlines',
      id: 26,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/China_airway.png',
      name: 'China Airlines',
      id: 27,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Swiss_Airlines.png',
      name: 'Swiss International',
      id: 28,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Philippine_Airlines.png',
      name: 'Philippine Airlines',
      id: 29,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/KLM.png',
      name: 'KLM',
      id: 30,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Etihad_airways.png',
      name: 'Etihad Airways',
      id: 31,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Japan_Airlines.png',
      name: 'Janpan Airlines',
      id: 41,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Shanghai_Airlines.png',
      name: 'Shanghai Airlines',
      id: 42,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Air_Macau.png',
      name: 'Air Macau',
      id: 43,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Cambodia_Angkor_Air.png',
      name: 'Cambodia Angkor Air',
      id: 44,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/United_Airlines.png',
      name: 'United Airlines',
      id: 45,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Hainan_Airlines.png',
      name: 'Hainan Airlines',
      id: 46,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Eva_Airways.png',
      name: 'Eva Airways',
      id: 47,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Malindo_Air.png',
      name: 'Malindo Air',
      id: 48,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Xiamen_Air.png',
      name: 'Xiamen Airlines',
      id: 49,
    },
    {
      logo:
        'https://storage.googleapis.com/tripi-flights/agenticons/Hong_Kong%20Express_Airways.png',
      name: 'Hong Kong Express Airways',
      id: 50,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Malaysia_Airlines.png',
      name: 'Malaysia Airlines',
      id: 51,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Air_China.png',
      name: 'Air China',
      id: 52,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/American_airlines.png',
      name: 'American Airlines',
      id: 53,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Aeroflot_Russian.png',
      name: 'Aeroflot Airlines',
      id: 54,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Mandarin_airlines.png',
      name: 'Mandarin Airlines',
      id: 55,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Lao_Airlines.png',
      name: 'Lao Airlines',
      id: 56,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/China_Eastern_Airlines.png',
      name: 'China Eastern Airlines',
      id: 57,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Jeju_air.png',
      name: 'Jeju Air',
      id: 58,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Bangkok_Airways.png',
      name: 'Bangkok Airways',
      id: 59,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/All_Nippon%20Airways.png',
      name: 'All Nippon Airways',
      id: 60,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/LQ.png',
      name: 'Lanmei Airlines',
      id: 61,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/ZH.png',
      name: 'Shenzhen Airlines',
      id: 62,
    },
    {
      logo: 'http://www.airindia.in/Images/new-logo.png',
      name: 'Air India',
      id: 69,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Jetstar_logo_transparent.png',
      name: 'Jetstar Asia Airways',
      id: 70,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Ethiopian_airlines.png',
      name: 'Ethiopian Airlines',
      id: 72,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Sichuan_Airlines.png',
      name: 'Sichuan Airlines',
      id: 73,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Thai_Lion.jpg',
      name: 'Thai Lion',
      id: 75,
    },
    {
      logo: 'https://storage.googleapis.com/tripi-flights/agenticons/Tway.png',
      name: 'Tway Air',
      id: 78,
    },
  ],
  ticketClass: [
    {
      id: 1,
      code: 'economy',
      name: 'Economy',
      viName: 'Phổ Thông',
    },
    {
      id: 2,
      code: 'premium_economy',
      name: 'Premium Economy',
      viName: 'Phổ Thông Đặc Biệt',
    },
    {
      id: 3,
      code: 'business',
      name: 'Business',
      viName: 'Thương Gia',
    },
    {
      id: 4,
      code: 'first',
      name: 'First Class',
      viName: 'Hạng Nhất',
    },
  ],
};
