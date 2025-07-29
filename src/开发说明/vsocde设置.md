- vscode一次性安装所有工具
  - ctrl + shift+ P -->GO:show all commands --> Go：Install/Update Tools
vscode保存go，格式化太慢
- 降级gopls  go install -v golang.org/x/tools/gopls@v0.14.2
- 使用gofumpt go install mvdan.cc/gofumpt@latest  

- 光标闪烁，和光标移动动画
  - 设置，搜索 cursor  blinking
    - Cursor Blinking 改成smooth
    - Cursor Smooth Caret Animation 改成on

- 函数行内显示参数名称
  - 设置-->搜索 parameter ，选择对应语言的类似 “启用/禁用参数名称的叠加提示”的选项，选择all(显示参数和值的名称)
- vscode 编辑窗口的鼠标右键的go 显示设置，便于快速使用鼠标右键执行go命令
   -  settings.jons 配置如下：  
```  
         
    "go.editorContextMenuCommands": {
        "toggleTestFile": true,
        "addTags": true,
        "removeTags": false,
        "fillStruct": false,
        "testAtCursor": true,
        "testFile": false,
        "testPackage": false,
        "generateTestForFunction": true,
        "generateTestForFile": false,
        "generateTestForPackage": false,
        "addImport": true,
        "testCoverage": true,
        "playground": true,
        "debugTestAtCursor": true,
        "benchmarkAtCursor": false
    },
```