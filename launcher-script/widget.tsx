// 空间启动器 · 桌面小组件（Scripting）
// 卡片式 + 点按翻页（AppIntent）+ 自动轮播：系统每次刷新组件时自动翻到下一页；
// 手动点过翻页钮后的 90 秒内不自动翻，避免跟你抢。
import {
  Button,
  Capsule,
  Circle,
  HStack,
  Image,
  Link,
  RoundedRectangle,
  Spacer,
  Text,
  VStack,
  Widget,
  ZStack,
} from "scripting"
import { NextPageIntent, PrevPageIntent } from "./app_intents"
import {
  SpaceItem,
  getPage,
  iconURL,
  lastManualAt,
  loadSpaces,
  setPage,
  setPages,
  spaceURL,
} from "./model"

const BG = "#101218"
const CARD = "rgba(255,255,255,0.055)"
const SUB = "#9AA3B2"
const FAINT = "#6E7688"
const REFRESH_MINUTES = 30
const MANUAL_HOLD_MS = 90 * 1000

function perPageForFamily(): number {
  switch (Widget.family) {
    case "systemLarge":
      return 8
    case "systemMedium":
      return 4
    case "systemSmall":
      return 4
    default:
      return 8
  }
}

function MeiqiuMark() {
  return (
    <ZStack frame={{ width: 26, height: 26 }}>
      <Circle fill="#05060A" />
      <HStack spacing={3}>
        <Capsule fill="#F4F6FF" frame={{ width: 4, height: 11 }} />
        <Capsule fill="#F4F6FF" frame={{ width: 4, height: 11 }} />
      </HStack>
    </ZStack>
  )
}

function Header(total: number) {
  return (
    <HStack spacing={8}>
      <MeiqiuMark />
      <VStack alignment="leading" spacing={1}>
        <Text font={15} fontWeight="bold" foregroundStyle="#F5F7FF">
          空间启动器
        </Text>
        <Text font={9} foregroundStyle={SUB}>
          常用排前面 · 自动轮播翻页
        </Text>
      </VStack>
      <Spacer />
      <ZStack frame={{ width: 76, height: 21 }}>
        <RoundedRectangle cornerRadius={999} fill="rgba(255,255,255,0.10)" />
        <Text font={10} foregroundStyle="#C9D2E8">
          {`${total} 个空间`}
        </Text>
      </ZStack>
    </HStack>
  )
}

function Card(item: SpaceItem, showSlug: boolean, height: number) {
  return (
    <Link url={spaceURL(item.slug)}>
      <ZStack
        frame={{ maxWidth: "infinity", height: height }}
        background={<RoundedRectangle cornerRadius={12} fill={CARD} />}
      >
        <HStack spacing={8} padding={{ horizontal: 9 }} frame={{ maxWidth: "infinity" }}>
          <ZStack frame={{ width: height - 18, height: height - 18 }}>
            <RoundedRectangle cornerRadius={8} fill={item.color} />
            <Image
              imageUrl={iconURL(item.slug)}
              resizable={{ resizingMode: "stretch" }}
              frame={{ width: height - 18, height: height - 18 }}
              width={height - 18}
              height={height - 18}
              placeholder={<RoundedRectangle cornerRadius={8} fill={item.color} />}
            />
          </ZStack>
          <VStack alignment="leading" spacing={1}>
            <Text font={12} fontWeight="semibold" foregroundStyle="#F2F5FF">
              {item.name}
            </Text>
            {showSlug ? (
              <Text font={8} foregroundStyle={FAINT}>
                {item.slug.length > 24 ? item.slug.slice(0, 24) + "…" : item.slug}
              </Text>
            ) : null}
          </VStack>
          <Spacer />
        </HStack>
      </ZStack>
    </Link>
  )
}

function EmptyCard(height: number) {
  return (
    <ZStack
      frame={{ maxWidth: "infinity", height: height }}
      background={<RoundedRectangle cornerRadius={12} fill="rgba(255,255,255,0.0)" />}
    >
      <Text font={1} foregroundStyle="rgba(255,255,255,0)">
        {" "}
      </Text>
    </ZStack>
  )
}

function Pager(page: number, pages: number) {
  const dots = Array.from({ length: pages }, (_, i) => (i === page ? "●" : "○")).join(" ")
  return (
    <HStack spacing={8}>
      <Text font={10} foregroundStyle={SUB}>
        {`第 ${page + 1} / ${pages} 页 · v1.1.3`}
      </Text>
      <Spacer />
      <Text font={9} foregroundStyle={SUB}>
        {dots}
      </Text>
      <Spacer />
      <Button intent={PrevPageIntent(undefined)} buttonStyle="plain">
        <ZStack frame={{ width: 62, height: 24 }}>
          <RoundedRectangle cornerRadius={999} fill="rgba(255,255,255,0.10)" />
          <Text font={11} foregroundStyle="#E8EDFF">
            ‹ 上页
          </Text>
        </ZStack>
      </Button>
      <Button intent={NextPageIntent(undefined)} buttonStyle="plain">
        <ZStack frame={{ width: 62, height: 24 }}>
          <RoundedRectangle cornerRadius={999} fill="rgba(255,255,255,0.10)" />
          <Text font={11} foregroundStyle="#E8EDFF">
            下页 ›
          </Text>
        </ZStack>
      </Button>
    </HStack>
  )
}

function LargeView(spaces: SpaceItem[], page: number, pages: number) {
  const per = 8
  const items = spaces.slice(page * per, page * per + per)
  const rows: SpaceItem[][] = []
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2))
  return (
    <VStack alignment="leading" spacing={8} padding={13} background={BG}>
      {Header(spaces.length)}
      {rows.map((row) => (
        <HStack spacing={8}>
          {Card(row[0], true, 54)}
          {row[1] ? Card(row[1], true, 54) : EmptyCard(54)}
        </HStack>
      ))}
      <Spacer />
      {Pager(page, pages)}
    </VStack>
  )
}

function MediumView(spaces: SpaceItem[], page: number, pages: number) {
  const per = 4
  const items = spaces.slice(page * per, page * per + per)
  const rows: SpaceItem[][] = []
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2))
  return (
    <VStack alignment="leading" spacing={8} padding={12} background={BG}>
      {Header(spaces.length)}
      {rows.map((row) => (
        <HStack spacing={8}>
          {Card(row[0], false, 46)}
          {row[1] ? Card(row[1], false, 46) : EmptyCard(46)}
        </HStack>
      ))}
      <Spacer />
      {Pager(page, pages)}
    </VStack>
  )
}

function SmallView(spaces: SpaceItem[], page: number, pages: number) {
  const per = 4
  const items = spaces.slice(page * per, page * per + per)
  return (
    <VStack alignment="leading" spacing={7} padding={11} background={BG}>
      <HStack spacing={6}>
        <MeiqiuMark />
        <Text font={12} fontWeight="bold" foregroundStyle="#F5F7FF">
          空间启动器
        </Text>
      </HStack>
      {items.map((item) => (
        <Link url={spaceURL(item.slug)}>
          <HStack spacing={7}>
            <ZStack frame={{ width: 24, height: 24 }}>
              <RoundedRectangle cornerRadius={6} fill={item.color} />
              <Image
                imageUrl={iconURL(item.slug)}
                resizable={{ resizingMode: "stretch" }}
                frame={{ width: 24, height: 24 }}
                width={24}
                height={24}
                placeholder={<RoundedRectangle cornerRadius={6} fill={item.color} />}
              />
            </ZStack>
            <Text font={11} foregroundStyle="#EDF1FF">
              {item.name}
            </Text>
            <Spacer />
          </HStack>
        </Link>
      ))}
      <Spacer />
      <Text font={9} foregroundStyle={SUB}>
        {`第 ${page + 1} / ${pages} 页 · 自动轮播`}
      </Text>
    </VStack>
  )
}

async function main() {
  const reloadPolicy = {
    policy: "after",
    date: new Date(Date.now() + REFRESH_MINUTES * 60 * 1000),
  } as const

  let spaces: SpaceItem[] = []
  try {
    spaces = await loadSpaces()
  } catch {
    spaces = []
  }

  const per = perPageForFamily()
  const pages = Math.max(1, Math.ceil(spaces.length / per))
  setPages(pages)

  // 页码决定：手动翻页后 90 秒内听用户的；其余时候每次刷新自动轮播一页。
  let page = getPage() % pages
  if (Date.now() - lastManualAt() > MANUAL_HOLD_MS) {
    page = (page + 1) % pages
    setPage(page)
  }

  try {
    switch (Widget.family) {
      case "systemMedium":
        Widget.present(MediumView(spaces, page, pages), { reloadPolicy })
        break
      case "systemSmall":
        Widget.present(SmallView(spaces, page, pages), { reloadPolicy })
        break
      case "systemLarge":
      case "systemExtraLarge":
        Widget.present(LargeView(spaces, page, pages), { reloadPolicy })
        break
      default:
        Widget.present(
          <VStack padding={12} background={BG}>
            <Text font={12} foregroundStyle="#F5F7FF">
              {`空间启动器 · ${spaces.length} 个空间`}
            </Text>
          </VStack>,
          { reloadPolicy }
        )
    }
  } catch {
    Widget.present(
      <VStack padding={12} background={BG}>
        <Text font={12} foregroundStyle="#F5F7FF">
          空间启动器
        </Text>
      </VStack>,
      { reloadPolicy }
    )
  }
}

main()
