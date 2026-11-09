# 煤球聚合源

把 11 个 iOS 软件源合并去重成一个源，在签名 App 里加一次即可。

## 导入地址

- 通用版（易能签 / 全能签 / ESign）：`https://raw.githubusercontent.com/Chenhuyue/ios-mega-source/main/mega-source.json`
  - 1131 款应用，含 46 款无 Bundle ID 条目（源自轻松签聚合源、全能签官方源，只能在 ESign 系 App 里用）
- AltStore 严格版（Feather / SideStore / AltStore）：`https://raw.githubusercontent.com/Chenhuyue/ios-mega-source/main/mega-source-altstore.json`
  - 1085 款应用，全部带完整 Bundle ID

## 合并口径（2026-11-09 生成）

- 来源：轻松签聚合源、全能签官方源、AppTesters IPA Repo、swaggyP36000 IPA Library、CyPwn IPA Library、Quantum Source、SideStore Team Picks、Burrito's AltStore、OatmealDome / DolphiniOS、Flycast 官方源、iSH 官方源
- 去重：按 Bundle ID（无 ID 的按应用名），跨源版本合并，每款保留最新 3 个版本，共 2305 个版本条目
- 每条保留 `origins` 字段注明出处源

## 排序与中文名（2026-11-09 晚，用户要求「中文热门前置，英文翻译」）

- **热门前置**：默认排序改为热度序——轻松签聚合/全能签官方两个中文精选源的条目优先，其次多源共同收录、中文名条目靠前。
- **英文翻译**：按 Bundle ID 批量查 iTunes 中国区，601 款在架，其中 295 款有官方中文名，已改用中文名作标题、原英文名留副标题（如 Fing→「Fing - 网络扫描仪」、1Blocker→「1Blocker 广告拦截器」）；不在中国区上架或无中文名的保持原样，不机翻硬造。映射缓存 cn-names.json。

## 分类分源（在 ESign / 易能签里实现「筛选」的方式）

易能签（EnSign）筛选面板按条目的 `type` 数字码分类（2026-11-09 真机对照实测：1=应用、2=游戏、3=影视，category 字段不参与筛选）。全量源已按此写入：游戏与模拟器→2、影音娱乐→3、其余→1，在 App 里刷新源后即可按类筛选。另备 9 个分类分源（按中文细类拆分，想只看一类时可用，非必须）：

- 游戏与模拟器 53：`https://raw.githubusercontent.com/Chenhuyue/ios-mega-source/main/mega-games.json`
- 影音娱乐 63：`https://raw.githubusercontent.com/Chenhuyue/ios-mega-source/main/mega-media.json`
- 社交通讯 42：`https://raw.githubusercontent.com/Chenhuyue/ios-mega-source/main/mega-social.json`
- 工具效率 46：`https://raw.githubusercontent.com/Chenhuyue/ios-mega-source/main/mega-tools.json`
- 系统与开发 29：`https://raw.githubusercontent.com/Chenhuyue/ios-mega-source/main/mega-system.json`
- 摄影修图 46：`https://raw.githubusercontent.com/Chenhuyue/ios-mega-source/main/mega-photo.json`
- 阅读学习 33：`https://raw.githubusercontent.com/Chenhuyue/ios-mega-source/main/mega-read.json`
- 健康运动 33：`https://raw.githubusercontent.com/Chenhuyue/ios-mega-source/main/mega-health.json`
- 生活出行 44：`https://raw.githubusercontent.com/Chenhuyue/ios-mega-source/main/mega-life.json`

「其他」742 款只在全量版里，不单独出分源。全量版与分源内容重叠，App 里加了分源可以删全量版，反之亦然。

## 分类（2026-11-09 补，规则自动分类）

每条应用带 `category` 字段（EnSign/AltStore 标准取值：games、entertainment、social、utilities、developer、photo-video、lifestyle、other，筛选面板按它分类）与 `categoryCN` 字段（中文细类，下方计数按细类），文件内按细类分组排序。细类按名称 / Bundle ID / 简介关键词判定，映射关系：游戏与模拟器→games、影音娱乐→entertainment、社交通讯→social、工具效率→utilities、系统与开发→developer、摄影修图→photo-video、阅读学习＋健康运动＋生活出行→lifestyle、其他→other：

- 游戏与模拟器 53 · 影音娱乐 63 · 社交通讯 42 · 工具效率 46 · 系统与开发 29
- 摄影修图 46 · 阅读学习 33 · 健康运动 33 · 生活出行 44 · 其他 742

「其他」多为名称与简介无类别信息的长尾应用，未强行归类。

## 未纳入（技术上合不进来，需在 App 里单独添加）

- 胡椒工具源 / 胡椒游戏源 / 悦杰云科技源：加密源，只能被签名 App 直接读取
- 3U 软件源 / 3U 游戏源：付费解锁源，下载地址须在 App 内解锁后才下发，公开拉取到的清单没有下载地址
- 心动源 / 轻松签官方源 / 喵喵签源 / 壹筒天下：待验源，生成时未能拉取到内容
- ake 软件源 / 优创源 / Kevin's Legit Sideload：已失效
