import { useTheme } from "@/components/theme-provider"

/** 현재 적용된 테마가 다크인지 여부 */
export function useIsDark() {
  const { resolvedTheme } = useTheme()
  return resolvedTheme !== "light"
}
