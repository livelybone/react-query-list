import { PureComponent, ReactNode } from 'react'
import ReactPagination, { PaginationProps } from '@livelybone/react-pagination'

interface ReactQueryListProps {
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

interface ReactQueryListState {
  loading: boolean
  list: any[]
  error: string | Error
  $paginationProps: NonNullable<ReactQueryListProps['paginationProps']>
}

declare class ReactQueryList extends PureComponent<
  ReactQueryListProps,
  ReactQueryListState
> {
  paginationRef: ReactPagination

  constructor(props: ReactQueryListProps)

  query(reset?: boolean): Promise<void>

  componentDidMount(): void

  componentDidUpdate(
    prevProps: Readonly<ReactQueryListProps>,
    prevState: Readonly<ReactQueryListState>,
    snapshot?: any,
  ): void

  render(): JSX.Element
}

export default ReactQueryList
export { ReactQueryListProps, ReactQueryListState }
