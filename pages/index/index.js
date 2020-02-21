var timer;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    displayText: '表白、搭讪、接机神器',
    panelFlag: false,
    colorIndex: 0,
    speedIndex: 0,
    sizeIndex: 0,
    scrollDuration: 5000,
    textLen: 2392,
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
        value: '#00FF00',
        active: false,
      },
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight,
    });
  },

  /**
   * 查询字幕长度
   */
  getTextLen: function() {
    var query = wx.createSelectorQuery();
    query
      .select('.scroll-text')
      .boundingClientRect(obj => {
        console.log(obj);
        this.setData({
          textLen: parseInt(obj.height),
        });
      })
      .exec();
  },
  /**
   * 清除字幕
   */
  clearscroll: function() {
    clearInterval(timer);
    this.data.animation.translate3d(0, 0, 0).step({
      duration: 0,
    });
    this.setData({
      scroll: this.data.animation.export(),
    });
  },

  /**
   * 改变字体颜色
   */
  changeColor: function(e) {
    var newIndex = parseInt(e.currentTarget.dataset.index),
      after = 'colorArr[' + newIndex + '].active',
      before = 'colorArr[' + this.data.colorIndex + '].active';

    this.setData({
      colorIndex: newIndex,
      [before]: false,
      [after]: true,
    });
  },

  /**
   * 改变速度
   */
  changeSpeed: function(e) {
    this.clearscroll();

    var newIndex = parseInt(e.currentTarget.dataset.index);

    var after = 'speedArr[' + newIndex + '].active',
      before = 'speedArr[' + this.data.speedIndex + '].active';
    this.setData({
      speedIndex: newIndex,
      currentSpeed: (this.data.windowHeight * 2) / this.data.speedArr[newIndex].value,
      [before]: false,
      [after]: true,
    });

    this.scrollFuc();
  },
  handleFocus() {
    this.setData({
      textInput: '',
    });
  },
  /**
   * 改变字体大小
   */
  changeSize: function(e) {
    this.clearscroll();

    // 先设置大小
    var newIndex = parseInt(e.currentTarget.dataset.index),
      after = 'sizeArr[' + newIndex + '].active',
      before = 'sizeArr[' + this.data.sizeIndex + '].active';

    this.setData({
      sizeIndex: newIndex,
      [before]: false,
      [after]: true,
    });

    // 刷新
    this.scrollFuc();
  },
  textInput: function(e) {
    this.clearscroll();

    this.setData({
      displayText: e.detail.value,
    });

    this.scrollFuc();
  },
  /**
   * 动画控制
   */
  scrollFuc: function() {
    this.getTextLen();
    var scrollH = this.data.windowHeight * 2 + this.data.textLen;
    console.log('1111:', this.data.textLen);
    this.data.scrollDuration = parseInt(scrollH / this.data.currentSpeed);
    var scrollAmt = () => {
      this.data.animation.translate3d(-scrollH, 0, 0).step({
        duration: this.data.scrollDuration,
      });
      this.data.animation.translate3d(0, 0, 0).step({
        duration: 0,
      });
      this.setData({
        scroll: this.data.animation.export(),
      });
    };
    scrollAmt();
    // 循环动画
    timer = setInterval(() => {
      console.log(this.data.scrollDuration);
      scrollAmt();
    }, this.data.scrollDuration + 100);
  },
  togglePanel: function() {
    if (this.data.panelFlag) {
      this.setData({
        panelAmt: 100,
        panelFlag: false,
      });
    } else {
      this.setData({
        panelAmt: 0,
        panelFlag: true,
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var animation = wx.createAnimation({
      timingFunction: 'linear',
    });
    this.data.animation = animation;

    //初始化速度
    this.data.currentSpeed =
      (this.data.windowHeight * 2) / this.data.speedArr[this.data.speedIndex].value;

    this.scrollFuc();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
});
