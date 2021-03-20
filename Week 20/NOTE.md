学习笔记

### Git Hook

- git commit -a -m "提交信息" = git add + git commit -m "提交信息"
  `git commit -a -m` "提交信息"只将被 tracked 的文件添加到暂存区并提交,就是首次提交不能用该命令。
- ls
  - ls //显示不隐藏的文件与文件夹
  - ls -a //显示当前目录下的所有文件及文件夹包括隐藏的.和..等
  - ls -l //显示不隐藏的文件与文件夹的详细信息
  - ls -al //显示当前目录下的所有文件及文件夹包括隐藏的.和..等的详细信息
- hooks
  - 该文件夹以 sample 结尾，去掉这个 sample，代表运行这个 hook
  - chomd +x 文件 开通权限
  - #!/user/bin/env node 以 node 环境运行

### eslint

- [文档](https://eslint.bootcss.com/docs/user-guide/getting-started)
- npx eslint --init
- npx eslint file

### eslint + git hook

- [eslint node api](https://eslint.bootcss.com/docs/developer-guide/nodejs-api)
- results 是个数组，里面的子元素如下
  ```javascript
  result = {
    filePath:
      "/Users/shiqinghao/Desktop/Frontend-06-Template/Week 20/git-demo/index.js",
    messages: [
      {
        ruleId: "no-unused-vars",
        severity: 2,
        message: "'a' is assigned a value but never used.",
        line: 1,
        column: 5,
        nodeType: "Identifier",
        messageId: "unusedVar",
        endLine: 1,
        endColumn: 6,
      },
    ],
    errorCount: 1,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    source: "let a = 2;\nfor(let i of [1,2,3,4]){\n  console.log(i);\n}",
    usedDeprecatedRules: [Getter],
  };
  ```
- child_process
- 自动

  ```javascript
  function exec(name) {
    return new Promise(
      function (resolve) {
        child_process.exec(name, resolve);
      },
      function (reject) {}
    );
  }
  // code...start
  exec("git stash push -k");
  // 2. Lint files. This doesn't modify target files.
  const results = await eslint.lintFiles(["index.js"]);
  exec("git stash pop");
  // code...end
  ```

### git stash

git stash 用于暂存工作区未提交的内容，便于在同时开发多个分支需要切换时保存当前分支进度。(已经 add 了还未 commit 的情况下，又进行了一些操作，可以先 stash 保存当前工作)

- git stash list 列出储藏列表
- git stash pop [stash@{id}]取出指定的队列，默认取出最新的队列,取出队列后会删除 stash 中的队列
- git stash show
- git stash save [-p|--patch] [-k|--[no-]keep-index] [-q|--quiet] [-u|--include-untracked] [-a|--all] [<message>]
  - 将本地更改保存到新的储藏队列，
  - [-p|--patch] 以 patch 模式提交，允许选择需要保存的块
  - [-k|--[no-]keep-index] [不]保留 index 序号
  - [-q|--quiet] 静默执行，即不显示结果
  - [-u|--include-untracked] 储藏时包括未跟踪的文件
  - [-a|--all] 储藏所有文件，包括忽略的文件
  - 建议使用 push 代替 save
- git stash push [push [-p|--patch] [-k|--[no-]keep-index] [-q|--quiet] [-u|--include-untracked] [-a|--all] [-m|--message <message>] [--] [<pathspec>...]]
  - 将本地修改保存到新的储藏队列，用法与 save 基本一致，多了[--] [<pathspec>...]可选参数
  - [--] [<pathspec>...] 使用路径匹配，只有路径匹配下的文件会被储藏，通常用于储藏部分文件
  - push 选项可以被省略，以便快速保存，省略 push 时，不能使用参数
- git stash drop [stash@{id}] 删除某个储藏队列，默认删除最新的储藏队列
- git stash apply 取出指定的队列,取出队列后不会删除 stash 中的队列
- git stash clear 删除所有储藏
