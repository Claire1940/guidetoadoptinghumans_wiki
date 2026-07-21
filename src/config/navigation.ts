import {
	BookImage,
	BookOpen,
	ClipboardCheck,
	HeartHandshake,
	Home,
	Newspaper,
	Users,
	type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'guide' -> t('nav.guide')
	path: string // URL 路径，如 '/guide'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
	{ key: 'process', path: '/process', icon: ClipboardCheck, isContentType: true },
	{ key: 'humans', path: '/humans', icon: Users, isContentType: true },
	{ key: 'care', path: '/care', icon: HeartHandshake, isContentType: true },
	{ key: 'housing', path: '/housing', icon: Home, isContentType: true },
	{ key: 'manhwa', path: '/manhwa', icon: BookImage, isContentType: true },
	{ key: 'updates', path: '/updates', icon: Newspaper, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['codes', 'build', 'combat', 'guides']

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
