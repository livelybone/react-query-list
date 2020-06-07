import ReactPagination, { PaginationProps } from '@livelybone/react-pagination'
import { PureComponent, ReactNode } from 'react'

interface ReactQueryListProps<T extends any> {
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

interface ReactQueryListState<T extends any> {
  loading: boolean
  list: T[]
  error: string | Error
  $paginationProps: NonNullable<ReactQueryListProps<T>['paginationProps']>
}

declare class ReactQueryList<T extends any> extends PureComponent<
  ReactQueryListProps<T>,
  ReactQueryListState<T>
> {
  paginationRef: ReactPagination

  constructor(props: ReactQueryListProps<T>)

  query(reset?: boolean): Promise<void>

  componentDidMount(): void

  componentDidUpdate(
    prevProps: Readonly<ReactQueryListProps<T>>,
    prevState: Readonly<ReactQueryListState<T>>,
    snapshot?: any,
  ): void

  render(): JSX.Element
}

export default ReactQueryList
export { ReactQueryListProps, ReactQueryListState }
