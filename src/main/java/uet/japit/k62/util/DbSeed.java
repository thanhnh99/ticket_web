//package uet.japit.k62.util;
//
//import com.github.javafaker.Faker;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import uet.japit.k62.constant.AccountTypeConstant;
//import uet.japit.k62.constant.CategoryDefaultConstant;
//import uet.japit.k62.constant.PermissionConstant;
//import uet.japit.k62.dao.*;
//import uet.japit.k62.models.entity.*;
//
//import java.lang.reflect.Field;
//import java.math.BigDecimal;
//import java.util.Date;
//import java.util.List;
//import java.util.Locale;
//import java.util.Random;
//
//@Configuration
//public class DbSeed {
//    private final PasswordEncoder passwordEncoder;
//    private final IUserDAO userDAO;
//    private final IPermissionDAO permissionDAO;
//    private final IAccountTypeDAO accountTypeDAO;
//    private final ICategoryDAO categoryDAO;
//    private final IEventDAO eventDAO;
//    private final ITicketClassDAO ticketClassDAO;
//    private final Faker faker;
//
//    public DbSeed(PasswordEncoder passwordEncoder, IUserDAO userDao, IPermissionDAO permissionDAO, IAccountTypeDAO accountTypeDAO, ICategoryDAO categoryDAO, IEventDAO eventDAO, ITicketClassDAO ticketClassDAO)
//    {
//        this.passwordEncoder = passwordEncoder;
//        this.userDAO = userDao;
//        this.permissionDAO = permissionDAO;
//        this.accountTypeDAO = accountTypeDAO;
//        this.categoryDAO = categoryDAO;
//        this.eventDAO = eventDAO;
//        this.ticketClassDAO = ticketClassDAO;
//        this.faker = new Faker(new Locale("vi"));
//    }
//
//    @Bean
//    public void addPermission()
//    {
//        PermissionConstant permissionList = new PermissionConstant();
//        for (Field permission :
//                permissionList.getClass().getDeclaredFields()) {
//            if(permissionDAO.findByCode(permission.getName()) == null)
//            {
//                Permission newPermission = new Permission();
//                newPermission.setCode(permission.getName());
//                newPermission.setDisplayName(permission.getName());
//                permissionDAO.save(newPermission);
//            }
//        }
//    }
//
//    @Bean
//    public void addAccountType()
//    {
//        AccountTypeConstant accountTypeDefaultList = new AccountTypeConstant();
//        for (Field accountType :
//                accountTypeDefaultList.getClass().getDeclaredFields()) {
//            if(accountTypeDAO.findByCode(accountType.getName()) == null)
//            {
//                AccountType newAccountType = new AccountType();
//                newAccountType.setCode(accountType.getName());
//                newAccountType.setName(accountType.getName());
//                accountTypeDAO.save(newAccountType);
//            }
//        }
//    }
//    @Bean
//    public void addUser()
//    {
//        if(userDAO.findByEmail("huuthanh99hn@gmail.com") == null)
//        {
//            User user = new User();
//            user.setDisplayName("Huu Thanh");
//            user.setEmail("huuthanh99hn@gmail.com");
//            user.setPassword(passwordEncoder.encode("12345678"));
//            user.setBankAccountHolder("NGUYEN HUU THANH");
//            user.setBankAccountNumber("894583427438590834059439");
//            user.setBankBranch("CAU GIAY");
//            user.setBankName("BIDV");
//            user.setPhone("190011247843");
//            user.setIsActive(true);
//            user.setIsVerify(true);
//            user.setAccountType(accountTypeDAO.findByCode(AccountTypeConstant.USER));
//            userDAO.save(user);
//        }
//    }
//
//    @Bean
//    public void addRoot()
//    {
//        if(userDAO.findByEmail("thanhnh99.amc@gmail.com") == null)
//        {
//            User user = new User();
//            user.setDisplayName("Huu Thanh");
//            user.setEmail("thanhnh99.amc@gmail.com");
//            user.setPassword(passwordEncoder.encode("12345678"));
//            user.setAccountType(accountTypeDAO.findByCode(AccountTypeConstant.ROOT));
//            List<Permission> permissionList = permissionDAO.findAll();
//            user.setBankAccountHolder("NGUYEN HUU THANH");
//            user.setBankAccountNumber("894583427438590834059439");
//            user.setBankBranch("CAU GIAY");
//            user.setBankName("BIDV");
//            user.setPhone("190011247843");
//            user.setIsActive(true);
//            user.setIsVerify(true);
//            user.setPermissionList(permissionList);
//            userDAO.saveAndFlush(user);
//        }
//    }
//
//    @Bean
//    public void addOrganizer()
//    {
//        if(userDAO.findByEmail("17021014@vnu.edu.vn") == null)
//        {
//            User user = new User();
//            user.setDisplayName("Huu Thanh");
//            user.setEmail("17021014@vnu.edu.vn");
//            user.setPassword(passwordEncoder.encode("12345678"));
//            user.setAccountType(accountTypeDAO.findByCode(AccountTypeConstant.ROOT));
//            List<Permission> permissionList = permissionDAO.findAll();
//            user.setIsActive(true);
//            user.setIsVerify(true);
//            user.setBankAccountHolder("NGUYEN HUU THANH");
//            user.setBankAccountNumber("894583427438590834059439");
//            user.setBankBranch("CAU GIAY");
//            user.setBankName("BIDV");
//            user.setPhone("190011247843");
//            user.setPermissionList(permissionList);
//            userDAO.saveAndFlush(user);
//        }
//    }
//
//    @Bean
//    public void addCategory()
//    {
//        CategoryDefaultConstant categoryDefaultConstantList = new CategoryDefaultConstant();
//        for (Field category :
//                categoryDefaultConstantList.getClass().getDeclaredFields()) {
//            if(categoryDAO.findByCode(category.getName()) == null)
//            {
//                Category newCategory = new Category();
//                newCategory.setCode(category.getName());
//                newCategory.setName(category.getName());
//                categoryDAO.save(newCategory);
//            }
//        }
//    }
//
//    @Bean
//    public void addEvent()
//    {
//        Date now = new Date();
//        long DAY = 24 * 60 * 60;
//        List<Category> categoryList = categoryDAO.findAll();
//        for (Category category : categoryList)
//        {
//            for (int i = 0; i < 15; i++)
//            {
//                Event newEvent = new Event();
//                newEvent.setName(faker.team().name());
//                newEvent.setDescription("[Theo thanh nien.vn]\n" +
//                        "Sân khấu kịch IDECAF (TP.HCM) vừa công diễn vở kịch \"Người lạ, người thương, rồi người dưng\" (tác giả Bùi Quốc Bảo, đạo diễn Vũ Minh) với màu sắc khoa học viễn tưởng nhưng lại rất gần gũi với cuộc sống đời thường.\n" +
//                        "\n" +
//                        "Khoa học tiến bộ đến mức có thể dùng máy móc xóa đi ký ức của con người. Chính vì vậy mà Lan (Lê Khánh) tìm đến viện khoa học để nhờ xóa đi hình ảnh người chồng phản bội, cùng với tất cả những gì liên quan tới anh ta. Và cô bắt đầu tìm thấy hạnh phúc bên người chồng mới. Nhưng rồi anh này lại phản bội, Lan lại đi xóa ký ức, và lại đi tìm hạnh phúc khác... Liệu cô có tiếp tục xóa ký ức đến n lần hay không?\n" +
//                        "\n" +
//                        "Hóa ra Lan đi mãi thì cũng trở về vạch xuất phát. Bí mật nằm ở đây, tác giả đã giữ mối cho tới phút cuối. Vậy Lan có nên bao dung, tha thứ cho sai lầm của người khác, để mình cũng được sống an vui? Ai mà không có lúc sơ sẩy, và người ta đã biết ăn năn, chỉ có mình ôm mối hận không chịu buông bỏ mà thôi. Câu chuyện dường như tồn tại trong rất nhiều gia đình, khán giả hẳn cũng thấy bóng dáng bản thân trong đó.");
//                newEvent.setStartSellingTime(faker.date().between(new Date(now.getTime() - DAY), new Date(now.getTime() + DAY * 3)));
//                newEvent.setStartTime(faker.date().between(new Date(now.getTime() + DAY * 8), new Date(now.getTime() + DAY * 9)));
//                newEvent.setEndSellingTime(faker.date().between(new Date(now.getTime() + DAY * 5), new Date(now.getTime() + DAY * 7)));
//                newEvent.setEndTime(faker.date().between(new Date(now.getTime() + DAY * 9), new Date(now.getTime() + DAY * 10)));
//                newEvent.setCity(faker.address().city());
//                newEvent.setFullAddress(faker.address().fullAddress());
//                newEvent.setCategory(category);
//                newEvent.setCreatedBy("thanhnh99.amc@gmail.com");
//                newEvent.setIsBroadcasting(new Random().nextBoolean());
//                if(!newEvent.getIsBroadcasting()) {
//                    newEvent.setIsActive(new Random().nextBoolean());
//                } else {
//                    newEvent.setIsPopular(new Random().nextBoolean());
//                }
//                newEvent.setCoverImageUrl("https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2020/11/17/4F707C.jpg");
//                newEvent.setMapImageUrl("https://httt.uit.edu.vn/wp-content/uploads/2019/05/So_Do_Cho_Ngoi.png");
//                newEvent.setContactPhone(faker.phoneNumber().phoneNumber());
//                newEvent.setContactEmail("thanhnh99.amc@gmail.com");
//                newEvent.setOrganizerName(faker.company().name());
//                newEvent.setOrganizerInfo("Sân khấu kịch Idecaf ra đời vào tháng 09.1997 với vở \"Khoảng khắc tình yêu\" đã nhanh chóng gây tiếng vang bởi chất lượng nghệ thuật, nội dung kịch bản sâu sắc, dàn diễn viên nổi tiếng và quan trọng nhất là thái độ phục vụ, tôn trọng khán giả của nhân viên phục vụ lẫn diễn viên của vở. Chỉ sau một thời gian ra mắt, sân khấu Idecaf trở thành một địa chỉ quen thụôc của khán giả mê kịch.\n" +
//                        "\n" +
//                        "Sau 20 năm hoạt động (tính đến hết tháng 12.2016), Idecaf đã dàn dựng hơn 100 vở kịch dành cho người lớn, 30 vở kịch rối thiếu nhi, 29 chương trình ca múa nhạc kịch thiếu nhi \"Ngày xửa... ngày xưa\" và phối hợp với với Đài truyền hình TP.HCM dàn dựng chương trình \"Chuyện ngày xưa\". Hơn 20 năm hoạt động, Idecaf đã đạt 5.000 suất diễn quả là một con số không nhỏ khi tình hình sân khấu nói chung đang trong tình trạng kén chọn khán giả.");
//                eventDAO.save(newEvent);
//                for(int j = 0; j < faker.number().numberBetween(2,5); j++)
//                {
//                        TicketClass ticketClassEntity = new TicketClass();
//                        ticketClassEntity.setName(faker.book().title());
//                        ticketClassEntity.setPrice(new BigDecimal(faker.number().numberBetween(0, 1000000)));
//                        ticketClassEntity.setNumberAvailable(faker.number().numberBetween(20,200));
//                        ticketClassEntity.setTotal(faker.number().numberBetween(201, 500));
//                        ticketClassEntity.setDescription(faker.book().genre());
//                        ticketClassEntity.setMinPerPerson(faker.number().numberBetween(1,3));
//                        ticketClassEntity.setMaxPerPerson(faker.number().numberBetween(5, 10));
//                        ticketClassEntity.setEvent(newEvent);
//                        ticketClassDAO.save(ticketClassEntity);
//                        newEvent.getTicketClasses().add(ticketClassEntity);
//                }
//                eventDAO.save(newEvent);
//            }
//        }
//    }
//}
