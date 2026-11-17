// 空间启动器 · App 内页面（说明 + 快捷操作；桌面组件本体在 widget.tsx）
import {
  Button,
  HStack,
  Link,
  Navigation,
  Script,
  Spacer,
  Text,
  VStack,
  Widget,
} from "scripting"
import { LAUNCHER_URL, resetPage } from "./model"

function App() {
  return (
    <VStack alignment="leading" spacing={14} padding={18}>
      <Text font={20} fontWeight="bold">
        空间启动器
      </Text>
      <Text font={13} foregroundStyle="#9AA3B2">
        桌面组件：卡片式展示全部空间，点卡片直达；底部按钮可翻页，系统刷新时也会自动轮播到下一页。名单与图标自动从云端同步，新增空间会自动出现。
      </Text>
      <Link url={LAUNCHER_URL}>
        <Text font={14} foregroundStyle="#7CB3FF">
          打开空间启动器（网页版）
        </Text>
      </Link>
      <Button
        title="把组件重置到第一页"
        action={() => {
          resetPage()
          Widget.reloadAll()
        }}
      />
      <Spacer />
      <HStack>
        <Text font={11} foregroundStyle="#6E7688">
          添加方式：长按桌面 → 添加小组件 → 选 Scripting → 选本脚本（推荐大号）。
        </Text>
      </HStack>
    </VStack>
  )
}

async function main() {
  await Navigation.present({ element: <App /> })
  Script.exit()
}

main()
