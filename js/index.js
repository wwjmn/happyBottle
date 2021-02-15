// 加载函数
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

// 生成num个瓶子part函数
function createBottle(id, num) {
    var cardId = document.getElementById(id); //传入一个卡片id
    var cardIdBottleNum, wrapperUl;
    if (cardId.getElementsByClassName("wrapperUl").length == 0) {
        // 为卡片添加ul孩子节点
        // console.log("1");
        wrapperUl = document.createElement("ul");
        wrapperUl.className = "wrapperUl";
        cardId.appendChild(wrapperUl);
    } else {
        wrapperUl = cardId.getElementsByTagName("ul")[0];
        // console.log("2");
    }

    //获得卡片现有瓶子数量
    var existNum = cardId.getElementsByTagName('li').length;
    if (existNum == 0) {
        cardIdBottleNum = 0;
    } else {
        cardIdBottleNum = existNum;
    }

    for (var i = 0; i < num; i++) {
        // 创建一个li元素， bottleLi
        var bottleLi = document.createElement("li");
        // 给bottleLi增加class名
        bottleLi.className = "bottle" + (i + cardIdBottleNum);
        bottleLi.className = bottleLi.className + " " + "bottlePart";
        // 在ul下加入li
        wrapperUl.appendChild(bottleLi);

        // 创建bottle div加入li
        var divBottle = document.createElement("div");
        divBottle.className = "bottle";
        bottleLi.appendChild(divBottle);
        var ulTag = document.createElement('ul');
        divBottle.appendChild(ulTag);

        // 创建tag div加入li
        var divTag = document.createElement("div");
        divTag.className = "tag";
        bottleLi.appendChild(divTag);
        // 卡片高度
        cardId.style.height = (64 + 164 * Math.ceil((num / 6)) + 32) + "px";
        //添加加水事件
        addWater(bottleLi);
        //添加标签
    }
}


// 为卡片添加标签
function addCardTag(id, arrayTag) {

    var cardId = document.getElementById(id);
    // 获得卡片现有瓶子数量
    var lengthCard = cardId.getElementsByTagName('li').length;
    // 获得传入tag数组长度
    var lengthTag = arrayTag.length;
    for (var i = 0; i < Math.min(lengthCard, lengthTag); i++) {
        var tagName = document.createTextNode(arrayTag[i] + "");
        var bottle = cardId.getElementsByClassName("bottle" + i)[0]; //类名为bottle i 的bottlePart
        var tag = bottle.childNodes[1]; //获取bottlei下的tag节点
        tag.appendChild(tagName);
    }
}


// 加水函数
function addWater(bottleLi) {
    // var idname = document.getElementById(id);
    // var bottleLi = idname.getElementsByTagName('li');
    // console.log(bottleLi);
    var bottle = bottleLi.getElementsByClassName('bottle')[0];

    // 1. 先添加tag更改事件点击函数
    var tag = bottleLi.getElementsByClassName('tag')[0];
    // console.log(tag);
    tag.onclick = function () {
        var this_ = this;
        var oldhtml = this.innerHTML;
        var newobj = document.createElement('input'); //创建新的input元素
        newobj.type = 'text'; //为新增元素添加类型
        newobj.value = oldhtml; //为新增元素添加value值
        // newobj.placeholder = 'input';
        //为新增元素添加光标离开事件
        newobj.onblur = function () {
            this_.innerHTML = this.value == oldhtml ? oldhtml : this.value;
            //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值 
        }
        //为新增元素添加回车后，失去焦点事件

        this.innerHTML = ''; //设置该标签的子节点为空
        this.appendChild(newobj); //添加该标签的子节点，input对象
        newobj.setSelectionRange(0, oldhtml.length); //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
        newobj.focus(); //设置获得光标
    }

    // 2. 瓶子加水点击事件
    bottle.onclick = function () {
        var ulTag = this.getElementsByTagName('ul')[0];
        var li = document.createElement("li"); // 创建一个li

        if (ulTag.childElementCount == 10) {
            var heidden = ulTag.appendChild(li);
            heidden.style.display = 'none';
        } else if (ulTag.childElementCount < 10) {
            ulTag.appendChild(li);
        } else if (ulTag.childElementCount % 11 == 0) {
            ulTag.innerHTML = '';
        }
    }
}

// !注意： 在绑定点击事件前，先一定要确认，执行绑定操作的时候，该元素是不是已经存在在页面上，也就是html上了，假如执行绑定的时候元素还没有生成在页面上，那么绑定肯定就失败了
// $("父元素").on("click","要绑定事件的元素",function(){方法体}，亲测有效，这也是所谓的事件委托。

/* 显示相应id="id2",同时隐藏其他部分*/
function showSection(id2) {
    // var idname = document.getElementById(id1);
    var cards = document.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].getAttribute("id") != id2) {
            cards[i].style.display = "none";
        } else {
            cards[i].style.display = "block";
        }
    }
}
// 这段代码是当点击id标签下的classname里的<nav>里的a标签时
//id:整个wrapper； classname：导航栏所在的类
/*需要在id值为id下的<nav>所包含的链接被点击时调用上述函数showSection()*/
function prepareInternalnav(id, classname) {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    // 	获取需要功能的模块的id
    var idname = document.getElementById(id);
    var classnames = idname.getElementsByClassName(classname);
    if (classnames.length == 0) return false;
    var navs = classnames[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1]; /*array = string.split(character)字符分割，为了取#后的id*/
        if (!document.getElementById(sectionId)) continue; /*如果不存在此id，则进行下一圈循环*/
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function () {
            showSection(this.destination);

            // 顺便给现在显示的卡片加here类
            for (var i = 0; i < links.length; i++) {
                links[i].className = '';
            }
            this.className = 'here';
            return false;
        }
    }
}

// 获取已存在卡片的数量
function cardCount() {
    var wrapper = document.getElementById("wrapper");
    var cardNav = wrapper.getElementsByClassName("cardNav")[0];
    var cardLen = cardNav.getElementsByTagName("a").length; // 获取已存在卡片的数量
    return cardLen;
}

//功能按钮
// 点击新建一个空白card：cardDiv
function addCard() {
    var newCard = document.getElementById("newCard");
    var cardPart = document.getElementById("cardPart");
    var delCard = document.getElementById("delCard");
    newCard.onclick = function () {

        // 点击新建按钮后
        // 1.弹出输入卡片名字对话框
        var cardIdName, num;
        cardIdName = prompt("请输入卡片名（8个字以内）：");

        num = prompt("请输入瓶子数量(1~100的整数）：");
        if (!cardIdName) {
            return;
        } else {
            // console.log(typeof(num)); // num的类型是字符串，字符串可以和数比较
            // '101'>100 true; "fmsavvuv"%1 != 0 true ;'' == 0也是true；' '==0true
            // 这句if只用三个判断表达式，就保证了只有1～100的整数是false。
            if (num > 100 || (num % 1 != 0) || num == 0) {
                alert("输入的内容不符合要求！");
                return;
            }

            // var cardLength = cardCount(); // 获取已存在卡片的数量

            // 2.生成id为cardNew的卡片
            var cardDiv = document.createElement("div");
            cardDiv.id = "cardNew";
            cardDiv.className = "card";
            cardPart.appendChild(cardDiv); //将新卡片放入卡片Part区
            // 在新卡片div里最前面添加卡片名div
            var cardDivName = document.createElement('div');
            cardDivName.className = "cardName";
            var cardDivNameText = document.createTextNode(cardIdName);
            cardDivName.appendChild(cardDivNameText); //卡片名div创建好了
            cardDiv.appendChild(cardDivName);
            // 新卡片的高度 = （num/6 向上取整）
            cardDiv.style.height = (64 + 164 * Math.ceil((num / 6)) + 32) + "px";

            // 3.为新卡片创建num个瓶子
            createBottle(cardDiv.id, num);

            // 4.为新卡片赋上初始tag
            addCardTag(cardDiv.id, []);

            // 5.为新卡片添加加水事件
            // addWater(cardDiv.id, num);


            // 6.在nav里增加此card链接
            var cardNav = wrapper.getElementsByClassName("cardNav")[0];
            var cardNavUl = cardNav.getElementsByTagName("ul")[0];
            var cardNavUlLi = document.createElement("li");
            var cardNavButton = document.createElement("button");
            cardNavUlLi.id = "cardNewLi";
            var cardNavUlLiA = document.createElement("a");
            var cardNavUlLiAText = document.createTextNode(cardIdName);
            cardNavUlLiA.href = "#cardNew";
            cardNavUlLiA.appendChild(cardNavUlLiAText);
            cardNavButton.appendChild(cardNavUlLiA);
            cardNavUlLi.appendChild(cardNavButton);
            cardNavUl.appendChild(cardNavUlLi);

            // 为新卡片增加链接功能
            prepareInternalnav("wrapper", "cardNav");

            //隐藏当前卡片,直接显示新建卡片
            showSection(cardDiv.id);

            // 右侧按钮新建卡消失，删除卡出现
            newCard.style.display = "none";
            delCard.style.display = "block";

            //添加卡片名更改事件点击函数  （这里可以封装成函数）
            cardDivName.onclick = function () {
                var this_ = this;
                var oldhtml = this.innerHTML;
                var newobj = document.createElement('input'); //创建新的input元素
                newobj.type = 'text'; //为新增元素添加类型
                newobj.value = oldhtml; //为新增元素添加value值
                // newobj.placeholder = 'input';
                //为新增元素添加光标离开事件
                newobj.onblur = function () {
                    if (oldhtml == '') {
                        this_.innerHTML = '';
                    } else {
                        this_.innerHTML = this.value == oldhtml ? oldhtml : this.value;
                    }

                    //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值 

                    // 更改左侧链接栏
                    var newcardNavUlLiAText = document.createTextNode(cardDivName.innerText);
                    // console.log(newcardNavUlLiAText);
                    cardNavUlLiA.innerHTML = '';
                    cardNavUlLiA.appendChild(newcardNavUlLiAText);
                }

                //为新增元素添加回车后，失去焦点事件还没做。

                this.innerHTML = ''; //设置该标签的子节点为空
                this.appendChild(newobj); //添加该标签的子节点，input对象
                newobj.setSelectionRange(0, oldhtml.length); //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
                newobj.focus(); //设置获得光标

            }

        }
    }
}


// 点击删除一个自己建的card
function delCard() {
    var newCardButton = document.getElementById("newCard");
    var delCardButton = document.getElementById("delCard");
    delCardButton.onclick = function () {
        var cardNew = document.getElementById('cardNew');
        if (cardNew != null) {
            // 删除card
            cardNew.parentNode.removeChild(cardNew);
            //删除nav里的链接
            var cardNewLi = document.getElementById("cardNewLi");
            cardNewLi.parentNode.removeChild(cardNewLi);
        }
        newCardButton.style.display = "block";
        delCardButton.style.display = "none";
    }

}

// 增加一个瓶子
function addBottle() {
    var addbottle = document.getElementById("addBottle");
    addbottle.onclick = function () {
        // 获得当前card
        var card = document.getElementsByClassName("card");
        var thiscard;
        for (var i = 0; i < card.length; i++) {
            if (card[i].style.display == "block") {
                thiscard = card[i];
                break;
            }
        }
        // 如果当前没有卡片
        if (thiscard == null) {
            alert("请先选择一个卡片或者新建一个卡片哦～");
            return;
        }
        var thiscardBottleNum = thiscard.getElementsByTagName('li').length;
        if (thiscardBottleNum > 100) {
            alert("瓶子数量已大于上限！");
        } else {
            createBottle(thiscard.id, 1);
        }

        // 新卡片的高度 = （num/6 向上取整）
        var thisCardBottleNum = thiscard.getElementsByClassName("bottlePart").length;
        thiscard.style.height = (96 + 164 * Math.ceil((thisCardBottleNum / 6))) + "px";
    }

}

// 删除最后一个瓶子
function delBottle() {
    var delbottle = document.getElementById("delBottle");
    delbottle.onclick = function () {
        // 获得当前card
        var card = document.getElementsByClassName("card");
        var thiscard;
        var thiscardUl;
        for (var i = 0; i < card.length; i++) {
            if (card[i].style.display == "block") {
                thiscard = card[i];
                thiscardUl = thiscard.getElementsByClassName("wrapperUl")[0];
                break;
            }
        }
        if (thiscard == null) {
            alert("请先选择一个卡片或者新建一个卡片哦～");
            return;
        }

        if (thiscardUl.lastChild) {
            thiscardUl.removeChild(thiscardUl.lastChild);
        } else {
            alert('不可以再删除了哦～');
            return;
        }

        // 新卡片的高度 = （num/6 向上取整）
        var thisCardBottleNum = thiscard.getElementsByClassName("bottlePart").length;
        thiscard.style.height = (96 + 164 * Math.ceil((thisCardBottleNum / 6))) + "px";
    }
}

// 点击保存生成一张图
function saveButton() {
    var savebutton = document.getElementById('saveButton');
    savebutton.onclick = function () {

        // 获得当前card
        var card = document.getElementsByClassName("card");
        var thiscard;
        var thiscardUl;
        for (var i = 0; i < card.length; i++) {
            if (card[i].style.display == "block") {
                thiscard = card[i];
                thiscardUl = thiscard.getElementsByClassName("wrapperUl")[0];
                break;
            }
        }
        if (thiscard == null) {
            alert("请先选择一个卡片或者新建一个卡片哦～");
            return;
        }

        // 生成一张图片(有些不稳定)
        //创建一个新的canvas
        var canvas2 = document.createElement("canvas");
        let _canvas = document.querySelector('div');
        var w = parseInt(window.getComputedStyle(_canvas).width);
        var h = parseInt(window.getComputedStyle(_canvas).height);
        //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
        canvas2.width = w * 2;
        canvas2.height = h * 2;
        canvas2.style.width = w + "px";
        canvas2.style.height = h + "px";
        //可以按照自己的需求，对context的参数修改,translate指的是偏移量
        //  var context = canvas.getContext("2d");
        //  context.translate(0,0);
        var context = canvas2.getContext("2d");
        context.scale(2, 2);

        html2canvas(document.querySelector("#" + thiscard.id)).then(function (canvas) {

            // savePart.appendChild(canvas);
            //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
            document.querySelector(".down").setAttribute('href', canvas.toDataURL());
        });
        // alert('图片正在保存到默认文件夹哦～');
    }
}

// 点击封面确定按钮，隐藏cover
function yesButton() {
    var coverYesButton = document.getElementById('yesButton');
    var covercardNav = document.getElementById('covercardNav');
    coverYesButton.onclick = function () {
        // 获得当前card
        var card = document.getElementsByClassName("card");
        var thiscard;
        for (var i = 0; i < card.length; i++) {
            if (card[i].style.display == "block") {
                thiscard = card[i];
                break;
            }
        }
        // 如果当前没有卡片
        if (thiscard == null) {
            alert("还未选择卡片呢～");
            return;
        } else {
            covercardNav.style.display = 'none';

        }
    }
}



function alterColor() {
    var altercolor = document.getElementById('alterColor');
    var flag = 5;
    altercolor.onclick = function () {
        flag++;
        if (flag % 5 == 1) { // 粉紫
            document.documentElement.style.setProperty('--color-1', "#aa4c8f");
            document.documentElement.style.setProperty('--color-2', "#C17BAE");
            document.documentElement.style.setProperty('--color-3', "#E6C9DE");
            document.documentElement.style.setProperty('--color-txt-2', "#602B4E");
        } else if (flag % 5 == 2) { //黄
            document.documentElement.style.setProperty('--color-1', "#c89932");
            document.documentElement.style.setProperty('--color-2', "#DAB772");
            document.documentElement.style.setProperty('--color-3', "#F0E4B5");
            document.documentElement.style.setProperty('--color-txt-2', "#655535");
        } else if (flag % 5 == 3) { //绿
            document.documentElement.style.setProperty('--color-1', "#006e54");
            document.documentElement.style.setProperty('--color-2', "#80aba9");
            document.documentElement.style.setProperty('--color-3', "#bed3ca");
            document.documentElement.style.setProperty('--color-txt-2', "#435A5A");
        } else if (flag % 5 == 4) { //黑白
            document.documentElement.style.setProperty('--color-1', "#2b2b2b");
            document.documentElement.style.setProperty('--color-2', "#646464");
            document.documentElement.style.setProperty('--color-3', "#C3C6CE");
            document.documentElement.style.setProperty('--color-txt-2', "#2D2D2D");
        } else if (flag % 5 == 0) { // 默认
            document.documentElement.style.setProperty('--color-1', "#053760");
            document.documentElement.style.setProperty('--color-2', "#5b7fa7");
            document.documentElement.style.setProperty('--color-3', "#B3DBFE");
            document.documentElement.style.setProperty('--color-txt-2', "#2E3F54");

        }
    }

}