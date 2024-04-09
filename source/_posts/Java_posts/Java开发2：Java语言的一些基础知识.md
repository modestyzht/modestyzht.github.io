title: Java开发2：Java语言的一些基础知识
date: 2024-3-26
description: 这篇文章中是一些Java语言的基础知识，通过学习了解便于后续开发；如需掌握建议B站学习
top_img: https://w.wallhaven.cc/full/m3/wallhaven-m3oq1k.jpg
cover: https://w.wallhaven.cc/full/m3/wallhaven-m3m57k.jpg
copyright_author: 驴哥
copyright_url: https://modestyzht.github.io/
copyright_info: 此文章版权为驴哥所有,如有转载,请注明来自原作者
categories: Java

---

# 一、语法基础：

## 1. 注释
- 使用 `//` 进行行注释
- 使用 `/**/` 进行段落注释
- 使用 `ctrl+/` 进行行的快捷键注释
- 使用 `ctrl+shift+/` 进行段落的快捷键注释

输出语句：`System.out.println();` 快捷输入：`sout`

## 2. 字面量
常用数据：
- 整数
- 小数
- 字符：必须使用：`‘ ’` 括起来，有且仅有一个字符；`\n` 换行字符；`\t` 代表缩进
- 字符串：必须使用：`“ ”` 括起来，里面内容随意
- 布尔值：`true`, `false`
- 空值：`null`

## 3. 变量
变量定义格式：`数据类型 变量名称 = 数据；`
数据类型：基本数据类型、引用数据类型
基本数据类型：整型、浮点型、字符型、布尔型
类型转换：
- 自动类型转换：小范围类型变量复制给大范围类型变量，如：将 `byte` 定义的变量赋值给 `int` 定义的变量
- 表达式的自动类型转换
- 强制类型转换：大范围类型数据赋值给小范围数据类型，如：`int a = 20； byte b = (byte)a；`

## 4. 关键字
Java语言中自己用到的一些词，有特殊作用，称之为关键字，如：`public`、`class`、`int` ......
不能以数字作为标识符

# 二、流程控制：

## 1. 分支结构
- `if`：根据判定条件选择执行某个分支
- `switch`：根据表达式的值匹配选择对应的分支执行

## 2. 循环结构
- `for`：控制一段代码重复多次执行
- `while`：控制一段代码重复多次执行，先判断再执行
- `do-while`：控制一段代码重复多次执行，先执行再判断

## 3. 跳转关键字
- `break`：跳出并结束当前所在循环的执行
- `continue`：跳出当前循环的当此执行，进入下一次循环

## 4. 案例技术
随机数 `Random`：产生一个随机数

Java中的随机数生成通常使用 `java.util.Random` 类。通过创建 `Random` 对象，可以生成各种类型的随机数。例如：

```java
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        // 创建 Random 对象
        Random random = new Random();
        
        // 生成一个随机整数
        int randomNumber = random.nextInt();
        System.out.println("Random Integer: " + randomNumber);
        
        // 生成一个随机浮点数
        double randomDouble = random.nextDouble();
        System.out.println("Random Double: " + randomDouble);
    }
}
```

# 三、数组 （array）：

数据类型 [ ]  数据名称 = { } ;
工具：Debug工具的使用（控制代码一行一行的执行）

1. 数组的定义和访问
数组是一种用于存储多个相同类型数据的数据结构。在Java中，数组的定义和访问有两种方式：
- **静态初始化数组**：在定义数组时直接指定数组元素的值。例如：`int[] arr = {1, 2, 3, 4, 5};`
- **动态初始化数组**：在定义数组时只指定数组的长度，然后通过循环或其他逻辑来为数组元素赋值。例如：`int[] arr = new int[5]; for(int i = 0; i < arr.length; i++) { arr[i] = i + 1; }`

数组的访问和遍历：
- 使用数组索引访问数组元素。数组索引从0开始，到数组长度减一结束。
- 可以使用循环结构来遍历数组，访问每个数组元素。


2. Java内存分配介绍
Java程序在运行过程中会使用到不同的内存区域来存储数据和执行代码，其中主要包括方法区、栈、堆：
- **方法区**：用于存储已经被加载的类信息、常量、静态变量等数据。方法区是各个线程共享的内存区域。
- **栈**：栈内存用于存储局部变量、方法调用、方法返回等操作。每个线程在执行方法时，都会在栈上创建一个对应的栈帧，栈帧中包含了方法的局部变量表、操作数栈、动态链接、方法返回地址等信息。栈是线程私有的，每个线程都有自己的栈内存。
- **堆**：堆内存用于存储对象实例和数组对象。Java中几乎所有的对象都存储在堆内存中，堆内存是被所有线程共享的。当创建一个对象时，对象实例被存储在堆内存中，并返回一个对应的引用，这个引用存储在栈内存中。

# 四、方法  （method）：

方法是一种语法结构，它可以把一段代码封装成一个功能，易便重复调用（定义在main方法的外面）

## 1. 方法的定义和调用

方法定义的格式如下：

```java
修饰符 返回值类型 方法名(参数列表) {
    // 方法体
}
```
其中：

修饰符：可以是 public、private、protected 等访问修饰符，用来控制方法的访问权限。
返回值类型：指定方法执行完毕后返回值的数据类型，如果方法不返回任何值，则使用 void 关键字表示。
方法名：方法的名称，符合标识符的命名规则。
参数列表：方法可以接受的参数，参数列表可以为空。
方法体：方法的具体实现。

方法的调用通过方法名和参数列表来实现。例如：
```java
public class Main {
    // 定义一个方法，计算两个整数的和
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        int result = add(3, 5); // 调用 add 方法，并将返回值赋给 result
        System.out.println("Result: " + result); // 输出结果
    }
}
```
## 2. 方法的案例
设计方法的技巧主要注意三个方面：
1.方法是否需要接收数据进行处理？
2.方法是否需要返回数据？
3.方法要处理的业务（编程能力）

感谢你阅读我的博客文章！如果你有任何问题或想了解更多关于这个项目的内容，请随时与我联系。
QQ邮箱：2855935354@qq.com
---