export const brandKnowledge = [
  {
    id: "jzt",
    name: "济众堂",
    positioning: "香港老字号中成药品牌",
    coreProduct: "百步追风活络油",
    channels: "万宁 / 香港线下渠道",
    scenes: ["肩颈酸痛", "上班久坐", "运动后不适", "蚊虫叮咬", "香港旅游常备", "家庭常备"],
    tone: "可信、生活化、香港本地感、轻度种草"
  },
  {
    id: "bull",
    name: "公牛牌",
    positioning: "香港中成药品牌",
    coreProduct: "公牛牌风痛灵",
    channels: "万宁 / 香港线下渠道",
    scenes: ["阴雨天", "风湿痛", "关节不适", "老寒腿", "运动后不适", "香港旅游常备"],
    tone: "实用、场景化、家庭常备、渠道可信"
  }
];

export const products = [
  {
    id: "jzt-oil",
    brandId: "jzt",
    name: "百步追风活络油",
    sellingPoints: ["活血止痛", "舒筋活络", "适合肩颈、运动后、旅行常备场景"],
    channel: "万宁 / 香港线下渠道"
  },
  {
    id: "bull-fengtongling",
    brandId: "bull",
    name: "公牛牌风痛灵",
    sellingPoints: ["风湿骨痛", "阴雨天关节不适", "香港旅游常备"],
    channel: "万宁 / 香港线下渠道"
  }
];

export const goals = ["品牌曝光", "达人种草", "搜索增长", "万宁转化", "电商转化"];

export const materialTypes = ["图文笔记", "视频笔记", "探店笔记", "达人脚本", "品牌号内容"];

export const contentOpportunities = [
  {
    id: "hk-travel-oil",
    title: "香港旅游必买药油",
    score: 94,
    hotMatch: 92,
    brandMatch: 96,
    productScene: "香港旅游常备 / 万宁购物",
    recommendedBrand: "济众堂",
    recommendedProduct: "百步追风活络油",
    reason: "香港旅游和万宁购物天然关联，适合把中成药从“偶然看到”变成“提前知道”。"
  },
  {
    id: "summer-neck",
    title: "三伏天肩颈酸痛",
    score: 88,
    hotMatch: 86,
    brandMatch: 90,
    productScene: "肩颈酸痛 / 上班久坐",
    recommendedBrand: "济众堂",
    recommendedProduct: "百步追风活络油",
    reason: "季节节点明确，适合做养生场景和办公室肩颈内容。"
  },
  {
    id: "rain-joint",
    title: "暴雨天关节不适",
    score: 85,
    hotMatch: 84,
    brandMatch: 88,
    productScene: "阴雨天 / 关节不适",
    recommendedBrand: "公牛牌",
    recommendedProduct: "公牛牌风痛灵",
    reason: "天气变化带来真实身体感受，适合切入风湿痛和关节不适。"
  },
  {
    id: "office-neck",
    title: "办公室久坐肩颈",
    score: 83,
    hotMatch: 78,
    brandMatch: 91,
    productScene: "久坐 / 肩颈酸痛 / 随身常备",
    recommendedBrand: "济众堂",
    recommendedProduct: "百步追风活络油",
    reason: "职场人群场景稳定，适合持续生产真实体验和干货内容。"
  },
  {
    id: "mannings-guide",
    title: "香港万宁购物攻略",
    score: 91,
    hotMatch: 94,
    brandMatch: 88,
    productScene: "万宁探店 / 香港购物攻略",
    recommendedBrand: "济众堂",
    recommendedProduct: "百步追风活络油",
    reason: "万宁攻略具备搜索价值，适合把产品自然放进购物清单。"
  }
];

export const contentDirections = [
  {
    id: "hk-travel",
    name: "香港旅游",
    description: "把产品放进游客出行、购物、常备药品场景。",
    score: { total: 93, hot: 19, node: 18, brand: 19, product: 14, scene: 14, search: 9 }
  },
  {
    id: "mannings-store",
    name: "万宁探店",
    description: "通过门店场景增强渠道可信度和到店转化。",
    score: { total: 91, hot: 18, node: 18, brand: 18, product: 14, scene: 14, search: 9 }
  },
  {
    id: "summer-health",
    name: "三伏天养生",
    description: "围绕季节养生和身体不适做轻知识内容。",
    score: { total: 86, hot: 18, node: 19, brand: 17, product: 13, scene: 12, search: 7 }
  },
  {
    id: "office-neck",
    name: "办公室肩颈",
    description: "适合久坐、通勤和随身常备的真实体验内容。",
    score: { total: 84, hot: 15, node: 16, brand: 18, product: 14, scene: 14, search: 7 }
  },
  {
    id: "after-sport",
    name: "运动后不适",
    description: "连接运动、徒步、旅行后身体不适场景。",
    score: { total: 79, hot: 14, node: 14, brand: 16, product: 13, scene: 14, search: 8 }
  },
  {
    id: "rain-joint",
    name: "雨天关节",
    description: "适合公牛牌风痛灵的天气和关节不适场景。",
    score: { total: 82, hot: 17, node: 15, brand: 17, product: 14, scene: 12, search: 7 }
  },
  {
    id: "camping-bites",
    name: "露营蚊虫",
    description: "适合夏季户外、露营和家庭常备内容。",
    score: { total: 74, hot: 13, node: 15, brand: 14, product: 11, scene: 14, search: 7 }
  }
];

export const topicTemplates = [
  "来香港旅游，万宁里这类药油真的可以提前备着",
  "办公室久坐肩颈酸痛，我为什么会随身放一瓶活络油",
  "暴雨天关节不舒服，香港人家里常备什么",
  "去香港万宁，不只买护肤品，这些中成药也值得看看",
  "香港旅游行李箱里，我会多放一瓶这种药油",
  "三伏天吹空调肩颈紧，这个小习惯我坚持了很久",
  "逛完香港一天腿很累，回酒店我会这样放松",
  "万宁购物清单里，为什么我会加一类香港药油",
  "爸妈来香港，我会带他们去万宁看这些常备药",
  "运动后肩颈不舒服，我会先做这几步",
  "上班族抽屉里可以备什么？我的香港常备小物",
  "下雨天关节不舒服，香港家庭常备思路分享",
  "第一次去香港万宁，别只看美妆区",
  "香港老字号中成药，适合放进旅行常备清单吗",
  "肩颈酸痛不想硬扛，我的办公室舒缓小方法",
  "香港旅游买药油，怎么看才不容易买错",
  "万宁探店：哪些产品适合家庭常备",
  "通勤包里放什么？我的肩颈舒缓小物清单",
  "香港购物攻略：从游客视角看万宁中成药区",
  "久坐、吹空调、肩颈紧，我最近常用这个方法"
];

export const formats = ["探店", "攻略", "Vlog", "干货", "真实体验"];
export const audiences = ["香港游客", "办公室久坐人群", "家庭常备用户", "运动后不适人群", "中老年关节不适人群"];

export const draftTemplate = {
  titles: [
    "来香港旅游，万宁里这类药油真的可以提前备着",
    "香港万宁购物清单：我会顺手看这类中成药",
    "逛香港一天后，我会怎么处理肩颈和腿酸",
    "不只买护肤品，香港万宁这些常备小物也实用",
    "旅行常备药油，我为什么会选香港老字号"
  ],
  cover: "建议拍摄万宁货架 + 产品手持图，封面文案控制在 10 个字以内，例如“香港旅行常备”。",
  body:
    "这次来香港玩，发现每天都在暴走，晚上回酒店肩颈和小腿真的会有点紧。\n\n我以前去万宁只会看护肤品，这次特意留意了一下中成药区，发现很多香港本地家庭会备一些药油类产品。\n\n像济众堂百步追风活络油这种，更适合放在“旅行常备”的场景里：逛街走多了、肩颈紧、运动后不太舒服，都可以作为日常舒缓小物。\n\n它不是那种需要夸张安利的东西，更像是香港家庭会顺手备着的小物。游客如果本来就会去万宁，可以顺路看看。\n\n我个人建议：旅行前不用囤很多，但如果行程很满、每天要走很多路，准备一瓶会安心一点。",
  shooting: ["万宁门店外观或货架", "手持产品近景", "旅行包/酒店桌面场景", "肩颈或小腿舒缓动作", "购物清单截图风封面"],
  comments: ["你们去香港万宁会买什么常备小物？", "有没有适合旅行常备的香港中成药推荐？"],
  tags: ["香港旅游", "万宁购物", "香港万宁", "旅行常备", "济众堂", "百步追风活络油", "中成药"],
  boost: "建议小额投流测试，优先测试“香港旅游 + 万宁购物”关键词人群。",
  creatorType: "香港旅游博主 / 万宁探店达人 / 真实体验型素人"
};

export const imageBriefTemplate = {
  coverPlans: [
    {
      type: "痛点型封面",
      visual: "用肩颈紧、逛街腿累、旅行暴走后的真实状态切入，让用户先看到自己的问题。",
      elements: ["人物扶肩或揉小腿", "万宁购物袋", "产品手持近景", "酒店桌面或行李箱"],
      title: "逛香港一天真的累",
      subtitle: "旅行常备小物分享",
      angle: "人物半身 45 度侧拍，产品放在前景，背景保持生活化。",
      prompt:
        "A realistic Xiaohongshu cover photo, Hong Kong travel hotel room scene, a traveler holding traditional Chinese medicated oil, Mannings shopping bag on desk, warm natural light, clean composition, premium lifestyle, no exaggerated medical claims, vertical 3:4."
    },
    {
      type: "场景型封面",
      visual: "把产品自然放在万宁购物和香港旅行场景里，强化“顺路购买、真实可见”。",
      elements: ["万宁门店/货架", "产品近景", "购物清单", "香港街景元素"],
      title: "香港万宁顺手买",
      subtitle: "不只护肤品",
      angle: "门店或货架斜侧构图，产品位于画面右下角，标题留白在左上角。",
      prompt:
        "A realistic Xiaohongshu shopping guide cover, Hong Kong Mannings store shelf atmosphere, hand holding Chinese medicated oil product, clean retail background, natural handheld photo style, beige and green tones, vertical 3:4, readable blank space for Chinese title."
    },
    {
      type: "攻略型封面",
      visual: "以购物攻略方式呈现，把产品放进香港旅游常备清单，降低广告感。",
      elements: ["清单排版", "旅行包", "产品", "护照/八达通/购物小票"],
      title: "万宁购物清单",
      subtitle: "旅行常备类",
      angle: "俯拍构图，物品整齐摆放，封面标题放在画面上方。",
      prompt:
        "Flat lay Xiaohongshu cover, Hong Kong travel essentials checklist, traditional Chinese medicated oil, travel pouch, receipt, Octopus card style prop, clean beige background, premium editorial layout, soft shadow, vertical 3:4."
    }
  ],
  shootingChecklist: ["万宁门店外观", "中成药货架", "手持产品近景", "旅行包/酒店桌面", "肩颈或小腿舒缓动作", "购物清单或小票"],
  compositionTips: ["封面保留 30% 留白放标题", "产品不要占满画面，保持生活化", "优先使用自然光和真实门店环境", "人物动作要轻，不做夸张疼痛表情"],
  copySuggestions: ["香港旅行常备", "万宁顺手买", "逛街后放松一下", "不只买护肤品", "我的香港购物清单"],
  aiPrompts: [
    "真实香港旅行场景，酒店桌面上放着药油、购物袋和行李箱，温暖自然光，小红书生活方式封面，干净高级。",
    "香港万宁购物攻略风格，手持中成药产品，背景是货架和购物清单，真实拍摄质感，浅色背景，留白充足。"
  ],
  realShotList: ["真人拿产品走进万宁", "货架前拿起产品", "回酒店整理购物袋", "肩颈/小腿轻度舒缓动作", "购物清单与产品合照"],
  forbidden: ["夸张治疗前后对比", "医生/医院场景暗示", "严重疼痛表情", "绝对化功效表达", "大面积红色警示风格", "未经确认的销量或疗效数据"]
};

export const videoScriptTemplate = {
  title: "去香港万宁，我会把这类旅行常备小物加进清单",
  durationOptions: ["15秒", "30秒", "60秒"],
  recommendedDuration: "30秒",
  shots: [
    {
      shot: "镜头1",
      time: "0-3秒",
      visual: "香港街景或万宁门店外观，人物边走边入镜。",
      voice: "来香港玩，如果每天都要暴走，我会提前准备一点常备小物。",
      subtitle: "香港旅行，不只买护肤品",
      tip: "开头要像真实旅行记录，不要直接拿产品硬推。"
    },
    {
      shot: "镜头2",
      time: "3-8秒",
      visual: "万宁货架快速扫过，中成药区停留 1 秒。",
      voice: "以前我只看美妆区，后来发现万宁的中成药区也很实用。",
      subtitle: "万宁中成药区也值得看看",
      tip: "镜头移动要慢，保证货架和场景真实。"
    },
    {
      shot: "镜头3",
      time: "8-15秒",
      visual: "手持产品近景，切到旅行包或酒店桌面。",
      voice: "像这种药油类产品，更适合逛街多、肩颈紧、运动后不舒服的时候备着。",
      subtitle: "逛街多 / 肩颈紧 / 旅行常备",
      tip: "只讲使用场景，不做治疗承诺。"
    },
    {
      shot: "镜头4",
      time: "15-24秒",
      visual: "人物回酒店整理购物袋，把产品放进旅行包。",
      voice: "它更像香港家庭会顺手备着的小物，不需要囤很多，顺路看到可以了解一下。",
      subtitle: "顺路看到，可以了解一下",
      tip: "画面要轻松，避免强销售语气。"
    },
    {
      shot: "镜头5",
      time: "24-30秒",
      visual: "产品与购物清单合照，镜头定格。",
      voice: "下次去香港万宁，可以把旅行常备这一类也加进清单。",
      subtitle: "万宁购物清单 +1",
      tip: "结尾用清单感收束，方便收藏。"
    }
  ],
  voiceover:
    "来香港玩，如果每天都要暴走，我会提前准备一点常备小物。以前我只看美妆区，后来发现万宁的中成药区也很实用。像这种药油类产品，更适合逛街多、肩颈紧、运动后不舒服的时候备着。它更像香港家庭会顺手备着的小物，不需要囤很多，顺路看到可以了解一下。",
  visualShots: ["万宁门店外观", "中成药货架", "手持产品", "旅行包/酒店桌面", "购物清单合照"],
  subtitles: ["香港旅行，不只买护肤品", "万宁中成药区也值得看看", "逛街多 / 肩颈紧 / 旅行常备", "顺路看到，可以了解一下", "万宁购物清单 +1"],
  broll: ["香港街景", "走路暴走脚步", "购物袋", "小票", "酒店桌面整理物品"],
  ending: "你们去香港万宁还会买什么常备小物？可以留言给我。",
  creatorType: "香港旅游达人 / 万宁探店达人 / 真实体验型素人 / 轻养生生活博主"
};

export const developerReviewMode = {
  systemStatus: [
    { module: "Dashboard", status: "已完成", note: "今日内容机会、推荐品牌、推荐产品、推荐理由已接入静态数据。" },
    { module: "内容决策", status: "已完成", note: "支持品牌、产品、内容目标选择，并展示内容方向评分。" },
    { module: "选题生成", status: "已完成", note: "基于当前品牌、产品、方向生成 20 个模拟选题。" },
    { module: "笔记生成", status: "已完成", note: "已包含标题、封面、正文、评论引导、标签、素材类型。" },
    { module: "Image Brief", status: "已完成", note: "已输出封面方案、拍摄清单、构图建议、AI Prompt 和禁用表达。" },
    { module: "Video Script", status: "已完成", note: "已输出短视频标题、时长、分镜、口播、字幕、B-roll 和达人类型。" },
    { module: "内容资产库", status: "MVP", note: "当前为前端临时保存，刷新后新生成内容不会持久保存。" },
    { module: "数据复盘", status: "MVP", note: "当前为模拟数据，后续可接入真实发布数据和 AI 复盘。" }
  ],
  dataSources: [
    { name: "品牌知识库", file: "data.js", type: "静态数据", status: "已接入" },
    { name: "产品知识库", file: "data.js", type: "静态数据", status: "已接入" },
    { name: "内容机会库", file: "data.js", type: "静态数据", status: "已接入" },
    { name: "选题模板库", file: "data.js", type: "静态数据", status: "已接入" },
    { name: "笔记草稿模板", file: "data.js", type: "静态数据", status: "已接入" },
    { name: "图片 Brief 模板", file: "data.js", type: "静态数据", status: "已接入" },
    { name: "视频脚本模板", file: "data.js", type: "静态数据", status: "已接入" },
    { name: "真实 AI 接口", file: "待接入", type: "API", status: "待接入" },
    { name: "真实内容数据", file: "待接入", type: "数据库 / 表格", status: "待接入" }
  ],
  apiRoadmap: [
    "OpenAI / ChatGPT：内容机会判断、选题生成、笔记生成、复盘建议",
    "ChatGPT Image / Midjourney / 即梦：封面图和场景图生成",
    "可灵 / Runway：短视频画面生成",
    "小红书数据表：曝光、阅读、互动、收藏、评论回传",
    "品牌知识库：品牌定位、产品卖点、禁用词、合规边界",
    "内容资产库：持久化保存、审核状态、发布状态、复盘状态"
  ],
  launchChecklist: [
    { item: "页面可正常访问", status: "通过" },
    { item: "移动端和电脑端布局可用", status: "通过" },
    { item: "所有模拟数据集中在 data.js", status: "通过" },
    { item: "无真实 AI 接口依赖", status: "通过" },
    { item: "复制按钮可用", status: "通过" },
    { item: "内容刷新后持久保存", status: "待开发" },
    { item: "真实小红书数据接入", status: "待开发" },
    { item: "账号登录和权限", status: "待开发" }
  ]
};

export const assetLibrary = [
  {
    id: "asset-001",
    title: "来香港旅游，万宁里这类药油真的可以提前备着",
    brand: "济众堂",
    product: "百步追风活络油",
    direction: "香港旅游",
    format: "攻略",
    createdAt: "2026-06-30",
    status: "待审核"
  },
  {
    id: "asset-002",
    title: "办公室久坐肩颈酸痛，我为什么会随身放一瓶活络油",
    brand: "济众堂",
    product: "百步追风活络油",
    direction: "办公室肩颈",
    format: "真实体验",
    createdAt: "2026-06-29",
    status: "已通过"
  },
  {
    id: "asset-003",
    title: "暴雨天关节不舒服，香港人家里常备什么",
    brand: "公牛牌",
    product: "公牛牌风痛灵",
    direction: "雨天关节",
    format: "干货",
    createdAt: "2026-06-28",
    status: "已发布"
  }
];

export const reviewRows = [
  {
    id: "review-001",
    title: "香港旅游行李箱里，我会多放一瓶这种药油",
    exposure: 48200,
    reads: 9800,
    likes: 420,
    saves: 680,
    comments: 56,
    shares: 74,
    ctr: "20.3%",
    engagement: "12.6%",
    reusable: "是",
    advice: "收藏率较高，说明用户对“香港旅游常备药品”方向有需求。建议继续延展“香港旅游 + 万宁 + 药油”内容方向。"
  },
  {
    id: "review-002",
    title: "办公室久坐肩颈酸痛，我为什么会随身放一瓶活络油",
    exposure: 32600,
    reads: 6100,
    likes: 280,
    saves: 390,
    comments: 32,
    shares: 41,
    ctr: "18.7%",
    engagement: "12.2%",
    reusable: "是",
    advice: "该内容适合继续复用，因为场景真实、标题具备点击吸引力。后续可以增加“通勤包常备”角度。"
  },
  {
    id: "review-003",
    title: "暴雨天关节不舒服，香港人家里常备什么",
    exposure: 21400,
    reads: 3300,
    likes: 126,
    saves: 180,
    comments: 18,
    shares: 22,
    ctr: "15.4%",
    engagement: "10.5%",
    reusable: "待观察",
    advice: "天气场景明确，但标题可以更具体。建议加入“阴雨天 + 关节不适 + 万宁购买”的组合关键词。"
  }
];
