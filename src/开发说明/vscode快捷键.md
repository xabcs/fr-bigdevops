# 控制屏幕
- 上下左右键，移动光标
- PageUp/PageDown，滚动屏幕
- ctrl + 上下左右键，以行为单位滚动屏幕，光标悬停
- Alt + Pageup/PageDown，滚动屏幕光标悬停
# Shift 相当于拖动光标，与方向键结合选中文本
# 编辑窗口与光标移动
- 打开的编辑窗口直接切换：ctrl + tab或者`ctrl +PageUp/PageDown`
- `光标跳到某行： ctrl +G`
- `光标移动号行首：home`
- 光标移动到文件首：ctrl+home
- 光标以单词为单位移动：ctrl + 左右键
- 光标移动到下一个新行：ctrl + enter
- 光标移到到上一个新行：ctrl + shift+enter
- 光标在括号（()[]{}）或引号（''""）上时，按 Ctrl + Shift + \，直接跳转到对应的另一半。
- 光标移动到代码块所在的括号： ctrl + shift + \
# 窗口与命令面板
+ ctrl + B  打开隐藏侧边栏
- 光标移动到侧边栏： ctrl + 0 
- ctrl + J  打开隐藏终端，和ctrl + ` 功能基本一样
- - 光标跳到终端 ctrl + `，如果光标已经在终端中，则切换到编辑器并隐藏终端
- Ctrl+shitf + P  打开隐藏命令面板，搜索并执行命令
- Ctrl+shift+F  打开隐藏搜索面板，搜索字符串
- 打开关闭chat: ctrl+alt+B
-  注释
    - 单行注释：ctrl+ /
    - 多行注释：shift + 上下键选中多行，然后ctrl+ /,
    - 光标在行开头，然后shift+上下健选中多行，然后shift+alt+A    - 
    - 块注释：选中需要注释的块+ Alt+Shift+A

# 代码导航定位
- 代码大纲定位：
  - ctrl+ P 然后输入@ 然后输入你想要定位的函数名
  - ctrl+shift+.  在代码区域打开代码大纲
- ctrl+P  打开隐藏面板，搜索并转到文件
  - 直接通过文件名找文件
  - @显示代码大纲，可跳转
  - #全局系统搜索
- `光标在函数名上，转到函数定义 F12`
- `光标在函数名上，转到引用 shift + F12`
- `左侧显示调用链路层次 alt + shift + h`
  # 编辑
- 缩进
  - 无视光标在行中的位置 左/右 缩进：Ctrl+ [/]
- 移动行
  - 移动选中的行：shift+上下键(选中) 松开，再 alt+上下键
- 复制行
  - 向上下复制一行：
    - shift+alt+上下键
  - 向上下复制多行:
    - `多光标的方案，shift+上下键（选中多行） 松开再按 ait +上下键，向上或者向下复制选中的行`
    - 复制,剪切多行ctrl+alt+上下键 ,然后ctrl+x 或者 ctrl + c 或者 ctrl + v
- 快速选中：
  - 选中一行
    - 单击行号 
  - `以字符串为单位移动光标选中 :ctrl+shift+箭头键`
  - 多光标列选择（矩形选择）：Ctrl+Shift+Alt+箭头键，
这是 列选择模式 的快捷键，用于创建垂直方向的矩形选择区域
选择后会产生多个光标，允许你在多行使相同的编辑操作
  - 选中光标到文件头：ctrl+shift+Home
  - 选中光标到文件尾：ctrl+shift+End
  - 向下/向上选中一页: shift+PageUp/PageDown
  - 选中字符串：shift+ 方向键
  - `选中代码块：Alt + shift + 右箭头`
    - 选中光标所的代码块：如:"",{},[]等内部的代码"
  - 选中光标所在位置到行首：ctrl+shift+home 
  - 选中光标坐在位置到行尾：ctrl+shift+end
- 快速删除
  -   `删除括号：Ctrl + alt + Backspace` 
  -   删除光标所在行：shift+delete,或者ctrl+x
  -   `删除前一个单词：ctrl+backspace`  
  -   `删除后一个单词：ctrl+delete`
  -   `删除光标到行首:ctrl +k`
  - 删除光标到行尾:ctrl +shift+k （被cusor的内联编辑模式覆盖）
  -   删除光标到文件首：ctrl+shift+home （选中） + delete（删除）
  -   删除光标到文件尾：ctrl+shift+end （选中） + delete（删除）
- 代码块添加括号：
  - 选中代码块 + 括号
- 代码块展开折叠
  - `折叠/展开关闭代码块：光标在代码块任意位置，ctrl +shift+[ / ]`
- 多光标编辑：
  -  编辑多行的相同位置
     - 按 Shift + Alt + 鼠标拖动，创建纵向选择区域，光标会沿列方向移动,适合有对齐内容的的文件编辑
     - ctrl + alt + 上下键盘 ，可以在上下行创建多个光标
  - 编辑多行行尾
      - 选中代码块 + shift + alt +i :在选中的代码块的所有行的行尾添加光标
  - 编辑多处（不一定是同名的字符串）编辑
      - alt+光标选中另外的变量，然后双击鼠标左键
  - 编辑同名的多处字符串
    - 光标双击选中一个变量 然后ctrl + shitf + L  就会选中所有同名变量
    - ctrl +D 每按一次就多选一个同名变量
- 复制文件绝对路径：shift+alt+c
- 复制文件相对路径：ctrl+m或者ctrl+shift+c

# 快捷插入文件路径
  - 鼠标拖住文件到 编辑器中，然后按住shift键,松开就行了，可以右键选择绝对路径还是相对路径


#  重构功能
- 全局修改函数名或者变量名
  - 光标放在函数或者变量名上，按F2，输入新的函数名或者变量名
- 抽象一段代码转换成或者变量，抽象成变量的场景更好用
  - 选中代码，鼠标右键--> extract function/获取其他的重构操作


# 效率神器
- 自动生成测试用例 : `>Go:Generate test`
- 自动生成结构体实例化：`>Go:Fill struct`
- 自动实现接口：`>Go:Generate interface Stubs`--> 格式为：接收器 接收器类型 要实现的接口 如：s *Student User
```
如：我们有一个User接口
type User interface {
    GetID() int
    GetName() string
    SetName(name string)
}
现在我们创建了一个 Student 结构体，需要实现 User 接口：
type Student struct {
    ID   int
    Name string
}
此时使用 "Go: Generate Interface Stubs" 命令，输入 s *Student User，VS Code 会自动生成以下实现代码：
func (s *Student) GetID() int {
    panic("implement me")
}

func (s *Student) GetName() string {
    panic("implement me")
}

func (s *Student) SetName(name string) {
    panic("implement 
生成的代码会包含接口所需的所有方法，并使用 panic 作为占位符，提醒开发者去实现具体逻辑。这一功能特别适合处理包含多个方法的复杂接口，能有效避免遗漏方法实现
```
- 自动为结构体加和去除tag `>GO:Add Tags To Struct Fileds`,`>GO:Remove Tags From Struct Fileds`






















