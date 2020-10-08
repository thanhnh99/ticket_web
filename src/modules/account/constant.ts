export const fakeNotification = {
  code: 200,
  message: 'Success',
  data: {
    total: 133,
    numberNotiUnread: 3,
    notificationTypeList: [
      { id: 1, type: 'MARKETING', name: 'Khuyến mãi' },
      { id: 2, type: 'SYSTEM', name: 'Nhắc nhở' },
      { id: 3, type: 'CREDIT_CHANGING', name: 'Biến động số dư' },
      { id: 4, type: 'EXPORT_INVOICE', name: 'Hóa đơn' },
      { id: 5, type: 'ADVERTISING', name: 'Thông báo' },
      { id: 6, type: 'LOYALTY', name: 'Đổi thưởng' },
    ],
    notificationList: [],
  },
};
export const fakeNotificationDialog = {
  promotion: '[KM] Chương trình Book nhiệt tình - giảm hết mình ',
  date: '15:20 28/04/2020',
  pic: 'https://dathangtaobao.vn/wp-content/uploads/2018/10/a.jpg',
  context: 'abc',
  detail: [
    {
      context: 'Chi tiết cụ thể:',
    },
    {
      context: '- Giảm giá trực tiếp 35% mọi đơn hàng khách sạn khi đối tác nhập mã: HOT0317 ',
    },
    {
      context: '- Thời gian áp dụng: từ 17/03 đến hết 31/03/2020.',
    },
    {
      context: '- Giảm tối đa 500.000đ/roomnight. ',
    },
    {
      context: '- Giới hạn: 05 roomnight/ngày/Đối tác. ',
    },
    {
      context: 'Chi tiết cụ thể:',
    },
    {
      context: '- Giảm giá trực tiếp 35% mọi đơn hàng khách sạn khi đối tác nhập mã: HOT0317 ',
    },
    {
      context: '- Thời gian áp dụng: từ 17/03 đến hết 31/03/2020.',
    },
    {
      context: '- Giảm tối đa 500.000đ/roomnight. ',
    },
    {
      context: '- Giới hạn: 05 roomnight/ngày/Đối tác. ',
    },
  ],
  note: [
    {
      context: '*Lưu ý: ',
    },
    {
      context: '- Mã giảm giá chỉ áp dụng cho các đơn hàng đặt trên app Tripi Partner ',
    },
    {
      context: '- Chương trình chỉ áp dụng với những khách sạn Hotdeal trên ',
    },
    {
      context: '- Không áp dụng hoàn/hủy cho các đơn hàng áp dụng chương trình ',
    },
    {
      context:
        '- Ngân sách khuyến mãi hàng ngày có hạn, số lượng mã giảm giá khả dụng trên hệ thống có thể hết trước 23h59 hàng ngày, chương trình có thể kết thúc sớm hơn dự kiến. ',
    },
    {
      context: '*Lưu ý: ',
    },
    {
      context: '- Mã giảm giá chỉ áp dụng cho các đơn hàng đặt trên app Tripi Partner ',
    },
    {
      context: '- Chương trình chỉ áp dụng với những khách sạn Hotdeal trên ',
    },
    {
      context: '- Không áp dụng hoàn/hủy cho các đơn hàng áp dụng chương trình ',
    },
    {
      context:
        '- Ngân sách khuyến mãi hàng ngày có hạn, số lượng mã giảm giá khả dụng trên hệ thống có thể hết trước 23h59 hàng ngày, chương trình có thể kết thúc sớm hơn dự kiến. ',
    },
  ],
};

export const fakeUserData = {
  accessToken: 'abc123',
  accountDetailInfo: {
    id: 123456789,
    email: 'quannm.it@tripi.vn',
    phone: '0123456789',
    name: 'Ngô Minh Quân',
    profilePhoto: 'https://i.pinimg.com/236x/d0/f4/fc/d0f4fc818a35285642ba057436fc8720.jpg',
    employeeID: 'IT00984',
    createdTime: 1590437391831,
    updatedTime: null,
    emailValidated: true,
    role: {
      roleID: 1,
      roleText: 'Owner',
    },
    lastLoginDate: null,
    department: {
      departmentID: 1,
      departmentText: 'Ban Giám Đốc',
    },
    title: {
      titleID: 1,
      titleText: 'Giám Đốc Điều Hành',
    },
    isActive: true,
    isCorporateFirstAccount: true,
  },
  corporateRegisterInfo: {
    companyName: 'VnTravel',
    shortName: 'VnTravel',
    taxNumber: '651465465411032132',
    address: 'Chùa Láng',
    contactPersonName: 'Ngô Minh Quân',
    email: 'quannm.it@tripi.vn',
    companySize: 1,
    phone: '0123456789',
    referenceContactPhone: '0123456789',
  },
};
