# wdw-oj_front-end

**张淘月 815869083@qq.com**

### 项目介绍

因为南科大数据库原理（cs307）课程知识涉及到sql语句的学习和使用，故需要oj平台来优化老师和同学的课程体验。此项目已经在20年秋季学期试用，并计划于21年春季学期正式上线使用。oj平台支持pgsql、mysql、sqlite语言包括trigger、聚合函数等sql语句的测试。教师可设置作业、题目以及查看完成情况及查重，学生可查看题目并提交测试。前端使用react框架及antd组件库完成，在此基础上进行了如富文本编辑器、代码编辑器、动画效果等优化。此仓库为前端部分，所以会对前端feature做简单的介绍，后端代码可见https://github.com/Mr-Ghabi/DatabaseOnlineJudge/tree/master。

### 效果展示

##### 登陆界面

使用antd motion库组件实现动画效果，并在所有界面的过场使用流畅的动画效果。

![start](https://github.com/Noname690/wdw-oj_front-end/blob/main/assets/start.gif
)

##### 主界面

学生主界面，查看作业信息及提交记录。

![assignments](https://github.com/Noname690/wdw-oj_front-end/blob/main/assets/assignments.gif
)

##### 添加一次作业（教师）

![add_assignment](https://github.com/Noname690/wdw-oj_front-end/blob/main/assets/add_assignment.gif)

##### 添加一道题目（教师）

新增一次作业，可选择已存在的数据库并提供标解，使用富文本编辑器来编辑题目描述，支持上传图片、代码块等其他格式。

![add_question](https://github.com/Noname690/wdw-oj_front-end/blob/main/assets/add_question.gif)

##### 完成并提交题目

此界面可查看题目并提交代码，代码编辑器使用codemirror，可实现自动补全、高亮等编辑器功能，除此之外可查看同一题目其他人完成情况。

![codemirror](https://github.com/Noname690/wdw-oj_front-end/blob/main/assets/codemirror.gif)

---------------------------------------

有任何问题请联系邮箱815869083@qq.com!
