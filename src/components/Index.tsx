import React, { PureComponent } from 'react'
import { ReactQueryListProps, ReactQueryListState } from '../utils/types'
import ReactPagination, { PaginationProps } from '@livelybone/react-pagination'
import { isPaginationPropsDiff } from '../utils/utils'
import ReactLoading from '@auraxy/react-loading'

const DefaultPaginationProps: PaginationProps = {
  pageSize: 10,
  pageIndex: 1,
}

export default class ReactQueryList<T extends any> extends PureComponent<
  ReactQueryListProps<T>,
  ReactQueryListState<T>
> {
  paginationRef!: ReactPagination

  constructor(props: ReactQueryListProps<T>) {
    super(props)
    this.state = {
      $paginationProps: { ...DefaultPaginationProps, ...props.paginationProps },
      loading: false,
      error: '',
      list: [],
    }
  }

  query(reset?: boolean) {
    /**
     * 当请求处理时间 < 200ms 时不显示 loading
     * loading 显示时间至少为 500ms，不然看起来像闪屏
     *
     * Loading component should not displayed when the request processing time is < 200ms
     * Loading component should displayed at least 500ms, otherwise it will look like a flash screen
     * */
    let pro: Promise<void>
    const timer = setTimeout(() => {
      this.setState({ loading: true })
      pro = new Promise(res => setTimeout(res, 500))
    }, 200)

    if (reset) this.paginationRef.setPageNumber(1, false)

    return Promise.resolve().then(() => {
      const {
        state: { $currentPageNumber },
        props: { pageSize },
      } = this.paginationRef
      return this.props
        .onQuery({ pageIndex: +$currentPageNumber, pageSize })
        .then(({ pageCount, list }) => {
          this.setState(pre => ({
            $paginationProps: {
              ...pre.$paginationProps,
              pageCount,
              currentPageSize: list.length,
            },
            list,
          }))
        })
        .catch(error => {
          this.setState({ error })
          this.props.onError && this.props.onError(error)
        })
        .then(() => {
          clearTimeout(timer)
          Promise.resolve(pro).then(() => {
            this.setState({ loading: false })
          })
        })
    })
  }

  componentDidMount(): void {
    if (this.props.queryAtMounted) this.query()
  }

  componentDidUpdate(
    prevProps: Readonly<ReactQueryListProps<T>>,
    prevState: Readonly<ReactQueryListState<T>>,
    snapshot?: any,
  ): void {
    if (
      isPaginationPropsDiff(
        prevProps.paginationProps,
        this.props.paginationProps,
      )
    ) {
      this.setState(pre => ({
        $paginationProps: {
          ...pre.$paginationProps,
          ...this.props.paginationProps,
        },
      }))
    }
  }

  render() {
    const { children, className, loadingComp } = this.props
    const { $paginationProps, loading, list, error } = this.state
    const $children =
      // @ts-ignore
      typeof children === 'function' ? children(list, error) : children
    return (
      <div className={`react-query-list${className ? ` ${className}` : ''}`}>
        {loading && (
          <div className="loading-wrapper">
            {!!loadingComp ? loadingComp : <ReactLoading />}
          </div>
        )}
        {$children}
        <ReactPagination
          {...$paginationProps}
          ref={ref => (this.paginationRef = ref!)}
          onPageChange={() => this.query()}
        />
      </div>
    )
  }
}
