学习笔记

* 字典树
  大量的高重复字符串的存储与分析；
  两个字符串是否完全一致
  典型应用是用于统计和排序大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。
  它的优点是：最大限度地减少无谓的字符串比较，查询效率比哈希表高。
      Trie的核心思想是空间换时间。利用字符串的公共前缀来降低查询时间的开销以达到提高效率的目的。

* KMP
  不是完整的匹配算法，是个部分匹配算法，在长字符串里寻找模式；
  一个字符串里是否包含另一个字符串 

  部分匹配值：就是"前缀"和"后缀"的最长的共有元素的长度(参考[阮一峰字符串匹配的KMP算法](http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html) )

      搜索词     A B C D A B D
      部分匹配值  0 0 0 0 1 2 0

      －  A"的前缀和后缀都为空集，共有元素的长度为0；

      －　"AB"的前缀为[A]，后缀为[B]，共有元素的长度为0；

      －　"ABC"的前缀为[A, AB]，后缀为[BC, C]，共有元素的长度0；

      －　"ABCD"的前缀为[A, AB, ABC]，后缀为[BCD, CD, D]，共有元素的长度为0；

      －　"ABCDA"的前缀为[A, AB, ABC, ABCD]，后缀为[BCDA, CDA, DA, A]，共有元素为"A"，长度为1；

      －　"ABCDAB"的前缀为[A, AB, ABC, ABCD, ABCDA]，后缀为[BCDAB, CDAB, DAB, AB, B]，共有元素为"AB"，长度为2；

      －　"ABCDABD"的前缀为[A, AB, ABC, ABCD, ABCDA, ABCDAB]，后缀为[BCDABD, CDABD, DABD, ABD, BD, D]，共有元素的长度为0。

   移动位数 = 已匹配的字符数 - 对应的部分匹配值

* wildcard
  在KMP的基础上加上了通配符；
  常用于文件查找之类的 
  * 两种通配符 * ？
		1. ? 代表 可以充当任意字符 等价于 [\\s\\S].
		2. \* 代表充当长度大于等于0的任意字符串



* String.fromCharCode(Unicode)
  将 Unicode 编码转换为一个字符串,参数是一个或多个 Unicode 值，即要创建的字符串中的字符的 Unicode 编码

      var n = String.fromCharCode(72,69,76,76,79);
      console.log(n); // HELLO

* charCodeAt()
  返回指定位置的字符的 Unicode 编码.
  charCodeAt() 与 charAt() 方法执行的操作相似，只不过前者返回的是位于指定位置的字符的编码(索引)，而后者返回的是字符子串。
  参数表示字符串中某个位置的数字，即字符在字符串中的下标

      var str="Hello world!"
      str.charCodeAt(1) // 101