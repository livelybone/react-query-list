import { PaginationProps } from '@livelybone/react-pagination'
import { ReactNode } from 'react'

export interface ReactQueryListProps<T> {
  children?: ReactNode | ((list: T[], error: string | Error) => ReactNode)
  queryAtMounted?: boolean
  className?: string
  paginationProps?: Pick<
    PaginationProps,
    Exclude<keyof PaginationProps, 'onPageChange'>
  >
  loadingComp?: ReactNode

  onError?(error: string | Error): any

  onQuery(params: {
    pageSize: number
    pageIndex: number
  }): Promise<{
    pageCount?: number
    list: T[]
    [key: string]: any
    [key: number]: any
  }>
}

export interface ReactQueryListState<T> {
  loading: boolean
  list: T[]
  error: string | Error
  $paginationProps: NonNullable<ReactQueryListProps<T>['paginationProps']>
}
