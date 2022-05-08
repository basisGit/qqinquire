interface  values {
    // 请求路径/地址
    url: string,
    // 请求类型 get/post
    type: string,
    // 是否异步
    asyn: boolean,
    // qq账号
    qq: string,
    // 请求成功执行函数
    success: any,
    // 请求失败执行函数
    error: any
}

export default function (parameter: values) {
    const {
        url,
        type,
        asyn,
        qq
    } = parameter
    // 声明原型
    const _AJAX: any = new XMLHttpRequest();
    // 是否为get类型请求
    const _WHETHERGET: boolean = url.toUpperCase() === 'GET'
    // 为get请求时拼接url
    const _PATH: string = url + (_WHETHERGET ? `?qq=${qq}` : ''); 
    // 创建请求
    _AJAX.open(type, _PATH, asyn);
    // 设置请求头
    if (!_WHETHERGET) _AJAX.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // 发送请求 为post请求时携带参数qq
    _AJAX.send(_WHETHERGET ? '' : `qq=${qq}`)
    /*
        -readyState响应函数-

        0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪
    */
    _AJAX.onreadystatechange = function () {
        // 响应已就绪并且请求成功 —— 视为成功
        if (_AJAX.readyState === 4 && _AJAX.status === 200) {
            // 执行成功函数并将数据解析传递
            parameter.success(JSON.parse(_AJAX.responseText))
        } else if (_AJAX.readyState === 4) {
            // 响应已就绪但是请求未成功 —— 视为失败 —— 执行失败函数
            parameter.error(_AJAX.status)
        }
    }
}
