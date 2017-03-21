window.lang = 'zh'
angular.module \plotDB
  ..service \i18n, <[$rootScope]> ++ ($rootScope) ->
    ret = do
      get: -> (ret.db[it] and ret.db[it][$rootScope.lang]) or it
      db: do
        # landing
        'Data Visualization as a Service': zh: "您的資料視覺化服務平台"
        'We provide every single charts you will need': zh: "無論任何您需要的圖表，我們都提供給您"
        # Generic
        'no description': zh: "沒有描述"
        'Need Pro': zh: "需升級"
        "You don't have permission to change this": zh: "只有擁有者才能修改權限設定"
        'Upgrade to enable privacy control': zh: "想要私人圖表嗎？現在就升級方案吧"
        "let's check out the plans": zh: "那麼、方案長什麼樣子呢？"
        # new editor
        'Canvas Size': zh: "畫布尺寸"
        'Data': zh: "資料"
        'Styles': zh: "樣式"
        'Download': zh: "下載"
        'Share': zh: "分享"
        'Settings': zh: "設定"
        'COPY': zh: "複製"
        'Save': zh: "儲存"
        'summary in SNS posts': zh: "分享時顯示的摘要資訊"
        # search bar
        'chart type': zh: "圖表類型"
        'encoding': zh: "視覺元素"
        'category': zh: "用途"
        'dimension': zh: "維度"
        'Any': zh: "不限"
        'Bar Chart': zh: "長條圖"
        'Line Chart': zh: "折線圖"
        'Pie Chart': zh: "圓餅圖"
        'Area Chart': zh: "面積圖"
        'Bubble Chart': zh: "泡泡圖"
        'Radial Chart': zh: "雷達圖"
        'Calendar': zh: "時序"
        'Treemap': zh: "樹狀圖"
        'Map': zh: "地圖"
        'Cartogram': zh: "統計地圖"
        'Heatmap': zh: "熱度圖"
        'Sankey': zh: "山基圖"
        'Pictogram': zh: "圖示"
        'Scatter Plot': zh: "散布圖"

        'Position': zh: "位置"
        'Position ( Non-aligned )': zh: "位置(不同軸)"
        'Length': zh: "長度"
        'Direction': zh: "方向"
        'Angle': zh: "角度"
        'Area': zh: "面積"
        'Volume': zh: "體積"
        'Curvature': zh: "曲率"
        'Shade': zh: "明度"
        'Saturation': zh: "飽和度"

        'Infographics': zh: "資訊圖表"
        'Geographics': zh: "地理資訊"
        'Ieractive': zh: "互動式"
        'Journalism': zh: "新聞報導"
        'Statistics': zh: "統計圖"
        'Business': zh: "商業應用"

        'Privacy Policy': zh: "隱私權政策"
        'Suggestion and Contact': zh: "建議或聯絡我們"
        'failed to pay, try later?': zh: "付款失敗，晚點再試試看？"
        'send feedback': zh: "提供回饋"
        'Close': zh: "關閉"
        'Pricing': zh: '方案與定價'
        'Just Free': zh: "就是免費"
        'monthly': zh: "每月"
        'pricing-desc': zh: "提升您的視覺力", en: "empower you with visualizations"
        'price-free-desc': zh: "所有用戶都能享有", en: "for all users to evaluation PlotDB"
        'price-basic-desc': zh: "適合個人快速製圖", en: "Best for individual expertise"
        'price-expert-desc': zh: "團隊功能與私人內容", en: "privacy, team and enterprise"
        'price-enterprise-desc': zh: "專業的客製化服務", en: "customizable as you wish"
        'We are in Open Beta': zh: "開放公測中"
        'Contact with Us': zh: "與我們聯絡"
        'I got it': zh: "我了解了"
        'Pro feature for every account': zh: "全功能開放，免付費！"
        "don't worry, we provide 7 days money-back guarantee": zh: "怕反悔？我們提供七日內無條件退費"
        'know more about payment': zh: "更多關於付費的權益"
        'Your Choice': zh: "您的選擇"
        'Select': zh: "選取"
        'annually': zh: "年繳"
        'or': zh: "或"
        'SHOWCASE': zh: "使用案例"
        'PALETTE': zh: "配色"
        'COLLECTION': zh: "作品集"
        'THEME': zh: "設計主題"
        'DATASET': zh: "資料集"
        'My Datasets': zh: "我的資料集"
        'Create Dataset': zh: "建立資料集"
        'paste or drag your data here': zh: "在此貼上你的資料"
        'New Dataset': zh: "建立新資料集"
        'CHART': zh: "圖表"
        'My Charts': zh: "我的圖表集"
        'Explore': zh: "探索"
        'from scratch': zh: "從頭打造"
        'LOGIN / SIGNUP': zh: "登入/註冊"
        'Storage Usage': zh: "空間用量"
        'Teams': zh: "團隊"
        'Billing': zh: "付款資訊"
        'Logout': zh: "登出"
        'Plan': zh: "方案"
        'Credit Card Number': zh: "您的信用卡號"
        'Subscribe': zh: "購買"
        'Expiration Date': zh: "卡片到期日"
        'CVC Code': zh: "檢查碼"
        'cvc-desc': zh: "卡片背面簽名區旁的三位數字", en: "3 digits number on back of card"

        # quota
        "You've used all your quota": zh: "你的容量已經用完了"
        "want more": zh: "想要更多嗎"
        'subscribe now': zh: "馬上來升級吧"
        "I'm cool, maybe later": zh: "沒關係晚點再說"

        # collection
        'add to collection': zh: "加到作品集中"
        'add to team': zh: "加到我的團隊"
        "Only chart's owner can add it to a team": zh: "只有圖表的擁有者才能把圖表加到他的團隊中"
        'Collections': zh: "作品集"
        'create': zh: "建立"
        'Create': zh: "建立"
        'My Collections': zh: "我的作品集"
        "Everyone's Collections": zh: "所有人的作品集"
        "write something about this collection": zh: "寫點關於這個集合的內容吧"
        "Collection Description": zh: "作品集描述"
        'Download as Library': zh: "打包成函式庫下載"
        'There is no content in this collection': zh: "這個作品集裡面沒有東西"
        "Let's add some": zh: "來加點東西吧"
        'add to': zh: "加到"
        'remove': zh: "移除"
        'Add more': zh: "再加一些"
        'All Collections': zh: "所有作品集"
        'a Quick Example of Usage': zh: "快速使用教學"
        'Want to know more about how to use it': zh: "想知道更多嗎"
        'Check the Developer Guide': zh: "來看看開發者手冊吧"
        'no thanks': zh: "不用了"
        'How to Add Viswork to Collection': zh: "要怎麼把東西加到作品集中呢"
        'toggling the dropdown menu in the viswork you want to add': zh: "看到中意的樣板就打開他的下拉式選單吧"
        'OK I GOT IT': zh: "好我知道了"
        # settings
        'Basic Information': zh: "基本資訊"
        'Your Unique ID': zh: "你的用戶編號"
        'Email': zh: "電子郵件"
        'as Your Account': zh: "即你的帳號"
        'Avatar': zh: "大頭照"
        'Display Name': zh: "顯示的名稱"
        'visible to anyone': zh: "任何人都看得到"
        'Description': zh: "描述"
        'summary about you': zh: "自我介紹一下"
        'Publicly Visible': zh: "公開給所有人看"
        'Functionality': zh: "功能面"
        'Current Plan': zh: "目前方案"
        'Change Password': zh: "修改密碼"
        'Old Password': zh: "舊的密碼"
        'New Password': zh: "新的密碼"
        'Change': zh: "修改"
        'Update': zh: "更新"

        # billing
        'Billing Information': zh: "付款資訊"
        'Current Payment Information': zh: "目前的付款方式"
        'change plan': zh: "調整方案"
        'Using Credit Card': zh: "使用的信用卡"
        'Next Billing Due': zh: "下次付款日期"
        'Amount': zh: "金額"
        'update payment method': zh: "更新付款方式"
        'Payment History': zh: "付款紀錄"
        'State': zh: "狀態"
        'Transaction ID': zh: "交易代碼"
        'Date': zh: "日期"
        'Payment Method': zh: "付款方式"
        'no transaction record': zh: "沒有交易紀錄"

        # dataset
        'File': zh: "檔案"
        'Import': zh: "匯入"
        'Copy All': zh: "全部複製"
        'New': zh: "新增"
        'Make a Copy': zh: "建立副本"
        'Rename': zh: "重新命名"
        'Delete': zh: "刪除"
        'upload CSV file': zh: "上傳 CSV 檔"
        'upload Excel': zh: "上傳 Excel 檔"
        'from Google Sheet': zh: "從 Google 試算表匯入"
        'Import from Google Sheet': zh: "從 Google 試算表匯入"
        '.. as CSV': zh: "下載 CSV"
        'Encoding': zh: "編碼"
        'If you have no idea what this is, just click OK.': zh: "若你不清楚這是什麼，那按 'OK' 即可"
        'Press Ctrl+C to Copy': zh: "按 Ctrl+C 拷貝"
        'Cancel': zh: "取消"
        'open in new window': zh: "在新視窗開啟"
        'no file': zh: "尚未選取檔案"
        'Dataset Name': zh: "資料集名稱"
        'Rename Dataset': zh: "為資料集重命名"
        "Looks like your dataset doesn't have a name yet. Let's give it a name": zh: "看來你的資料集還沒有取名字，來取個名字吧"
        'Give your dataset a new name': zh: "為你的資料夾取個名字吧"
        'Grid Mode': zh: "資料格模式", en: "Grid"
        'Text Mode': zh: "文字模式", en: "Text"
        'estimated': zh: "估計值"
        'Your Storage Usage': zh: "你的儲存空間用量"
        'rows': zh: "列"
        'fields': zh: "欄"
        'size': zh: "大小"

        # Chart List
        'Explore Viswork': zh: "探索視覺化作品"
        'public charts available for re-use': zh: "不光是可以重覆使用，還可以修改源碼喔"
        'try these predefined tags': zh: "何不試試這些關鍵字"

        # Chart Editor
        'Fork-Save': zh: "另存副本", en: "Save & Fork"
        'Searchable?': zh: "要讓別人搜尋得到嗎？"
        'shown in search result': zh: "在搜尋結果中顯示"
        'hidden from search result': zh: "不要顯示在搜尋結果中"
        'lines': zh: "行"
        'no assets file': zh: "沒有檔案", en: "no file"
        'files': zh: "個檔案"
        'Preview': zh: "預覽"
        'Code': zh: "源碼"
        'Stylesheet': zh: "樣式表"
        'Document': zh: "文件碼"
        'Assets': zh: "附件檔案"
        'Chart Name': zh: "檔名", en: "name"
        'reset': zh: "重設"
        'Config': zh: "圖表設定"
        'code inherited from parent chart': zh: "此圖表直接使用樣板中的源碼"
        'make a copy': zh: "建立副本"
        'Upload': zh: "上傳"
        'use my data': zh: "使用我的資料"
        'Editor Style': zh: "切換編輯器顏色"
        'Leave': zh: "離開"
        'Fullscreen': zh: "全螢幕"
        'Reload': zh: "重畫"
        'Edit Code': zh: "編輯源碼"
        'Colorblind': zh: "色盲測試"
        'colorblind': zh: "色盲測試"
        'Normal People': zh: "正常人"
        'Red-Green': zh: "紅綠色盲"
        'Monochromasy': zh: "全色盲"
        'Advanced Options': zh: "進階選項"
        'Chart Size': zh: "圖表尺寸"
        'Auto Scale': zh: "自動調整"
        'Custom': zh: "自訂"
        'Thumb': zh: "縮圖"
        'Data Binding': zh: "套用資料"
        'connect your data with this chart': zh: "用拖拉的方式將你的資料套用到圖表中"
        'choose dataset you want to use': zh: "首先，選擇你的資料集"
        'sample data': zh: "範例資料"
        'my data': zh: "我的資料"
        'try other keyword': zh: "試試其它關鍵字"
        'Field List': zh: "資料集的欄位列表"
        'edit': zh: "編輯"
        'open': zh: "開啟"
        'no dataset select': zh: "尚未選取資料集"
        'Drag Field to Map Dimension': zh: "將欄位拖曳到下方的圖表維度中"
        'required dimension': zh: "必須有值", en: "required"
        "Don't know how to prepare your data": zh: "不曉得資料該長什麼樣子嗎？"
        'Check the Sample Data': zh: "看看範例資料吧"
        'Are you sure to delete it permanently?': zh: "確定要永久刪除嗎？"
        'Yes, Delete it': zh: "是的，刪掉吧！"
        'share': zh: "共享"
        'settings': zh: "設定"

        # Chart Settings
        'Publish': zh: "發布"
        'Published': zh: "已發布"
        'Draft': zh: "編修中"
        'Permission': zh: "權限"
        'Chart Info': zh: "資訊"
        'Libraries': zh: "函式庫"
        'Library': zh: "函式庫"
        'pick libraries you want to use in the dropdown box': zh: "將你想要使用的函式庫加到這裡來吧！"
        'Inherit Content from Source Chart': zh: "直接使用原始樣板的源瑪"
        "How this viswork's license works for different usages": zh: "依據使用情境設定圖表樣板的授權方式"
        'Free': zh: "免費"
        'Price': zh: "定價"
        'Personal Use': zh: "個人非商業使用"
        'Generate SVG': zh: "用以生成 SVG"
        'Embedded with IFrame': zh: "透過 IFrame 嵌入任何網站"
        'Run in Single Site': zh: "以源碼形式於單一網站執行"
        'Run in Multiple Sites': zh: "以源碼形式於任意網站執行"
        'License': zh: "授權"
        'Publish Link': zh: "發布的連結"
        'View in New Window': zh: "在新視窗中預覽"
        'Embed Code': zh: "嵌入用源碼"
        'Preserve Aspect Ratio': zh: "保持長寬比"
        'summary shown in SNS like facebook, twitter, etc': zh: "在臉書、推特中顯示的摘要訊息"
        'Title': zh: "標題"
        'Footer': zh: "註腳"
        'Show in Chart': zh: "也顯示在圖表中"
        'in embed code / share link': zh: "(於嵌入 / 分享連結中)"
        'visible': zh: "看得到"
        'invisible': zh: "看不到"
        'increase visibility by providing more information for your chart': zh: "提供額外的資訊能讓你的圖表更好被利用"
        'Base Chart Type': zh: "圖表類型"
        'Visual Encoding': zh: "視覺元素"
        'Chart Category': zh: "圖表用途"
        'Tags': zh: "標籤"
        'derived from': zh: "源自"

        # permission
        'Add new permission': zh: "加入新的權限"
        'can read': zh: "可以看到"
        'can fork': zh: "可以複製"
        'can comment': zh: "可以評論"
        'can edit': zh: "可以編輯"
        'act as owner': zh: "所有權限"
        'Add': zh: "加入"
        'generate shareable link': zh: "產生分享用的連結"
        'permissions are given to': zh: "目前開放的權限有"
        'add everyone': zh: "加入給所有人的權限"
        'no custom configuration': zh: "沒有設定"
        'edit link': zh: "編輯用連結"
        'share link': zh: "分享用連結"

        # Select Box
        'loading': zh: "載入中"
        'no result': zh: "找不到東西"
        'create one with this name': zh: "用這個名字建立一個新的"
        "that's all": zh: "已經是全部囉"
    ret
  ..filter \i18n, <[i18n]> ++ (i18n)-> -> i18n.get it
  ..filter \tags, -> -> if Array.isArray(it) => it else (it or "").split(\,)
  ..filter \nicedate, -> ->
    date = new Date(it)
    "#{date.getYear! + 1900}/#{date.getMonth! + 1}/#{date.getDate!}"
  ..filter \nicedatetime, -> ->
    pad = (it) -> "#{if it < 10 => '0' else ''}#it"
    date = new Date(it)
    Y = date.getYear! + 1900
    M = pad(date.getMonth! + 1)
    D = pad date.getDate!
    h = pad date.getHours!
    m = pad date.getMinutes!
    s = pad date.getSeconds!
    "#Y/#M/#D #h:#m:#s"
  ..filter \date, -> -> new Date(it)
  ..filter \timestamp -> -> new Date(it).getTime!
  ..filter \datelite, -> ->
    d = new Date(it)
    "#{d.getYear! + 1900}/#{d.getMonth! + 1}/#{d.getDate!} #{d.getHours!}:#{d.getMinutes!}"
  ..filter \length, -> -> [k for k of it].length
  ..filter \size, -> ->
    if !it or isNaN(it) => return \0B
    if it < 1000 => "#{it}B"
    else if it < 1048576 => "#{parseInt(it / 102.4)/10}KB"
    else "#{parseInt(it / 104857.6)/10}MB"

  ..directive \ngfile, <[$compile]> ++ ($compile) -> do
    require: <[]>
    restrict: \A
    scope: do
      model: \=ngData
    link: (s,e,a,c) -> e.on \change ~> s.$apply -> s.model = e.0.files
  ..directive \ngselect2, <[$compile entityService]> ++ ($compile, entityService) -> do

    require: <[]>
    restrict: \A
    scope: do
      model: \=ngData
      istag: \@istag
      type: \@type
      detail: \=ngDetail
    link: (s,e,a,c) ->
      changed = ->
        [cval,nval] = [s.model, $(e).val!]
        if !Array.isArray(cval) => return cval != nval
        [cval,nval] = [cval,nval].map -> (it or []).join(",")
        cval != nval
      if s.type => config = entityService.config.select2[s.type]
      else config = {}
      if s.istag => config <<< tags: true, tokenSeparators: [',',' ']
      $(e).select2 config
      $(e).select2 config .on \change, ~>
        # angularjs create object for chart if s.model = chart.blah and chart = undefined.
        # be aware of this behavior
        if changed! => setTimeout (->
          s.$apply ->
            s.model = $(e)val!
            if a.$attr["ngDetail"] => s.detail = $(e).select2('data')
        ),0
      s.$watch 'model', ((vals) ~>
        # escaped html from jquery.
        # jquery.val won't help select2 build option tags so we have to do this by ourselves
        if config.tags =>
          html = ""
          for val in (vals or []) => html += $("<option></option>").val(val).text(val).0.outerHTML
          $(e).html(html)
        if changed! => setTimeout (-> $(e).val(vals).trigger(\change) ),0
      ), true
  ..directive \readby, <[$compile]> ++ ($compile) ->
    do
      scope: do
        readby: \&readby
        encoding: \@encoding
        askencoding: \&askencoding
      link: (s,e,a,c) ->
        handler = s.readby!
        askencoding = s.askencoding!
        e.bind \change, (event) ->
          reader = ->
            fr = new FileReader!
            fr.onload = ->
              s.$apply -> handler fr.result, event.target.files.0
              e.val("")
            if s.encoding => fr.readAsText event.target.files.0, s.encoding
            else fr.readAsBinaryString event.target.files.0
          s.$apply ->
            if askencoding => askencoding reader
            else reader!
