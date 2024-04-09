---
title: Java开发4：关于Spring boot 框架的使用
date: 2024-4-8
description: 这篇文章中是关于Spring boot 框架的使用
top_img: https://w.wallhaven.cc/full/m3/wallhaven-m3oq1k.jpg
cover: https://w.wallhaven.cc/full/rr/wallhaven-rrzp5q.jpg
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

Controller 在 Java 开发中扮演着连接客户端请求和后端业务逻辑的桥梁作用。它主要负责路由请求、处理参数、调用业务逻辑、生成响应以及处理异常。Controller 的作用简单来说就是接收请求并返回响应，是构建 Web 应用程序的关键组件之一。

在 Controller 中使用 `@RestController` 和其他语句完成客户端信息的接收以及处理。