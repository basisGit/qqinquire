import { useEffect, useState } from 'react';
// AJAX原型XMLHttpRequest封装函数 -- 用于请求接口
import xml from './ajax';

interface typeStyle {
  color: string,
  borderColor: string
};

function App () {
  // 触发message动画化样式
  const [messageStyle, setMessageStyle] = useState({}) as any;
  // message提示文案设置
  const [messageText, setMessageText] = useState('');
  // message状态icon设置
  const [messageIcon, setMessageIcon] = useState(<></>);
  // input框所输入的合规QQ号
  const [qqAccount, setQqAccount] = useState('');
  // 触发loading样式开关
  const [loading, setLoding] = useState(false);
  // 查询按钮禁用状态样式设置
  const [banButton, setBanButton] = useState({});
  // 接口获取QQ信息容器
  const [qqInfo, setQqInfo] = useState(
    {
      code: 0,
      name: '',
      qq: '',
      qlogo: ''
    }
  ) as any;
  /*
    message提示函数调用
      type = 类型 ( error / success ),
      text = 文案
      time = 出现时间 ( 毫秒 )
  */
  function _message (type: string, text: string, time = 1000) {
    // icon设定JSX
    let _typeIcon: any = <></>;
    // 主题色配套设置 -- 默认为失败样式
    const _typeColor: typeStyle = {
      color: '#ff4d4f',
      borderColor: '#ff4d4f'
    };
    // 填充文案
    setMessageText(text)
    // 区分判断type并设置icon的JSX和主题色 -- 因为svg配置相同所以仅仅设置其中的path
    if (type.toLowerCase() === 'error') {
      _typeIcon = <>
                    <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path>
                    <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                  </>;
    } else if (type.toLowerCase() === 'success') {
      _typeIcon = <>
                    <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path>
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                  </>
                  
      _typeColor.color = '#52c41a';
      _typeColor.borderColor = '#52c41a';
    } else {
      // 参数不合规重新填充文案提醒
      setMessageText('message-type参数超出预期请校准');
      return false;
    }
    // 填充icon的JSX
    setMessageIcon(_typeIcon);
    // 填充动画样式与主题色
    setMessageStyle(
      {
        display: 'block',
        animation: `error ${time}ms linear infinite`,
        ..._typeColor
      }
    );
    // 启动定时任务用于隐藏message
    setTimeout(
      () => {
        setMessageStyle({});
      },
      time
    );
  };
  // 查询QQ号函数, 调用在查询按钮点击时间与输入框按下回车时
  function _sendHttp () {
    // 校验账号格式
    if (!/^[1-9]{1}[0-9]{2,}$/.test(qqAccount)) {
      _message('error', 'QQ号格式错误请检查修改后再次查询 !');
      return false;
    };
    // 设置loading展示
    setLoding(true)
    // 整理参数进行接口请求
    xml(
      {
        // 请求地址
        url: 'https://api.uomg.com/api/qq.info',
        // 请求方式
        type: 'post',
        // qq号
        qq: qqAccount,
        // 是否同步
        asyn: true,
        // 接口发送成功
        success (res: any) {
          // 取消loading
          setLoding(false)
          // 判断是或否获取成功并作出对应操作弹出对应状态的message
          if (res.code === 1) {
            setQqInfo({...res})
            _message('success', '查询成功 !');
          } else {
            _message('error', res.msg);
          };
        },
        // 接口发送失败
        error (value: any) {
          setLoding(false)
          _message('error', `status: ${value} , 请求服务器失败, 请稍后重试。`);
        }
      }
    );
  };
  // 根据输入框内容更新查询按钮禁用状态与样式
  useEffect (
    () => {
      setBanButton(
        qqAccount.length > 4 ?
          {
            backgroundColor: '#1890ff',
            color: '#fff',
            cursor: 'pointer'
          } :
          {}
      );
    },
    [qqAccount]
  );

  return (
    <div className='box'>
      {/* 查询区域 —— 输入框和查询按钮 */}
      <div className='qqForm'>
        <input
          className='qqInput'
          type="number"
          value={qqAccount}
          maxLength={15}
          onKeyDown={
            (e) => {
              // 在用户按下回车并输入框中内容合规时 —— 执行请求函数
              if ((e.code === 'NumpadEnter' || e.code === 'Enter') && qqAccount.length > 4) _sendHttp();
            }
          }
          // 禁止粘贴
          onPaste={ e => e.preventDefault() }
          // 禁止剪切
          onCut={ e => e.preventDefault() }
          placeholder="请输入需要查询的QQ账号"
          onChange={
            (e) => {
              // change后值
              let text = e.target.value;
              // 本次change变动值
              const KEY = (e.nativeEvent as any).data
              // 校验用数组
              const BANARR = ['e', '-', '+']
              const NUMBERARR = ['1','2','3','4','5','6','7','8','9','0']
              const { length } = text;
              // 校验输入内容是否合规 —— 不合规则删除新changValue
              const _REGEXP: RegExp = length < 3 ? /^[1-9]{1}[0-9]?$/ : /^[1-9]{1}[0-9]{2,}$/;
              if (!_REGEXP.test(text) && length && NUMBERARR.indexOf(KEY) > -1) text = text.substring(0, length - 1);
              // changeValue不为为输入计算符号情况下为value更新
              if (BANARR.indexOf(KEY) === -1) setQqAccount(text);
            }
          }
        />
        <p
          className={`inquireButton ${qqAccount.length > 4 ? 'buttonHover' : ''}`}
          onClick={qqAccount.length > 4 ? _sendHttp : () => null}
          style={
            {
              ...banButton
            }
          }
        >
          查 询
        </p>
      </div>
      <p></p>
      {
        /* 展示区域 —— 展示查询正确QQ号后所返回的信息 */
        qqInfo.code === 1 ?
        <div className='clearfix qqData'>
          <img src={qqInfo.qlogo} className='qqImg' alt="not" />
          <ul className='qqList'>
            <li>昵称 : {qqInfo.name?.length ? qqInfo.name : '暂无昵称'}</li>
            <li>账号 : {qqInfo.qq}</li>
          </ul>
        </div> :
        <div className='notData'>
          <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.88jR3gEuYPt6xgEshwVr9gHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7" alt="not" />
        </div>
      }
      {/* message功能 */}
      <div
        className='message'
        style={{...messageStyle}}
      >
        <svg
          style={
            {
              display: 'inline-block',
              lineHeight: 1,
              marginRight: '0.08rem',
              marginBottom: '-0.01rem'
            }
          }
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="close-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          {messageIcon}
        </svg>
        <span>{messageText}</span>
      </div>
      {
        /* loading功能 */
        loading &&
        <div className='loadingBox'>
          <i className='loader'></i>
          <p>运行中请稍候...</p>
        </div>
      }
    </div>
  )
}

export default App;
