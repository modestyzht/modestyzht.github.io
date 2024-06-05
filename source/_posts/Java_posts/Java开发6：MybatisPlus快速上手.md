---
title: Java开发6：MybatisPlus快速上手
date: 2024-4-10
description: MyBatis-Plus 是 MyBatis 的增强工具包，提供了许多便捷的功能和增强特性，旨在简化 MyBatis 的开发。
top_img: https://w.wallhaven.cc/full/m3/wallhaven-m3oq1k.jpg
cover: https://cdn.jsdelivr.net/gh/modestyzht/mypic/img/wallhaven-p95m1e.webp
copyright_author: 驴哥
copyright_url: https://modestyzht.github.io/
copyright_info: 此文章版权为驴哥所有,如有转载,请注明来自原作者
categories: Java
---

# ORM介绍

ORM（对象关系映射）是一种编程技术，它将数据库中的数据映射到程序中的对象，并提供了在对象级别上对数据进行操作的方法。ORM的目标是使开发人员能够使用面向对象的方式来操作数据库，而不必直接编写SQL查询语句。

以下是ORM的一些关键概念和优势：
1. **对象映射：** ORM通过将数据库中的表映射为程序中的对象，将表中的行映射为对象的属性，从而使得开发人员可以使用面向对象的编程方式来操作数据。
2. **透明性：** ORM框架隐藏了底层数据库操作的细节，开发人员不必关心SQL语句的编写和数据库连接的管理，简化了开发过程。
3. **提高开发效率：** ORM框架提供了许多便捷的功能，如自动生成SQL语句、缓存管理、事务处理等，可以显著提高开发效率。
4. **跨数据库平台：** ORM框架通常支持多种数据库，开发人员可以使用相同的代码和API来操作不同的数据库，从而实现跨数据库平台的应用程序开发。
5. **面向对象的数据操作：** ORM允许开发人员使用面向对象的方式来进行数据操作，例如通过对象的方法来进行数据的增删改查操作，使得代码更加清晰和易于维护。

常见的ORM框架包括Hibernate、JPA（Java持久化API）、MyBatis等。它们提供了不同程度的抽象和功能，开发人员可以根据项目需求和个人偏好选择合适的框架。ORM框架在现代软件开发中得到了广泛的应用，特别是在大型企业应用和Web应用开发中。（ORM框架的本质是简化编程中操作数据库的编码）


# MyBatis-Plus介绍

MyBatis-Plus 是 MyBatis 的增强工具包，提供了许多便捷的功能和增强特性，旨在简化 MyBatis 的开发。它在 MyBatis 的基础上进行了扩展和增强，提供了更多方便易用的功能，使得数据访问层的开发更加高效和便捷。

以下是 MyBatis-Plus 的一些关键特性和优势：
1. **简化 CRUD 操作：** MyBatis-Plus 提供了一系列的 CRUD 方法，通过继承 BaseMapper 接口或使用 MybatisPlusMapper 接口，可以轻松实现常见的数据操作，如插入、更新、删除、查询等，无需手动编写 SQL。
2. **条件构造器：** MyBatis-Plus 引入了 Wrapper 来构建查询条件，支持链式调用，可以根据实体对象的属性动态组装 SQL 查询条件，极大地简化了复杂查询的编写。
3. **分页插件：** MyBatis-Plus 提供了强大的分页查询功能，通过集成分页插件，开发人员可以轻松实现分页查询，支持多种数据库的分页方式。
4. **代码生成器：** MyBatis-Plus 提供了代码生成器工具，可以根据数据库表自动生成实体类、Mapper 接口以及 XML 映射文件，极大地提升了开发效率。
5. **通用方法：** 除了常见的 CRUD 操作外，MyBatis-Plus 还提供了诸如批量操作、逻辑删除、乐观锁、自动填充等通用方法，减少了重复代码的编写。
6. **性能优化：** MyBatis-Plus 对 MyBatis 进行了许多性能优化和扩展，如使用了 PreparedStatement 预编译 SQL、内置缓存、SQL 解析优化等，提升了数据访问层的性能。
7. **社区活跃：** MyBatis-Plus 是一个开源项目，拥有活跃的社区和完善的文档，开发人员可以通过官方文档和社区论坛获取支持和反馈。

总体而言，MyBatis-Plus 是 MyBatis 的有效补充，通过简化和增强 MyBatis 的功能，提供了更高效、更便捷的数据访问解决方案，特别适用于基于 MyBatis 的 Java 后端开发项目。

## 2.1 添加依赖

在 Maven 项目中，在你的 Maven 项目的 `pom.xml` 文件中，添加 MyBatis-Plus 的依赖：

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.2</version>
</dependency>
```
请将 latest_version_here 替换为你需要使用的 MyBatis-Plus 版本号，你可以在 Maven 仓库中查找最新版本号。

添加 MySQL 依赖：
```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.36</version>
</dependency>
```
添加数据连接池依赖：
```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.20</version>
</dependency>
```
3. 全局配置
配置数据库相关信息：
```java
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/mydb?use
spring.datasource.username=root
spring.datasource.password=root
mybatis-plus.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

# 添加 `@MapperScan` 注解

@MapperScan 注解是 MyBatis 框架中的一个注解，用于指定 MyBatis Mapper 接口所在的包路径，以便 MyBatis 能够扫描并将这些接口注册为 Mapper 映射器。

使用 @MapperScan 注解可以简化 MyBatis Mapper 接口的配置，而不必一个个手动配置每个 Mapper 接口。通过指定要扫描的包路径，MyBatis 将会自动扫描这些路径下的接口，并将其注册为 Mapper 映射器，使得这些接口可以被 MyBatis 所识别并且在需要时被调用。

下面是 @MapperScan 注解的基本使用方式：
```java
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
// 指定要扫描的 Mapper 接口所在的包路径
@MapperScan("com.example.mapper")
public class MyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```
在上面的例子中，@MapperScan("com.example.mapper") 表示要扫描 com.example.mapper 包及其子包下的 Mapper 接口，并将它们注册为 Mapper 映射器。这样，在应用启动时，MyBatis 将会自动扫描这些接口，并将其配置为可用的 Mapper。
# 编写实体类
```java
public class User {
    private Long id;
    private String name;
    private String email;
    // 其他字段和getter/setter方法
}
```
# 编写Mapper接口
```java
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.entity.User;

public interface UserMapper extends BaseMapper<User> {
    // 可以添加一些自定义的方法
}
```
# 使用Service层
```java
import com.example.mapper.UserMapper;
import com.example.entity.User;

public class UserService {
    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public User getUserById(Long id) {
        return userMapper.selectById(id);
    }

    public void saveUser(User user) {
        userMapper.insert(user);
    }
    // 其他业务逻辑方法
}
```
# 添加业务逻辑处理
```java
import org.springframework.web.bind.annotation.*;
import com.example.entity.User;
import com.example.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public void createUser(@RequestBody User user) {
        userService.saveUser(user);
    }
    // 其他请求处理方法
}
```
# 使用MyBatis-Plus的插件
```java
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Service;
import com.example.entity.User;
import com.example.mapper.UserMapper;

@Service
public class UserService {
    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public Page<User> getUsersByPage(int pageNum, int pageSize) {
        return userMapper.selectPage(new Page<>(pageNum, pageSize), null);
    }
}
```
# 运行项目
启动Spring Boot应用程序，可以使用@SpringBootApplication注解标记启动类。
测试各功能是否正常运行，可以使用工具如Postman发送请求并验证返回结果。
在浏览器或Postman中访问相应的接口，检查返回结果是否符合预期。


感谢你阅读我的博客文章！如果你有任何问题或想了解更多关于这个项目的内容，请随时与我联系。
QQ邮箱：2855935354@qq.com