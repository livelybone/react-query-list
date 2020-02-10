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
    this.setState({ loading: true })
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
            loading: false,
          }))
        })
        .catch(error => {
          this.setState({ error, loading: false })
          this.props.onError && this.props.onError(error)
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
