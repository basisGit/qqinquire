# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# 开发文件分布

    · JSX主要集中在App.tsx中进行编写, 其中也集成了loading与message等状态功能;

    · 发送网络请求方式选择采用Ajax原型XMLHttpRequest封装实现在ajax.tsx中进行编写;

    · 为支持H5端与Web端同时可以同时进行访问运行测试长度单位统一使用了rem, 并为此添加了rem.js方便换算理解;

    · 因为是单一功能, CSS样式表文件存在于public文件夹下, 并且直接在index.hemt中进行了link;

# 功能配备介绍

    · message提示 : 实现为两种状态控制样式 ( error / success ) 并配备对应状态svg; --App.tsx -> _message()

    · loading状态 : 实现为全屏loading通关函数控制显隐, 并配有遮罩层; --App.tsx -> setLoding()

    · input功能与限制 : {

        1、限制了输入时的粘贴行为;

        2、限制了输入时的剪切行为;

        3、限制了纯数字输入;

        4、根据QQ号规则添加了正则表达式用来限制输入内容 ( * QQ号规则见下文 [6] );

        5、限制了最大输入位数为15;

        6、QQ号规则为5~15位纯数字组合, 首个数字为非0及[1-9],其余2~15为常规[0-9];

        7、支持回车查询功能，在输入内容超过4位时按下回车(大小皆可)即可查询信息;
    }; --App.tsx -> input[number]

    · 查询按钮功能与限制 : 输入QQ号未到达5位时禁用按钮并制空点击事件, 反之点击即可校验参数并通过Ajax发送请求;

    · QQ信息展示功能 : 无展示数据时展示空状态图片, 当求情成功并返回code为1时展示信息模块;
