---
title: Redux总结
titleImage:
categories:
  - Software Development
date: 2020-04-13 22:54:26
tags:
---

虽然一直在项目中用Redux，但是一直没有对Redux做一个总结，特此借此文作为自己对于理解Redux的一篇总结。

## 写在最前

Redux是由Facebook的Flux演变而来，并受到了函数式编程语言Elm的启发。Not only for React，任何JavaScript库都可以应用Redux。

Redux的作者：Dan Abramov & 

Redux解决的痛点：**状态管理**与**数据的流动与共享**。

>你可能并不需要Redux： ["You Might Not Need Redux"](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

## 应用背景

在React中，数据是单向流动的，只能从父组件到子组件，如果子组件想要给父组件传递数据(props)，那么只能通过父组件传回调给子组件，然后子组件再利用回调来给父组件传数据。假设在大项目中，有非常多的组件，如下图所示，如果绿色的组件(节点)想和红色组件(节点)进行数据传递的话，将原地爆炸。

![image.png](https://i.loli.net/2020/04/13/1l6jGJgtMTy7AhC.png)

这个时候，如果利用Redux对state进行统一管理，将很好地解决这个问题

## 基本用法

应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。 惟一改变 state 的办法是触发 action，一个描述发生什么的对象。 为了描述 action 如何改变 state 树，你需要编写 reducers。

说人话：

把你去图书馆借书这一过程类比为components获取state的过程：你(components)，首先要去图书馆说"我要借书"(action creators)，并把这句话告诉图书馆管理员(dispatch(action))，管理员(store)收到你的请求后会带着这次action去查询记录本(reducer)，通过记录本查询到你要借的书之后把书拿回来然后交给你(返回state)，这样你就成功借到书了(components拿到state)

![image.png](https://i.loli.net/2020/04/13/zwQKrJB8Nuah6nO.png)

下面对store, action, dispatch, reducer逐个拆解

### store

store就是数据保存的地方，**是redux的核心，所有的数据都要经过store，整个应用有且仅有一个 Store**

e.g: 创建store
```js
//store/index.js
import { createStore } from 'redux';
const store = createStore(fn); //传入的fn为reducer
```

### state

Store对象包含所有数据。如果想得到某个时刻的数据，就要对 Store 生成快照

该时刻数据的集合，就叫做 State

```js
const state = store.getState(); //内置API
```

### action

在前面提到，要想改变state，只能通过`dispatch(action)`这样的格式来进行，在这里先说action

action 是一个对象。必须包括一个type属性，表示 action 的名称。其他属性可以自由设置(即state中想改变的的属性)

```js
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```

### actionCreators & actionTypes

由于在redux中，state的变化必须交由action，所以action如果都手写，会很麻烦，在日常开发中，可以创建一个actionCreator和actionType来解耦

```js
//store/xx/actionTypes.js
export const ADD_TODO = '/[reducer_name]/add_todo]';
//.. else types

//store/xx/actionCreators.js
import * as actionTypes from './actionTypes';

export const addTodo = (text) => {
  return {
    type: actionTypes.ADD_TODO,
    text
  }}

//else file
const action = addTodo('Learn Redux');
```

### dispatch

action经由dispatch发送至reducer

```js
store.dispatch(addTodo('Learn Redux'));
```

### reducer

**Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。**

```js
//store/reducer.js
import * as actionTypes from '/xx/actionTypes';
const defaultState = {
    //可以设置初始状态的state
    items:[]
};

export default (state = defaultState, action) => {
    switch(action.type){
        case actionTypes.ADD_TODO:
            return Object.assign({},state,{  //注意,不能直接改变state, 必须返回一个全新的对象
                items: items.push(action.text)
            });//这样写也是ok的：return { ...state, ...newState };
        case xxx
        default:
            return state;
    }
};
```

Reducer 函数最重要的特征：**纯函数**。也就是说，**只要是同样的输入，必定得到同样的输出**，且需要遵守以下约束：
* 不得改写参数
* 不能调用系统 I/O 的API
* 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果

要让store知道reducer的改变，可以利用store的subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数

```js
store.subscribe(()=>{
  let newState = store.getState();
  component.setState(newState);   
});
 
 //取消subscribe的方法
let unsubscribe = store.subscribe(()=>{
  let newState = store.getState();
  component.setState(newState);   
});

unsubscribe();
```

在一个较大的应用中，reducer可能有多个，可以把reducer进行拆分，然后进行combine再递给store

```js
import {combineReducers} from 'redux';
import postReducer from './posts/reducer';
import userReducer from './users/reducer';

export default combineReducers({
    post: postReducer, 
    user: userReducer
});
```


## 进阶(React-Redux与redux的中间件)

### react-redux

通过上面的redux基本用法可以看出，如果任意组件想使用store的话，就得引入store然后进行getstate，subscribe等操作，这样用起来很麻烦，可以使用官方封装的react-redux库来简化这些步骤。

#### 基本用法

Provider组件可以使得组件拿到state

```js
import React from 'react' 
import ReactDOM from 'react-dom' 

import { Provider } from 'react-redux' 
import store from './store'
import App from './App' 
const rootElement = document.getElementById('root') 
ReactDOM.render( 
    <Provider store={store}> 
        <App /> 
    </Provider>, 
    rootElement 
)
```

connect()函数连接store与component

```js
export default connect(mapStateToProps, mapDispatchToProps)(Component);
```

其中，mapStateToProps是一个函数。作用是建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。它返回一个对象，里面的每一个键值对就是一个映射。

```js
const mapStateToProps = (state /*, ownProps*/) => { 
    return { 
        counter: state.counter
    } 
}

//之后在components里使用this.props.counter就能获取值了
```

mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。

```js
const mapDispatchToProps = (dispatch) => ({
    getBasicInfo(){
        dispatch(actionCreators.getBasicInfo());
    },
    otherFunc(){
        dispatch({
            type:'XXX',
            XXX
        });
    }
});

//之后在components里使用this.props.getBasicInfo or props.otherFunc就能调用派发dispatch
```

#### with Hooks

如果在functional components中要使用两个map，可以用useSelector和useDispatch两个hooks来实现相应的功能。

```js
//mapStateToProps
import {useSelector, useDispatch} from 'react-redux';

const counter = useSelector(state.counter);

//mapDispatchToProps
const dispatch = useDispatch();

dispatch(actionCreators.getBasicInfo());
```

### 使用中间件以及异步处理

关于以上内容，你可能注意到了，dispatch只能传对象，如果state的某项数据需要先从后台获取再改变怎么办呢？可以使用中间件来使得dispatch有异步处理能力

这里列举的是最常用的redux中间件之一--redux-thunk

```js
import thunk from 'redux-thunk'

const store = createStore( reducer, /*initial_state*/, applyMiddleware(thunk));//初始状态可选
```

加载redux-thunk中间件以后，dispatch就有了异步能力了，原理请参考'源码剖析'部分，这里先放上异步dispatch用法

```js
export const getBasicInfo = () => {
  return (dispatch) => {
    axios.get('/api/userinfo.json').then((res) => {
      console.log(res);
      const result = res.data.data;
      const action = {
        type: actionTypes.GET_BASIC_INFO,
        name: result.name,
        quote: result.quote
      };
      dispatch(action);
    });
  };
};
```

可以看到actionCreator返回的是一个函数而不是之前的对象了，这个函数接收一个dispatch参数，然后在做完异步处理后最后进行dispatch的派发交给reducer

## useReducer与Context

## React Redux源码剖析

## 参考文献

[Getting Started with Redux](https://redux.js.org/introduction/getting-started)
[React Redux](https://react-redux.js.org/introduction)
[Redux 入门教程--阮一峰](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)


---

(全文未完待续...)
