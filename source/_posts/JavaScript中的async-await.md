---
title: JavaScript中的async/await
categories:
  - Software Development
date: 2020-02-13 9:02:50
tags:
  - JavaScript
  - 前端
---
参考:[MDN-async和await:让异步编程更简单](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/Async_await)

1. 它们是ES2017加入的关键字，充当Promise的语法糖。
2. async关键字放在函数声明之前，它将任何函数转化为Promise，使得该函数返回后可以用then()方法。
```js
//写法1
async function hello() { return "Hello" };
//写法2
let hello = async function() { return "Hello" };
//写法3
let hello = async () => { return "Hello" };
console.log(hello()); // Promise { 'hello' }
hello().then((result)=>console.log(result)); // hello
```

通过仅在函数声明为异步时添加必要的处理，JavaScript引擎可以优化程序。

3. await可以放在任何基于异步声明的函数之前，只能在异步函数内部工作暂停代码在该行上，直到promise完成，然后返回结果值。与此同时，可能正在等待执行机会的其他代码也会这样做。可以在调用任何返回Promise的函数时使用await，包括Web API函数。

有如下基于Promise的代码：
```js
fetch('coffee.jpg')
.then(response => response.blob())
.then(myBlob => {
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
})
.catch(e=>{
    console.log('there has been a problem with your fetch operation: ' + e.message);
});
```
利用async和await进行优化
```js
async function myFetch(){
    let response = await fetch('coffee.jpg');
    let myBlob = await response.blob();
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}
myFetch();
```
或者可以把async/await和Promise进行混合搭配:
```js
async function myFetch() {
  let response = await fetch('coffee.jpg');
  return await response.blob();
}

myFetch().then((blob) => {
  let objectURL = URL.createObjectURL(blob);
  let image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
});
```
async/await也可以try...catch
```js
async function myFetch() {
  try {
    let response = await fetch('coffee.jpg');
    let myBlob = await response.blob();

    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
  } catch(e) {
    console.log(e);
  }}
myFetch();
```
***
### async/await的一个缺点

await关键字阻止执行所有代码，直到promise完成，就像执行同步操作一样。它允许其他任务在此期间继续运行，但自己的代码被阻止。

这意味着代码可能会因为大量等待的promises相继发生而变慢。`每个await将等待前一个完成`，而实际上我们想要的是promises同时开始处理（就像我们没有使用async/await时那样）。


有一种模式可以缓解这个问题 ––通过关闭所有promise进程将Promise对象存储在变量中，然后等待触发它们。

如下段代码：
```js
function timeoutPromise(interval) {
        return new Promise((resolve, reject) => {
          setTimeout(function(){
            resolve("done");
          }, interval);
        });
      };
 /*主要是这段
async function timeTest() {
        await timeoutPromise(3000);
        await timeoutPromise(3000);
        await timeoutPromise(3000);
}
*/
      let startTime = Date.now();
      timeTest().then(() => {
        let finishTime = Date.now();
        let timeTaken = finishTime - startTime;
        console.log('finish' + Date.now());
        alert("Time taken in milliseconds: " + timeTaken);
      })
      console.log('start'+Date.now());
```
上面注释那一段会等待所有三个timeoutPromise()调用，使每个调用3秒钟。后续的每一个都被迫等到最后一个完成，导致最后总用时9s。

对上面那段优化：
```js
async function timeTest() {
  const timeoutPromise1 = timeoutPromise(3000);
  const timeoutPromise2 = timeoutPromise(3000);
  const timeoutPromise3 = timeoutPromise(3000);

  await timeoutPromise1;
  await timeoutPromise2;
  await timeoutPromise3;
}
```
在这里，将三个Promise对象存储在变量中，这样可以同时启动它们关联的进程。接下来，等待他们的结果 - 因为promise都在基本上同时开始处理，promise将同时完成;

第二个示例警报框报告总运行时间刚刚过3秒！

`对于使用async/await造成的性能问题，必须仔细测试代码，并在性能开始受损时牢记这一点。`