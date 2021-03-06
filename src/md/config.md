圖表設定
============

統整目前有的圖表，其設定如何分類，以及還可以追加什麼設定:

 * 考慮如何分類
 * 考慮如何不顯示沒用到的
 * 考慮未來的擴充性


資料型別的基本設定
------------

    type: 
      name:        type name
      default:     default value for this type
      test:        test if type match
      parse:       transform value to this type
      order:       ascending / descending / index - give order to value of this type
      subtype:     subtype
      typedef:     ???
      scale:       build scale from value of this type
      values:      sample values for this type

* 單一個設定項的結構:
  config: 
    name:        給人看的設定名     string
    desc:        給人看的設定說明   string
    type:        這個設定的資料類型 [type]
    category:    類型
    default:     預設值             value of type
    subtype:     子型態, 提示值     e.g., plotdb.SomeType.subtype.Qualitative
    extend:      承襲某設定的內容   e.g., "padding"

* 設定項 preset
  - 一些特殊的設定項已預先定義, 要使用只要宣告初始值:
    padding: { default: 10 }
    任何沒有被預定的參數都會被 preset 初始化
  - plotdb.Config = { ... } 這裡設定
  - 有三個地方可以設定 preset: 
    theme.Config > chart.Config > plotdb.Config
    但只有明確在 chart.Config 中出現的才會被 enable

* 圖表設定項的結構
  - config: {
      configName: { ... default configuration ... },
      ...
    }
  - 在圖表中用 this.config.configName 取值

目前有的設定 - 基本分類版

  顏色
    palette
    negative, positive, neutral, empty, base, previous, next
    stroke
    pointColor, hoverColor, colorForMax
    good,satisfactory, bad, performance ( bar colors ) ( bullet chart, 975)
    endNode, middleNode, startNode ( cycle plot 中的各個點的顏色 )
    LineColor

  排版
    bar thickness
    line thickness
    font size
    padding
    margin
    text shadow
    maxIconCount, maxIconWidth
    overlapped
    barHeight (parallel bar 1052)
    ringSize (circular bubbles 972)

  數值
    scale range / cutpoint
    empty as 0 (weekly calendar, used to hint if a day is empty )
    xCriteria, yCriteria
    sort (bar 1069, dumbbell, bubble 993) by asc,desc,value1,value2, other dimension, etc
    barThickness (sankey, 用來設定兩端的 bar 厚度) also in chord, 1013
    other limit, other name - 太小的值會被 aggregate 起來

  開關
    show label
    show percent
    labe inside
    cat in bubble
    showDot (line chart 953)
    showLabel ( group bar 1011)

  文字
    labels (scale, legend)
    previous value label, next value label
    title (hierarchy bubbles)




現有的元素
平均線
整體走勢線
起點與終點node
data - rect, line, circle, path; positive, negative; range, marker
node - circle
connect - line, area
boundary - line
grid, frame, axis, legend, hint, source, target

data: (positive,negative)
  bar(rect)        - fill stroke
  bar(line)        - stroke
  bubble(circle)   - fill stroke
  treemap(rect)    - fill stroke
  range(rect,line) - fill stroke
  地理區(path)     - fill stroke
  marker           - ??? (上漲、下跌等)
node
  circle           - fill stroke
connect (line)         - stroke
connect (area)
boundary (line) ( check 985, high score scatter plot0
grid,frame,axis
  grid.bk, grid.line
hint ( check 983, 前三名的提示 )
  line, text, rect? 
source,target



可以追加的設定?

  各種元素的顏色 ( 依 css class 分?)
   - 1054 bar bubble 是分開的
   - 973 分地圖與圓餅兩組 diverging color
  四種主流配色的顏色設定 (sequential, diverging, qualitative, binary)

  data 中的 label: title, desc ?
  animate speed
  對 scale 可設定不同的類型例如 linear,sqrt,pow etc
  線段圓滑度
  data sub group? 圓餅, stack bar chart, voronoi treemap
  不同元素的字體大小？
  gravity, charge?
  資料要素點? (cutpoint)
  空字串的 placeholder

  所有參數的 label 客製化
  所有數值的 min, max
    e.g., minRadius
  軸: tick 數量與 padding, 走向
      label 的位置
      domain 顯示否?
  顯示文字的轉換
   ( x軸年份, y 軸數字轉 k or m etc:
  文字的 shadow?
  群組的 padding 與各別元素的padding?
  transition 的 delay?
  矩形的圓角?
  投影法?

覺得可以客製化的元素
---
grid?
legend?
popup & tooltips?
bubble of data ( stroke 0
button
連結線
圖標 ( 上漲、下跌等資料的額外提示 )

其它
避免 lable overlap (connected scatter plot)
