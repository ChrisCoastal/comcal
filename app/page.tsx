'use client';

import { useState, useEffect } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { getEntries } from '@/app/actions/entries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar, Search, Plus } from 'lucide-react';
import { getCommonPinningStyles } from '@/lib/tablePinning';
import { useEntriesColumns } from '@/columns/entriesColumns';
import { categoryOptions, statusOptions } from '@/lib/constants';
import { CommunicationEntry } from '@/lib/types';

export default function EntriesList() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [entries, setEntries] = useState<CommunicationEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = useEntriesColumns();

  // Fetch entries on component mount
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setIsLoading(true);
        const data = await getEntries();
        setEntries(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching entries:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to fetch entries'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const table = useReactTable({
    data: entries,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    enableColumnPinning: true,
    initialState: {
      columnPinning: {
        left: ['title'], // Pin the title column to the left
      },
    },
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center space-x-4'>
              <h1 className='text-2xl font-bold text-gray-900'>Scheduler</h1>
              <div className='hidden sm:flex items-center space-x-2 text-sm text-gray-500'>
                <Calendar className='h-4 w-4' />
                <span>Event & Communications Management</span>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <Button variant='outline' size='sm' asChild>
                <a href='/calendar'>
                  <Calendar className='h-4 w-4 mr-2' />
                  Calendar View
                </a>
              </Button>
              <Button size='sm' asChild>
                <a href='/newentry'>
                  <Plus className='h-4 w-4 mr-2' />
                  New Entry
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Filters */}
        <Card className='mb-6'>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {/* Search */}
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Search</label>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                  <Input
                    placeholder='Search entries...'
                    value={globalFilter}
                    onChange={e => setGlobalFilter(e.target.value)}
                    className='pl-10'
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Category</label>
                <Select
                  value={
                    Array.isArray(table.getColumn('category')?.getFilterValue())
                      ? (
                          table
                            .getColumn('category')
                            ?.getFilterValue() as string[]
                        )[0]
                      : 'all'
                  }
                  onValueChange={value => {
                    if (value === 'all') {
                      table.getColumn('category')?.setFilterValue(undefined);
                    } else {
                      table.getColumn('category')?.setFilterValue([value]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='All categories' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All categories</SelectItem>
                    {categoryOptions.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Status</label>
                <Select
                  value={
                    Array.isArray(
                      table.getColumn('scheduleStatus')?.getFilterValue()
                    )
                      ? (
                          table
                            .getColumn('scheduleStatus')
                            ?.getFilterValue() as string[]
                        )[0]
                      : 'all'
                  }
                  onValueChange={value => {
                    if (value === 'all') {
                      table
                        .getColumn('scheduleStatus')
                        ?.setFilterValue(undefined);
                    } else {
                      table
                        .getColumn('scheduleStatus')
                        ?.setFilterValue([value]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='All statuses' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All statuses</SelectItem>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Issue Filter */}
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Priority</label>
                <Select
                  value={
                    (table.getColumn('issue')?.getFilterValue() as string) ||
                    'all'
                  }
                  onValueChange={value => {
                    if (value === 'all') {
                      table.getColumn('issue')?.setFilterValue(undefined);
                    } else {
                      table.getColumn('issue')?.setFilterValue(value);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='All priorities' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All priorities</SelectItem>
                    <SelectItem value='true'>High Priority Only</SelectItem>
                    <SelectItem value='false'>Normal Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className='p-0'>
            <div className='overflow-x-auto'>
              <Table style={{ width: table.getTotalSize() }}>
                <TableHeader>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableHead
                          key={header.id}
                          className='whitespace-nowrap'
                          style={{
                            ...getCommonPinningStyles(header.column),
                            backgroundColor: 'white',
                            borderBottom: '1px solid #e5e7eb',
                            fontWeight: 'bold',
                            height: '40px',
                            padding: '8px 12px',
                            textAlign: 'left',
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className='h-24 text-center'
                      >
                        Loading entries...
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className='h-24 text-center text-red-600'
                      >
                        Error: {error}
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map(row => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        className='cursor-pointer hover:bg-gray-50 group'
                        onClick={() => {
                          // TODO: Navigate to entry detail page
                          console.log('Navigate to entry:', row.original.id);
                        }}
                      >
                        {row.getVisibleCells().map(cell => (
                          <TableCell
                            key={cell.id}
                            className='py-4'
                            style={{
                              ...getCommonPinningStyles(cell.column),
                              backgroundColor: 'white',
                              padding: '12px',
                              borderBottom: '1px solid #e5e7eb',
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className='h-24 text-center'
                      >
                        No entries found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className='flex items-center justify-between space-x-2 py-4'>
          <div className='text-sm text-muted-foreground'>
            Showing{' '}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{' '}
            to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} entries
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
