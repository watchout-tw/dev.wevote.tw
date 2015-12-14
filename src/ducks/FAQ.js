const initialState = {
   "data" : [
    {
      "question" : "你們如何整理及判斷立委表態、政黨表態的資料？",
      "answer" : [ "針對本網站相關議題，我們將每位立委（包含區域立委和不分區立委）在立法院內院會、委員會、公聽會等職務行為，依照「發言、提案、表決」進行分類，並邀請長期關心各議題的NGO團體參與判斷各立委的每項表態資訊屬於「支持、反對、模糊」。特別說明的是，在提案的分類中只列出該法案的提案立委，而不列出連署立委。","我們希望提供這些資訊，讓每位選民可以了解這些立委的價值選擇，是否符合你的期待。","同時，我們將依照各立委表態時所屬的政黨，整理分析成為政黨的表態結果，希望藉此提供選民在政黨票投票時的判斷參考。","以上的資料來源都來自立法院官方公布資料，包含立法院公報和議案。" ]
    },
    {
      "question" : "這些立委表態的資料，從什麼時間開始統計？統計到什麼時間為止？後續會持續更新嗎？",
      "answer" : [ "立法院第八屆立委任期時間為2012年2月1日至2016年1月31日，針對本網站相關議題，我們已整理至目前為止的第八屆立委表態資料（包含離職立委），未來也將持續更新至第八屆立委任期結束。如果有以email訂閱，當有資料更新時，我們也會主動寄發email通知提醒。" ]
    },
    {
      "question" : "社會上重大議題那麼多，為什麼你們只挑選了這幾個議題？挑選的標準是什麼？",
      "answer" : [ "最主要的標準有兩個：\n(1)這個議題在立法院第八屆任期中是否有大量討論資料。\n(2)這個議題在立法院的官方公布資料中，是否可以比較出各政黨或各立委間的態度差異。","以「食安」為例，屬於社會上大眾都關心的議題，立法院在第八屆任期也有相關修法結果。但是我們實際花了許多心力研究立法院資料後，發現因為立法院在處理「食安」的修法時，以黨團協商的方式進行，而目前立法院關於黨團協商只公布協商結論（就是只知道最後修法的結果），而沒有公布其中討論過程的資料，就無法整理出各立委對這個議題的發言與態度。","事實上，我們也發現在立法院第八屆任期中，「食安」不是特例，許多重大議題都有類似的現象。" ]
    },
    {
      "question" : "立委「應該表態，卻沒有表態」的資料是什麼意思？",
      "answer" : [ "依照立法程序，法案經一讀後會交付委員會審查，而委員會應該是立委討論法案最激烈的階段，也應該最能看出立委的表態。","立法院中有八個委員會：「內政、外交國防、財政、經濟、教育文化、交通、司法法制、社福衛環」。一個法案通常會分發到一或多個委員會進行審查，而每個立委也都會加入其中一個委員會。所以我們認為立委有責任對其所屬委員會中審查的法案，進行「發言、提案、表決」等表態，如果沒有就屬於「應表態未表態」。","不過，由於立法院正副院長的主要職責是綜理院務，讓議事順利進行，除非在票數相同的情況下，否則沒有表決權。基於這個理由，第八屆立法院正副院長王金平及洪秀柱，即使出現沒有表態的狀況，也不會被列入「應該表態，卻沒有表態」的分類。"]
    },
    {
      "question" : "為什麼你們不選用新聞報導資訊作為表態來源？",
      "answer" : [ "我們的資料來源皆來自立法院官方公布資料，因為我們認為一個負責任的立委就應該在立法院內以實際發言或作為，來表現自己的價值選擇。而比起經過媒體另外詮釋的新聞報導，立法院內言行也更能真實反映立委的態度。"]
    },
    {
      "question" : "我覺得這個網站的資料很棒，我可以分享在網路上嗎？",
      "answer" : [ "我們歡迎任何非商業性及標示來源的分享轉載，讓更多朋友知道我們所提供2016立委選舉的相關資訊。我們相信，資訊越充足，越能幫助選民在投票時做出正確的判斷，這也是這個網站的最重要理念。","在明年1月立委選舉的投票日前，我們也將依照各選區、各議題的狀況製作表態分析圖，也歡迎所有人多多下載、分享、傳播。請大家耐心等待，也請大家別忘了可以email訂閱更新通知！"]
    },
    {
      "question" : "我家選區的立委候選人都不是第八屆的現任立委，都沒有表態資料，那我該怎麼辦？",
      "answer" : [ "我們目前提供的立委表態資料，都是針對第八屆立委所整理出來的分析結果。但未來我們將會結合各NGO的努力，針對本網站的相關議題，進行候選人的表態調查，並將在選前公布於網站上，提供給選民進行比較。請大家保持關注！"]
    },
    {
      "question" : "現在立法院裡到底有多少個立委？各議題中「看政黨」的曾經表態立委百分比是如何計算的？",
      "answer" : [ "目前立法院共有112席立委，分別是國民黨65席、民進黨40席、台聯3席、親民黨2席、民國黨1席、無黨團結聯盟1席。","但因為立委曾有因自行離職、被判刑褫奪公權而解職、更換黨籍、不分區立委缺額遞補等等狀況，所以整個第八屆立委任期（2012至2015年）中曾經擔任過立委的人數，實際上是126人，分別是國民黨69人、民進黨43人、台聯6人、親民黨4人、民國黨1人、無黨團結聯盟2人、無黨籍1人。","因此，我們也將以此人數進行各政黨曾表態立委人數的百分比計算。","台聯的狀況比較特殊，按照台聯的規定，每一席立委由兩人輪替各擔任兩年的立委，故台聯雖只有三席席次，但四年之中總共有六人擔任過立委。"]
    },
    {
      "question" : "為什麼徐欣瑩立委有一些表態計算在國民黨裡，有一些又在民國黨裡？",
      "answer" : [ "徐欣瑩立委在2015年1月26日正式退出國民黨，2015年3月18日籌組成立民國黨並成為民國黨主席。因此在2015年1月25日以前的表態資料，就會計算在國民黨的表態統計內，之後的資料就計算在民國黨內。", "雖然國民黨和民國黨名字很像，但還是不可以混淆的。","其他立委如果有「在任期間更換黨籍」，也會以類似的方式處理。"]
    },
    {
      "question" : "為什麼有些法案上的表態，稱之為「黨團提案」？這和一般立委的提案，有什麼不同？",
      "answer" : [ "立法院的法案，可以由立委個別提案且經15個以上的立委連署後成案，也可以透過立法院內各政黨的黨團提案直接成案。目前符合立法院組織法規定的黨團有國民黨團、民進黨團、台聯黨團及立院新聯盟政團。","以立法院運作狀況來說，我們認為黨團提案的法案，更能直接表現政黨對這個議題的表態，因此會特別註記。"]
    },
    {
      "question" : "對於被判斷為「支持、反對、模糊」的表態，如果立委覺得有錯誤，可以澄清更正嗎？",
      "answer" : [ "我們歡迎立委隨時澄清更正每則表態，請寄信至：wevote@watchout.tw。","我們更樂見立委經常在立法院內，針對每個議題和法案，做出明確的表態。"]
    },
    {
      "question" : "黨團衝突戰的政黨資料是如何收集的？",
      "answer" : [ "我們認為立委在立法院內在各重大議題上的態度及優先通過法案的主張是非常重要的資料，所以我們以這兩項內容製作政黨表態承諾書。從11月27日(五) 中選會登記確定各政黨名單後，我們已經在11月30日(一)及12月14日(一)，以雙掛號寄出兩次表態承諾書，邀請各政黨加入回覆。截至網站更新前（12月14日），已有自由台灣黨、時代力量、綠社盟、樹黨、大愛憲改聯盟、台聯回覆，我們歡迎每個政黨進行表態承諾的回覆。",
                   "而國民黨、民進黨、親民黨、台聯、無盟都是現在立法院內有席次並有歷史表態紀錄的政黨。民國黨雖有 1 席，但尚無任何表態資料。",
                   "如果尚未回覆，我們將以他們過去的立院紀錄作為表態資料；如果回覆的承諾書與過去歷史紀錄結果不同，將交由使用者自行選擇要以哪一份資料為準。"]
    }
   ]
   
}


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    
    default:
      return state;
  }
}

