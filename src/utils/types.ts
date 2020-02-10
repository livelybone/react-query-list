import { PaginationProps } from '@livelybone/react-pagination'
import { ReactNode } from 'react'

export interface ReactQueryListProps {
  children?: ReactNode | ((list: any[], error: string | Error) => ReactNode)
  queryAtMounted?: boolean
  className?: string
  paginationProps?: Pick<
    PaginationProps,
    Exclude<keyof PaginationProps, 'onPageChange'>
  >
  loadingComp?: ReactNode

  onError?(error: string | Error): any

  onQuery<T extends any>(params: {
    pageSize: number
    pageIndex: number
  }): Promise<{
    pageCount?: number
    list: T[]
    [key: string]: any
    [key: number]: any
  }>
}

export interface ReactQueryListState {
  loading: boolean
  list: any[]
  error: string | Error
  $paginationProps: NonNullable<ReactQueryListProps['paginationProps']>
}
