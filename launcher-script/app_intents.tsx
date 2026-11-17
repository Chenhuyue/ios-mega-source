// 空间启动器 · 组件内翻页意图（点按钮时执行，不打开 App）
import { AppIntentManager, AppIntentProtocol, Widget } from "scripting"
import { cachedCount, getPage, getPages, markManual, setPage } from "./model"

function totalPages(): number {
  const recorded = getPages()
  if (recorded > 0) return recorded
  return Math.max(1, Math.ceil(cachedCount() / 8))
}

export const NextPageIntent = AppIntentManager.register({
  name: "LauncherNextPage",
  protocol: AppIntentProtocol.AppIntent,
  perform: async () => {
    const pages = totalPages()
    setPage((getPage() + 1) % pages)
    markManual()
    Widget.reloadAll()
  },
})

export const PrevPageIntent = AppIntentManager.register({
  name: "LauncherPrevPage",
  protocol: AppIntentProtocol.AppIntent,
  perform: async () => {
    const pages = totalPages()
    setPage((getPage() - 1 + pages) % pages)
    markManual()
    Widget.reloadAll()
  },
})
