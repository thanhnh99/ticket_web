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
//            user.setIsActive(true);
//            user.setIsVerify(true);
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
//        List<Category> categoryList = categoryDAO.findAll();
//        for (Category category : categoryList)
//        {
//            for (int i = 0; i < 15; i++)
//            {
//                Event newEvent = new Event();
//                newEvent.setName(faker.team().name());
//                newEvent.setDescription(faker.relationships().inLaw());
//                newEvent.setStartSellingTime(faker.date().between(new Date(1604949695), new Date(1605813695)));
//                newEvent.setStartTime(faker.date().between(new Date(1606677695), new Date(1606850495)));
//                newEvent.setEndSellingTime(faker.date().between(new Date(1605900095), new Date(1606245695)));
//                newEvent.setEndTime(faker.date().between(new Date(1607109695), new Date(1607196095)));
//                newEvent.setCity(faker.address().city());
//                newEvent.setFullAddress(faker.address().fullAddress());
//                newEvent.setCategory(category);
//                newEvent.setCreatedBy("thanhnh99.amc@gmail.com");
//                newEvent.setIsBroadcasting(true);
//                newEvent.setCoverImageUrl("https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2020/11/17/4F707C.jpg");
//                newEvent.setMapImageUrl("https://httt.uit.edu.vn/wp-content/uploads/2019/05/So_Do_Cho_Ngoi.png");
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
