import { ReactQueryListProps } from './types'

export function isPaginationPropsDiff(
  props?: ReactQueryListProps<any>['paginationProps'],
  $props?: ReactQueryListProps<any>['paginationProps'],
) {
  if (!props && !$props) return false
  if (!props || !$props) return true
  return [
    'pageSize' as const,
    'pageIndex' as const,
    'pageCount' as const,
    'currentPageSize' as const,
    'maxPageBtn' as const,
    'debounceTime' as const,
  ].some(key => props[key] !== $props[key])
}
