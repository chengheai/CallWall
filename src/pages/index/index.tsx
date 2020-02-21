import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.less';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: '手持弹幕',
      panelFlag: false,
      barFlag: true,
      colorIndex: 0,
      speedIndex: 0,
      sizeIndex: 0,
      scorllDuration: 5000,
      hintText: '(ﾉ◕ヮ◕)ﾉ点击非输入区域即可隐藏/显示界面哦！',
      textLen: 0,
      animation: {},
      currentSpeed: 0,
      sizeArr: [
        {
          name: '正常',
          value: 40,
          active: true,
        },
        {
          name: '小',
          value: 25,
          active: false,
        },
        {
          name: '大',
          value: 60,
          active: false,
        },
        {
          name: '超大',
          value: 80,
          active: false,
        },
      ],
      speedArr: [
        {
          name: '正常',
          value: 5000,
          active: true,
        },
        {
          name: '慢',
          value: 7000,
          active: false,
        },
        {
          name: '快',
          value: 3000,
          active: false,
        },
      ],
      colorArr: [
        {
          value: '#fff',
          active: true,
        },
        {
          value: '#f00',
          active: false,
        },
        {
          value: '#DA70D6',
          active: false,
        },
        {
          value: '#FFFFE0',
          active: false,
        },
        {
          value: '#00FFFF',
          active: false,
        },
        {
          value: '#1E90FF',
          active: false,
        },
        {
          value: '#F0FFFF',
          active: false,
        },
        {
          value: '#00FF00',
          active: false,
        },
      ],
    };
  }
  componentWillMount() {
    this.setState({
      windowHeight: window.document.height,
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
  };

  render() {
    return (
      <View className="c-wrapper">
        <Text className="t-scroll-text">Hello world!</Text>
      </View>
    );
  }
}
