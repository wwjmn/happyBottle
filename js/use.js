createBottle("card1", 24); // 为card1创建24个瓶子
createBottle("card2", 24); // 为card2创建24个瓶子
createBottle("card3", 24); // 为card3创建24个瓶子
createBottle("card4", 24); // 为card4创建24个瓶子
createBottle("card5", 32); // 为card5创建32个瓶子

// 为卡片添加标签tag
addCardTag("card1", ["猫", "狗", "逛网店", "逛街", "看电影", "追剧", "吃零食", "奶茶", "火锅", "雨天", "晴天", "雪天", "游乐园", "大海", "森林", "饮料", "咖啡", "牛奶", "被夸奖", "旅行", "收礼物", "挑礼物", "见到好朋友", "喜欢的人"]);
addCardTag("card2", ["电影", "电视剧", "综艺", "奶茶", "咖啡", "果汁", "白开水", "晴天", "雨天", "唱歌", "逛街", "逛淘宝", "跑步", "散步", "追星", "养宠物", "旅行", "宅家", "大山", "大海", "森林", "沙漠", "电子产品", "乐器"]);
addCardTag("card3", ["家里", "自己房间", "被子里", "手机有电", "有Wi-Fi", "人多的地方", "学校", "图书馆", "安静的乡村", "梦里", "父母在身边", "吃饱之后", "阳光照射的地方", "发工资了", "有存款", "听到喜欢的音乐", "阅读", "做运动", "美颜滤镜", "通过考试", "放假", "不用早起", "没人管", "学习"]);
addCardTag("card4", ["外形", "vocal", "dance", "rap", "艺能", "反差", "事业心", "咖位", "腹肌", "智商", "情商", "手好看", "长腿", "脸好看", "幽默", "会特技", "cp真", "沙雕", "会外语", "厨艺好", "狼系", "奶系", "爹系", "低音炮", "可泥", "单眼皮"]);
addCardTag("card5", ["奥本海默 Oppenheimer", "绝地追击", "燃冬", "学爸", "GT赛车：极速狂飙 Gran Turismo", "火山挚恋 Fire of Love", "忍者神龟", "孤注一掷", "巨齿鲨2", "热烈", "芭比 Barbie", "封神第一部：朝歌风云", "碟中谍7", "茶啊二中", "英格力士", "哈利波特", "扫毒3", "长安三万里", "夺宝奇兵5", "八角笼中", "消失的她", "我爱你！", "疯狂元素城", "闪电侠 The Flash", "变形金刚：超能勇士崛起", "蜘蛛侠：纵横宇宙", "天空之城", " 速度与激情10", "银河护卫队3", "长空之王", "人生路不熟", "灌篮高手", "龙马精神"]);

// id为wrapper下，导航栏在class为cardNav下，点击跳转到相应的卡片页面
prepareInternalnav("wrapper", "cardNav");
prepareInternalnav("covercardNav", "cover");


//功能按钮
// 点击新建一个空白card：cardDiv
addLoadEvent(addCard);

// 点击删除一个自己建的card
addLoadEvent(delCard);

// 增加一个瓶子
addLoadEvent(addBottle);

// 删除最后一个瓶子
addLoadEvent(delBottle);

// 点击保存生成一张图
addLoadEvent(saveButton);

// 点击封面确定按钮，隐藏cover
addLoadEvent(yesButton);

// 更改配色
addLoadEvent(alterColor);