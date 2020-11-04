学习笔记

* event.which
  针对键盘和鼠标事件，这个属性能确定你到底按的是哪个键。
  event.which也将正常化的按钮按下(mousedown 和 mouseupevents)，左键报告1（是数字，不是字符串），中间键报告2，右键报告3。使用event.which代替event.button。