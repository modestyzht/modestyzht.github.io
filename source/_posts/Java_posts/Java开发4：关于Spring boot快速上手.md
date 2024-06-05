---
title: Java开发4：关于Spring boot快速上手
date: 2024-4-8
description: 这篇文章中是关于Spring boot快速上手
top_img: https://w.wallhaven.cc/full/m3/wallhaven-m3oq1k.jpg
cover: https://cdn.jsdelivr.net/gh/modestyzht/mypic/img/wallhaven-rrzp5q.webp
copyright_author: 驴哥
copyright_url: https://modestyzht.github.io/
copyright_info: 此文章版权为驴哥所有,如有转载,请注明来自原作者
categories: Java
---


## Spring Boot 框架

**Spring Boot是一个基于Spring框架的开源Java开发框架，旨在简化Java应用程序的开发和部署过程。它采用约定优于配置的原则，提供了简化配置、内嵌服务器、自动化、微服务支持以及监控和管理等特点。通过自动化配置和内置服务器等功能，Spring Boot使得开发者能够更专注于业务逻辑的实现，而无需过多关注底层的配置和细节。**

Spring Boot 提供了许多功能，包括：

1. **自动配置**：Spring Boot 根据类路径中的内容自动配置应用程序。
2. **起步依赖**：Spring Boot 提供了一系列预配置的依赖项，使得构建特定类型的应用程序变得更加容易。
3. **嵌入式 Web 服务器**：Spring Boot 支持内嵌的 Tomcat、Jetty 或 Undertow 服务器，无需额外的配置即可启动 Web 应用程序。
4. **Actuator**：Spring Boot Actuator 提供了对应用程序运行时信息的监控和管理功能，如健康检查、审计、配置查看等。
5. **外部化配置**：Spring Boot 支持通过属性文件、YAML 文件、环境变量等方式进行应用程序的外部化配置。

### 关于 Spring Boot 的使用

Spring Boot 的使用非常简单，无论是在 IntelliJ IDEA 中创建项目还是使用 Spring Initializr 在官网上生成项目配置，都能快速启动你的开发。

#### 1. 在 IntelliJ IDEA 中创建项目

在 IntelliJ IDEA 中创建 Spring Boot 项目非常方便：

1. 打开 IntelliJ IDEA，选择 File > New > Project。
2. 在弹出的窗口中，选择 Spring Initializr 作为项目类型。
3. 你需要配置项目的一些基本信息，比如项目的名称、类型、包名等。
4. 在 Spring Initializr 界面选择所需的依赖，比如 Web、JPA、Security 等。
5. 点击 Next 完成项目配置，然后选择项目的存储路径，点击 Finish 即可完成项目创建。

通过这种方式创建的项目已经预配置了 Spring Boot 相关的依赖和设置，你可以直接开始编写应用程序的代码。

#### 2. 使用 Spring Initializr

使用 Spring Initializr 在官网上生成项目配置也是一种简单快捷的方式：

1. 访问 Spring Initializr 官网（https://start.spring.io/）。
2. 在页面上选择项目的相关配置，比如项目的名称、类型、依赖等。
3. 完成配置后，点击 Generate 按钮生成项目压缩包。
4. 下载生成的项目压缩包并解压到你的开发环境中。
5. 接着，你可以在解压后的项目目录中使用你喜欢的开发工具打开项目，比如 IntelliJ IDEA、Eclipse 等。

Spring Initializr 提供了丰富的配置选项，你可以根据自己的需求定制化项目，生成符合你要求的 Spring Boot 项目。

无论你选择哪种方式，都能让你迅速开始编写 Spring Boot 应用程序，享受 Spring Boot 带来的便利和高效。。

### 关于 Spring Boot 热启动

Spring Boot 热部署，也被称为热加载或热替换，是指在不重启应用程序服务器的情况下更新应用程序的能力。这可以在开发过程中节省大量时间，因为不再需要手动重启应用。

要在 Spring Boot 中实现热部署，你可以使用以下方法：

1. 在你的 `pom.xml` 中添加 `spring-boot-devtools` 依赖。

    ```xml
    <dependencies>
        <!-- ... 其他依赖 ... -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
    </dependencies>
    ```

2. 配置你的 IDE 以便自动编译修改的类和资源。

    - 对于 IntelliJ IDEA：打开项目设置（File > Project Structure），选择 Modules，对需要热部署的模块，选择 "Build > Build on make (jps only)"。
    - 对于 Eclipse：确保你的项目使用了 Eclipse Compiler，在 `eclipse.ini` 文件中添加相应参数。

在生产环境中，热部署默认是关闭的，如果你想在生产环境中使用热部署，需要添加相应配置。

### 关于 Controller 的作用

Controller 在 Java 开发中扮演着连接客户端请求和后端业务逻辑的桥梁。
**Controller作用：**

请求处理：Controller 接收来自客户端的 HTTP 请求，并根据请求的 URL 和方法调用相应的处理方法。

业务逻辑处理：在 Controller 中，您可以编写业务逻辑来处理请求。这包括从数据库检索数据、调用其他服务或执行其他操作。

数据封装：Controller 可以接收客户端发送的数据，如请求参数、路径参数、请求体等，并将其封装后传递给业务逻辑组件处理。

响应生成：Controller 生成响应并返回给客户端，响应可以是 HTML 页面、JSON 数据、XML 数据等。

异常处理：Controller 负责处理请求过程中可能出现的异常，确保系统的稳定性和可靠性。

**创建 Controller 类：**

在您的 Spring Boot 项目中创建一个新的 Java 类，用于定义您的 Controller。您可以在 `src/main/java` 目录下的包中创建这个类。确保这个类添加了 `@Controller` 或 `@RestController` 注解。

```java
import org.springframework.web.bind.annotation.*;

@RestController
public class MyController {
    // Controller methods will be defined here
}
```
定义请求映射：

使用 @RequestMapping 或其他 Mapping 相关的注解来定义请求映射。例如，@GetMapping 用于处理 GET 请求，@PostMapping 用于处理 POST 请求等。
```java
@RestController
public class MyController {
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }
}
```
编写处理方法：

在 Controller 类中编写处理请求的方法。方法可以返回不同类型的响应，例如字符串、对象、视图名称等。
```java
@RestController
public class MyController {
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }

    @PostMapping("/user")
    public User createUser(@RequestBody User user) {
        // Process the user object and return it
    }
}
```
处理请求参数：

使用 @RequestParam、@PathVariable、@RequestBody 等注解来处理请求参数。这些注解可以帮助您从请求中获取参数并将其注入到方法中。
```java
@RestController
public class MyController {
    @GetMapping("/hello")
    public String sayHello(@RequestParam("name") String name) {
        return "Hello, " + name + "!";
    }
}
```
返回响应：

根据您的业务需求，方法可以返回不同类型的响应。例如，可以返回字符串、对象、视图名称等。
```java
@RestController
public class MyController {
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }

    @GetMapping("/user")
    public User getUser() {
        User user = new User();
        user.setName("John");
        user.setEmail("john@example.com");
        return user;
    }
}
```
通过这些具体的步骤，您可以更清晰地了解如何在 Spring Boot 中创建和使用 Controller，并且能够更加容易地实际操作。

当您使用 Spring Boot 创建 Controller 类时，您可能需要根据不同的 HTTP 请求方法来定义请求映射。以下是关于常见的 HTTP 请求方法及其对应的注解的更详细解释：

1. **GET 请求**：
   - 使用 `@GetMapping` 注解来处理 GET 请求。GET 请求通常用于从服务器获取资源。

   ```java
   @GetMapping("/example")
   public String getExample() {
       // Method implementation
   }
   ```
2. **POST 请求：**
使用 @PostMapping 注解来处理 POST 请求。POST 请求通常用于向服务器提交数据，例如表单提交。
   ```java
   @PostMapping("/example")
   public String postExample(@RequestBody ExampleModel model) 
   {
    // Method implementation}
```

3. **PUT 请求：**
使用 @PutMapping 注解来处理 PUT 请求。PUT 请求通常用于更新服务器上的资源。
   ```java
   @PutMapping("/example/{id}")
   public String putExample(@PathVariable Long id, @RequestBody ExampleModel model) {
    // Method implementation
}
```

4. **DELETE 请求：**
使用 @DeleteMapping 注解来处理 DELETE 请求。DELETE 请求通常用于删除服务器上的资源。
   ```java
   @DeleteMapping("/example/{id}")
   public void deleteExample(@PathVariable Long id) {
    // Method implementation
}
```


5. **PATCH 请求：**
使用 @PatchMapping 注解来处理 PATCH 请求。PATCH 请求通常用于局部更新服务器上的资源。
   ```java
   @PatchMapping("/example/{id}")
   public String patchExample(@PathVariable Long id, @RequestBody ExampleModel model) {
    // Method implementation
}
```
通过使用这些注解，您可以更清晰地定义不同 HTTP 请求方法的处理逻辑，从而更好地组织和管理您的 Spring Boot 应用程序中的 Controller。

感谢你阅读我的博客文章！如果你有任何问题或想了解更多关于这个项目的内容，请随时与我联系。
QQ邮箱：2855935354@qq.com