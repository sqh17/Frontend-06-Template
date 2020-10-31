学习笔记

* 花括号可以代表一个作用域，在花括号内，变量等都是局部的。
* break/continue与label：
  label标记语句（labeled statement）（所谓标记就是在一条语句前面加个可以引用的标识符），可与break或continue语句联合使用.
  在有多个循环嵌套时，如果要跳出某一个循环，需要借助label语句。

      var num=0;
      outter:                         //label语句，名字可自定义
      for(var i=0;i<10;i++){
          for(var j=0;j<10;j++){
              if(i==5&&j==5){
                  break ;             //跳出当前循环，但会继续执行外循环
              }
              num++;
          }
      }
      console.log(num);   //95

      //---------

      var num=0;
      outter:
      for(var i=0;i<10;i++){
          for(var j=0;j<10;j++){
              if(i==5&&j==5){
                  break outter;    //退出内部循环，指向outter，即外循环，同时退出外循环
              }
              num++;
          }
      }
      console.log(num);   //55

      // ---------

      var num=0;
      outter:
      for(var i=0;i<10;i++){
          for(var j=0;j<10;j++){
              if(i==5&&j==5){
                  continue;    //当i==5&&j==5时，内循环退出一次
              }
              num++;
          }
      }
      console.log(num);     //99

      // --------

      var num=0;
      outter:
      for(var i=0;i<10;i++){
          for(var j=0;j<10;j++){
              if(i==5&&j==5){
                  continue outter;  //强制退出内部循环，执行外部循环，和 例子1 一样
              }
              num++;
          }
      }
      console.log(num);    //95