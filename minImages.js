/**
 *  @file 调用tinyPng服务压缩图片,暂时只支持png格式。用于打包后压缩static图片。需要用到key加密请求,每个key每月500张图片，超过需更换key。
 *  @param {IMG} 要压缩图片的路径
 *  @author haochengeng
 **/
const fs = require('fs');
const tinify = require('tinify');
const mkdirp = require('mkdirp');
const path = require('path');

// tinify.key = 'X98dnQDXMZx0MGDpw7cltvTXZkNr26wS';   // 405293141@qq.com
tinify.key = 'fbzNv8FYBN7MfY0N8N6ydr1PbNPgMmqF'; // haochenggeng@woozhu.cn
// tinify.key = 'JvcYhzmRTMSsnYJsZfBjvM19Hxf18p4Y'; // haochengeng@dafy.com

// 要压缩的图片目录，输出为同级 dist 目录
const IMG = './dist/static/images';

// 递归读取文件夹
function readDir(path) {
  fs.readdir(path, (err, files) => {
    if (err) {
      throw err;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let filePath = path + '/' + file;
      fs.stat(filePath, (err, stats) => {
        if (err) {
          throw err;
        }
        if (stats.isDirectory()) {
          readDir(filePath);
          mkdirs(filePath);
        } else {
          miniFile(filePath);
        }
      });
    }
  });
}

// mkdir -p 创建目录及子目录
function mkdirs(path) {
  let distDir = path.replace('/images/', '/minify/');

  mkdirp(distDir, () => {});
}

// 压缩图片并输出到 dist 目录
function miniFile(file) {
  console.log('file', file);
  let dir = IMG.replace('/images', '/minify');
  mkdirs(dir);
  let type = path.extname(file);
  let reg = /\.(jpeg|png|jpg)/;

  if (reg.test(type)) {
    try {
      const source = tinify.fromFile(file);
      let newDir = file.replace('/images/', '/minify/');
      source.toFile(newDir);
    } catch (error) {
      console.log('err', error);
    }
  } else {
    copyFile(file);
  }
}

// 不符合类型直接复制
function copyFile(path) {
  let dist = path.replace('/images/', '/minify/');
  fs.writeFileSync(dist, fs.readFileSync(path));
}

// 删除文件夹及内容
function delDir(path) {
  console.log('del', path);

  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); // 递归删除文件夹
      } else {
        fs.unlinkSync(curPath); // 删除文件
      }
    });
    fs.rmdirSync(path);
  }
}

function rename(path) {
  let old = './dist/static/minify';
  try {
    fs.renameSync(old, IMG);
  } catch (e) {
    fs.renameSync(old, IMG);
  }
}

readDir(IMG);
delDir(IMG);
rename();
