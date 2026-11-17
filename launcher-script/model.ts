// 空间启动器 · 数据层（widget.tsx / app_intents.tsx / index.tsx 共用）
// 名单与图标托管在 GitHub 仓库 Chenhuyue/ios-mega-source，脚本自动拉取并缓存。
// 拉不到时依次用：上次缓存 → 内置 21 条，组件永远能渲染。

export type SpaceItem = {
  name: string
  slug: string
  color: string
  fav?: boolean
}

export const LIST_URLS = [
  "https://fastly.jsdelivr.net/gh/Chenhuyue/ios-mega-source@main/launcher.json",
  "https://raw.githubusercontent.com/Chenhuyue/ios-mega-source/main/launcher.json",
]

export const ICON_BASE =
  "https://fastly.jsdelivr.net/gh/Chenhuyue/ios-mega-source@main/icons"

export const LAUNCHER_URL = "https://muse.ai/library/artifacts/kong-jian-qi-dong-qi"

export function spaceURL(slug: string): string {
  return `https://muse.ai/library/artifacts/${slug}`
}

export function iconURL(slug: string): string {
  return `${ICON_BASE}/icon-${slug}.webp`
}

const SPACES_KEY = "launcher.spaces.v1"
const PAGE_KEY = "launcher.page.v1"
const MANUAL_AT_KEY = "launcher.manualAt.v1"
const COUNT_KEY = "launcher.count.v1"
const PAGES_KEY = "launcher.pages.v1"

export const FALLBACK: SpaceItem[] = [
  { name: "VPS 总台", slug: "vps-zi-chan-guan-li", color: "#5B8DEF", fav: true },
  { name: "API 与 AI 管理", slug: "api-yu-ai-guan-li", color: "#7C5CFC", fav: true },
  { name: "薅羊毛", slug: "dian-zi-chan-pin-hao-yang-mao", color: "#FF9F43", fav: true },
  { name: "AV 个性化推荐", slug: "av-ge-xing-hua-tui-jian", color: "#FF5C7A", fav: true },
  { name: "3D 办公室", slug: "3d-ban-gong-shi", color: "#38B2AC" },
  { name: "搁置与未完成总览", slug: "ge-zhi-yu-wei-wan-cheng-zong-lan", color: "#9AA3B2" },
  { name: "Telegram 管理看板", slug: "telegram-guan-li-kan-ban", color: "#37AEE2" },
  { name: "自慰记录看板", slug: "zi-wei-ji-lu-kan-ban", color: "#A55EEA" },
  { name: "捡垃圾情报站", slug: "jian-la-ji-qing-bao-zhan", color: "#26C281" },
  { name: "闲鱼蹲货看板", slug: "xian-yu-dun-huo-kan-ban", color: "#FF7B54" },
  { name: "VPS 监控看板", slug: "vps-jian-kong-kan-ban", color: "#4BCFFA" },
  { name: "网名雷达", slug: "sherlock-kan-ban", color: "#FD79A8" },
  { name: "HGhub Web 看板", slug: "hghub-web-kan-ban", color: "#F6B93B" },
  { name: "图片提示词库", slug: "tu-pian-ti-shi-ci-ku", color: "#6C5CE7" },
  { name: "无限画布", slug: "wu-xian-hua-bu", color: "#00CEC9" },
  { name: "云电脑出图台", slug: "yun-dian-nao-chu-tu-tai", color: "#74B9FF" },
  { name: "iOS 签名工具箱", slug: "ios-qian-ming-gong-ju-xiang", color: "#E17055" },
  { name: "Recent 案例拆解看板", slug: "recent-an-li-chai-jie-kan-ban", color: "#55E6C1" },
  { name: "找源技术调研", slug: "zhao-yuan-ji-shu-diao-yan", color: "#B8C2CC" },
  { name: "Apple TV 调研", slug: "apple-tv", color: "#7A8699" },
  { name: "云 GPU 调研", slug: "gpu", color: "#FDCB6E" },
]

function sortedFavFirst(list: SpaceItem[]): SpaceItem[] {
  const favs = list.filter((x) => x.fav)
  const rest = list.filter((x) => !x.fav)
  return [...favs, ...rest]
}

function withTimeout<T>(work: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    work.catch(() => null),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]) as Promise<T | null>
}

async function fetchList(): Promise<SpaceItem[] | null> {
  for (const url of LIST_URLS) {
    const data = await withTimeout(
      (async () => {
        const res = await fetch(url)
        if (!res.ok) return null
        const json: any = await res.json()
        const arr = Array.isArray(json) ? json : json.spaces
        if (!Array.isArray(arr) || arr.length === 0) return null
        return arr
          .filter((x: any) => x && x.name && x.slug)
          .map((x: any) => ({
            name: String(x.name),
            slug: String(x.slug),
            color: String(x.color ?? "#8A93A6"),
            fav: !!x.fav,
          })) as SpaceItem[]
      })(),
      5000
    )
    if (data && data.length > 0) return data
  }
  return null
}

/** 拉最新名单（成功后写缓存）；失败回退缓存，再失败回退内置名单。 */
export async function loadSpaces(): Promise<SpaceItem[]> {
  const fresh = await fetchList()
  if (fresh) {
    Storage.set(SPACES_KEY, fresh)
    Storage.set(COUNT_KEY, fresh.length)
    return sortedFavFirst(fresh)
  }
  const cached = Storage.get<SpaceItem[]>(SPACES_KEY)
  if (cached && cached.length > 0) return sortedFavFirst(cached)
  Storage.set(COUNT_KEY, FALLBACK.length)
  return FALLBACK
}

/** 同步读缓存名单（意图里算总页数用，不发网络请求）。 */
export function cachedCount(): number {
  const n = Storage.get<number>(COUNT_KEY)
  if (n && n > 0) return n
  const cached = Storage.get<SpaceItem[]>(SPACES_KEY)
  return cached && cached.length > 0 ? cached.length : FALLBACK.length
}

export function getPage(): number {
  const p = Storage.get<number>(PAGE_KEY)
  return typeof p === "number" && p >= 0 ? Math.floor(p) : 0
}

export function setPage(p: number) {
  Storage.set(PAGE_KEY, p)
}

export function markManual() {
  Storage.set(MANUAL_AT_KEY, Date.now())
}

export function lastManualAt(): number {
  const t = Storage.get<number>(MANUAL_AT_KEY)
  return typeof t === "number" ? t : 0
}

export function resetPage() {
  Storage.set(PAGE_KEY, 0)
  Storage.set(MANUAL_AT_KEY, Date.now())
}

/** widget.tsx 每次渲染时记下当前尺寸下的总页数，意图翻页时按这个数回绕。 */
export function setPages(p: number) {
  Storage.set(PAGES_KEY, Math.max(1, p))
}

export function getPages(): number {
  const p = Storage.get<number>(PAGES_KEY)
  return typeof p === "number" && p > 0 ? Math.floor(p) : 0
}
