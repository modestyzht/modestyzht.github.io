---
title: Java开发2：Java语言的一些基础知识
date: 2024-3-26
description: 这篇文章中是一些Java语言的基础知识，通过了解仅便于后续开发；如需进一步学习可以去B站搜索相关课程学习
top_img: https://w.wallhaven.cc/full/m3/wallhaven-m3oq1k.jpg
cover: https://w.wallhaven.cc/full/m3/wallhaven-m3m57k.jpg
copyright_author: 驴哥
copyright_url: https://modestyzht.github.io/
copyright_info: 此文章版权为驴哥所有,如有转载,请注明来自原作者
categories: Java

---
这篇文章仅仅用于了解Java的一些相关概念，并不是完整的Java学习内容，如果需要完整的学习，建议前往B站搜索学习；

# 关于IDEA使用的一些小技巧（Tips）：

1. **快捷键**
   - Ctrl + Space: 自动代码补全，根据上下文提供代码建议。
   - Ctrl + Alt + L: 格式化代码。
   - Ctrl + / (Windows) 或 Command + / (Mac): 注释/取消注释当前行或选中的代码块。
   - Ctrl + D: 复制当前行或选中的代码块。
   - Ctrl + Y: 删除当前行。
   - Ctrl + Shift + Z (Windows) 或 Command + Shift + Z (Mac): 撤销最后一次操作。
   - Ctrl + Shift + F: 在项目中进行全局搜索。
   - Ctrl + F: 在当前文件中进行搜索。
   - Ctrl + Shift + F7: 高亮显示当前选中的文本，在文本中所有出现的地方都高亮显示。
   - Ctrl + Alt + O: 优化导入，移除未使用的导入并按需导入类。

2. **快捷输入** 
   - `sout`: 打印输出语句 `System.out.println();`
   - `psvm`: 快速生成主方法 `public static void main(String[] args) {...}`
   - `soutv`: 打印变量值 `System.out.println("变量名 = " + 变量);`
   -  `soutm`: 打印方法名 `System.out.println("类名.方法名");`
   - `soutp`: 打印方法参数值 `System.out.println("参数名 = " + 参数);`

这些快捷输入方式能够提高编码效率，同时 IntelliJ IDEA 还提供了许多其他方便的快捷输入方式，如：

   - `fori`: 快速生成 for 循环 `for (int i = 0; i < length; i++) {...}`
   - `iter`: 快速生成增强型 for 循环 `for (Type element : iterable) {...}`
   - `ifn`: 生成 if 语句，检查对象是否为 null `if (object == null) {...}`
   - `inn`: 生成 if 语句，检查对象是否不为 null `if (object != null) {...}`
   - `iferr`: 生成 try-catch 语句块，捕获异常 `try {...} catch (Exception e) {...}`

此外，还有一些其他常用的快捷输入方式，如：

   - `souf`: 格式化输出字符串 `System.out.printf("格式化字符串", 参数);`
   - `psf`: 生成 `public static final` 字段 `public static final 类型 字段名 = 值;`
   - `psfs`: 生成 `public static final String` 字段 `public static final String 字段名 = "值";`
   - `psfi`: 生成 `public static final int` 字段 `public static final int 字段名 = 值;`
   - `psfs`: 生成 `public static final String` 字段 `public static final String 字段名 = "值";`

这些快捷输入方式能够减少开发过程中的重复性工作，提高代码编写效率。
3. **代码模板**
   - 你可以使用代码模板来快速生成常用代码块，比如 `main` 方法、`for` 循环等。在设置中搜索 "Live Templates" 可以管理和添加自定义代码模板。

4. **多行编辑**
   - 在编辑器中按住 `Alt` 键并点击鼠标左键，可以进行多行同时编辑。这在需要同时修改多行代码时非常有用。

5. **版本控制**
   - IDEA集成了版本控制工具，如Git，可以方便地进行代码版本管理。通过 `VCS` 菜单可以执行版本控制相关的操作。

6. **插件**
   - IDEA支持丰富的插件生态系统，你可以根据自己的需求安装各种插件来扩展IDEA的功能，比如支持不同语言、框架的插件，或者是各种辅助工具插件等。

7. **代码调试**
   - 使用IDEA内置的调试工具可以方便地进行代码调试，设置断点、监视变量值等操作可以帮助你更快地定位和解决问题。

8. **代码提示和自动补全**
   - IDEA的代码提示和自动补全功能非常强大，能够根据上下文快速推断你想要输入的代码，大大提高了编码效率。

9. **快速导航**
   - 使用 `Ctrl + N` 或 `Ctrl + Shift + N` 可以快速跳转到类或文件，而 `Ctrl + Shift + F12` 可以最大化编辑器窗口，帮助你更专注地编写代码。

10. **代码检查和重构**
   - IDEA内置了代码检查和重构工具，可以帮助你发现潜在的问题并提供相应的解决方案，同时也能够帮助你对代码进行优化和重构，提高代码质量。



# 一、语法基础 （Grammar basics）：

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

# 二、流程控制 （Process Controls）：

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

# 三、数组 （Array）：

数据类型 [ ]  数据名称 = { } ;


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

# 四、方法  （Method）：

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
## 2. 设计方法的技巧主要注意三个方面：
1.方法是否需要接收数据进行处理？
2.方法是否需要返回数据？
3.方法要处理的业务（编程能力）

感谢你阅读我的博客文章！如果你有任何问题或想了解更多关于这个项目的内容，请随时与我联系。
QQ邮箱：2855935354@qq.com
---