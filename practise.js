// 节流
function throttle(fn, interval = 300) {
  let run = true;
  return function() {
    if (!run) return;
    run = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      run = true;
    }, interval);
  };
}

// 去抖
function debounce(fn, timeout = 300) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, timeout);
  };
}

// 深克隆（无function）
function deepclone(obj) {
  let type = Object.prototype.toString.apply(obj);
  if (type === '[object Object]') {
    let newObj = {};
    for (const key in obj) {
      newObj[key] = deepclone(obj[key]);
    }
    return newObj;
  } else if (type === '[object Array]') {
    let newObj = [];
    // newObj = [...obj];
    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];
      newObj.push(deepclone(element));
    }
    return newObj;
  } else {
    return obj;
  }
}

// 数组去重
function unique(arr1) {
  let resArr = [];
  let hashTable = {};
  for (let i = 0; i < arr1.length; i++) {
    if (!hashTable[arr[i]]) {
      hashTable[arr[i]] = true;
      resArr.push(arr[i]);
    }
  }
  return resArr;
}

function unique2(arr) {
  return Array.from(new Set(arr));
}

// 对象数组去重
function unique(songs) {
  let result = {};
  let finalResult = [];
  for (let i = 0; i < songs.length; i++) {
    result[songs[i].name] = songs[i];
    //因为songs[i].name不能重复,达到去重效果,且这里必须知晓"name"或是其他键名
  }
  //现在result内部都是不重复的对象了，只需要将其键值取出来转为数组即可
  for (item in result) {
    finalResult.push(result[item]);
  }
  return finalResult;
}

// sleep
function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
sleep(1000).then(() => {
  console.log('end');
});

async function asyncSleep(time) {
  console.log('start');
  await sleep(time);
  console.log('end');
}

// 多维数组展开
const flatten = arr => (Array.isArray(arr) ? arr.reduce((a, b) => [...a, ...flatten(b)]) : [a]);

const flatten = arr => {
  return arr.reduce((prev, cur) => (Array.isArray(cur) ? prev.concat(flatten(cur)) : prev.concat(cur)), []);
};

function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
    return arr;
  }
}
// 原型链继承
function Sup(id) {
  this.id = id;
}

Sup.prototype.tel = function() {
  console.log('id', this.id);
};

// 创建新对象
function createNewObj() {
  let obj = new Object();
  let con = [].shift.call(arguments);
  obj._proto_ = con.prototype;
  let result = con.apply(obj, arguments);
  return typeof obj === 'Object' ? result : obj;
}

// call实现,参数是一个一个传入
Function.prototype.myCall = function(context) {
  if (context == undefined) {
    context = window;
  }
  contxt.fn = this;
  let args = [...arguments].slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
};

Function.prototype.myApply = function(context) {
  if (context == undefined) {
    context = window;
  }
};

// 函数柯里化
const curry = func => {
  const g = (...allArgs) => (allArgs.length >= func.length ? func(...allArgs) : (...args) => g(...allArgs, ...args));
  return g;
};
