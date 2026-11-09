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

## 分类分源（在 ESign / 易能签里实现「筛选」的方式）

签名 App 不读源内的分类筛选（`category` 字段只在 Feather / Ksign 的应用详情里当标签显示，没有筛选界面）。这个生态实现分类的通行办法是**分源**——像胡椒分工具源 / 游戏源一样。所以聚合源另拆了 9 个分类分源，想看哪类就加哪个，加进去整表都是这一类：

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

每条应用带 `category` 字段，文件内按类分组排序。按名称 / Bundle ID / 简介关键词判定：

- 游戏与模拟器 53 · 影音娱乐 63 · 社交通讯 42 · 工具效率 46 · 系统与开发 29
- 摄影修图 46 · 阅读学习 33 · 健康运动 33 · 生活出行 44 · 其他 742

「其他」多为名称与简介无类别信息的长尾应用，未强行归类。

## 未纳入（技术上合不进来，需在 App 里单独添加）

- 胡椒工具源 / 胡椒游戏源 / 悦杰云科技源：加密源，只能被签名 App 直接读取
- 3U 软件源 / 3U 游戏源：付费解锁源，下载地址须在 App 内解锁后才下发，公开拉取到的清单没有下载地址
- 心动源 / 轻松签官方源 / 喵喵签源 / 壹筒天下：待验源，生成时未能拉取到内容
- ake 软件源 / 优创源 / Kevin's Legit Sideload：已失效
