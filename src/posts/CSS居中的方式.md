---
title: CSS居中的方式
titleImage:
categories:
  - Software Development
date: 2019-12-12 11:12:22
tags:
  - 前端开发
  - CSS
---
preference(translate)：[Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide)

* * *

### 引言
在CSS中，居中是很烦的一件事，并不是因为它很难做，而是有很多不同的方法去做，很难选择。

### 方法
#### 水平居中

1. 内联元素(比如文本或者链接)

    在块级父元素内将行内元素水平居中，只需text-align: center。

    inline, inline-block, inline-table, inline-flex都适用
    

2. 块级元素

    将块级元素的margin-left和margin-right设置为auto(并且该块级元素设置了width属性，否则它将是全宽度，并不需要居中了)
    
    通常做法：

        .center-me { 
           margin: 0 auto; 
           width: ???px;
        }
    
    无论居中的块级元素或父级元素的宽度如何，它都将起作用。
  
    注意：不能将元素*float*至居中
    
 3. 多个块级元素

    如果有两个或以上的块级元素需要以行排列方式居中，最好为它们设置不同的display类型
    
    * inline-block
     
            .inline-block-center {  
                text-align: center;
            }
            .inline-block-center div {
                display: inline-block;  
                text-align: left;
            }
     * flex
            
            .flex-center {
                display: flex;
                justify-content: center;
            }
    多个块级元素按列居中，可以参考块级元素的方法(为这几个块级元素都设置宽度)
                
            main div {              
                margin: 0 auto;
                padding: 15px;
                margin: 5px auto;
            }
            main div:nth-child(1) {
                width: 200px;}
            main div:nth-child(2) {
                width: 400px;
            }
            main div:nth-child(3) { 
                width: 125px;
            }
                
#### 垂直居中
垂直居中就比较棘手了

1. 内联元素(文本或者链接)
    * 单行

        有时候inline/text元素表现为垂直居中，只是因为它们的padding-top和padding-bottom相同
        
        如果某些原因，padding-top和bottom不能设置，可以用一个trick来使文本垂直居中,trick就是设置相同的height和line-height：
                        
           
           .center-text-trick { 
                height: 100px; 
                line-height: 100px; 
                white-space: nowrap;
           }
    * 多行

        多行也可以为文本设置相同的padding-top和padding-bottom使其垂直居中
        
        如果这种方法不work，那么可能text是一个表格单元格(可能是HTML中设置了表格，也有可能是在css中写成了表格)。此时用vertic-align:middle可以解决这个问题
        
        如果不是表格而是一个container里的文字，可以使用flexbox,可以很容易地使单个flex-child集中在flex-parent中。通常将flex-parent写成如下形式：
        注意parent必须要有height
                    
            .flex-center-vertically {
                display: flex; 
                justify-content: center;
                flex-direction: column; 
                height: 400px; 
            }
        如果前两种方法都不ok，采用“ghost element”的技术
                    
           <div class="ghost-center">  
                <p>
                     I'm vertically centered multiple lines of text in a container. Centered with a ghost pseudo element
                </p>
           </div>
           
           .ghost-center 
           { 
                position: relative; 
           } 
           
           .ghost-center::before {
                content: " "; 
                display: inline-block;
                height: 100%;
                width: 1%;
                vertical-align: middle;
           }
           
           .ghost-center p
           { 
                display: inline-block; 
                vertical-align: middle;
           }

2. 块级元素
    *  已知高度
        在网页布局中，通常高度是未知的，比如：宽度改变导致文本重排；改变文本中的样式会改变高度；文本量的改变会改变高度；具有固定宽高比的元素(比如图片等)在resize的时候会改变高度。
        但如果确实能获取高度的话，可以用以下方法进行垂直居中：
        
            .parent { 
                position: relative; 
            } 
            .child { 
                position: absolute; 
                top: 50%; 
                height: 100px; 
                margin-top: -50px; // account for padding and border if not using box-sizing: border-box; 
            }
     * 未知高度
        利用子块布局到父块一半的高度然后再“抬升”一半进行垂直居中    
        
            .parent {
                position: relative; 
            } 
            .child {
                position: absolute;
                top: 50%; 
                transform: translateY(-50%); 
            }
     * 如果不介意元素会把容器的高度拉高
        
        利用table
        
            main { 
                background: white;
                height: 300px;
                margin: 20px; 
                width: 300px;
                position: relative;
                padding: 20px;
                display: table;
            }
            main div {
                background: black; 
                color: white;  
                padding: 20px; 
                display: table-cell; 
                vertical-align: middle;
            }
      
    * 利用flexbox

        不要过于惊讶，利用flexbox会简单许多，方法
              
            .parent-container { 
                display: flex; 
                flex-direction: column;
                justify-content: center;
            }
        或者
            
            .parent-container { 
                display: flex; 
            }
            .child-container{
                margin:auto;
            }
    
#### 混合式居中(水平+垂直)
可以组合上面提到的水平居中和垂直居中方法来进行混合式居中，但是通常可以将混合式居中分为以下三个阵营

1. 元素的宽高固定

    把子块top和left定位50%后利用宽高一半的“负margin”，这种方式有着很好的跨浏览器支持
    
        .parent {
            position: relative; 
        } 
        .child {
            width: 300px; 
            height: 100px; 
            padding: 20px; 
            position: absolute;
            top: 50%; 
            left: 50%; 
            margin: -70px 0 0 -170px;
        }
    
2. 元素宽高未知

    如果未知元素的宽高，用transform属性在两个方向（基于元素的当前宽度/高度）上进行负平移50％：
    
        .parent { 
            position: relative; 
        } 
        .child { 
            position: absolute; 
            top: 50%; 
            left: 50%; 
            transform: translate(-50%, -50%); 
        }

3. 如果可以用flexbox

    对于flexbox，如果要进行混合居中，只需利用两个居中属性
    
        .parent {
            display: flex; 
            justify-content: center; 
            align-items: center;
        }
4. 如果可以利用grid

    这种方式只是一种trick，对于一个元素很适用
    
        body, html { height: 100%; 
            display: grid;
        } 
        span { /* thing to center */ 
            margin: auto; 
        }

#### 总结
完全利用css进行居中是可行的



