import { useMemo } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { CommunicationEntry, Category } from '@/types';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { categoryColors, statusColors } from '@/lib/constants';

const columnHelper = createColumnHelper<CommunicationEntry>();

export function useEntriesColumns(): ColumnDef<CommunicationEntry>[] {
  return useMemo(
    () =>
      [
        columnHelper.accessor('title', {
          header: 'Title',
          cell: ({ row }) => (
            <div
              className='font-medium line-clamp-2 break-words'
              style={{
                maxWidth: '100%',
                width: '100%',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                boxSizing: 'border-box',
                paddingRight: '8px',
              }}
            >
              {row.getValue('title')}
            </div>
          ),
          size: 200,
          minSize: 200,
          maxSize: 200,
          enablePinning: true,
        }),
        columnHelper.accessor('summary', {
          header: 'Description',
          cell: ({ row }) => (
            <div className='text-sm text-muted-foreground line-clamp-2 max-w-xs'>
              {row.getValue('summary')}
            </div>
          ),
          size: 300,
          minSize: 250,
        }),
        columnHelper.accessor(row => row.category, {
          id: 'category',
          header: 'Category',
          cell: ({ row }) => {
            const categories = row.original.category;
            return (
              <div className='flex flex-wrap gap-1'>
                {categories.map((category, index) => (
                  <Badge
                    key={index}
                    className={
                      categoryColors[category] ||
                      'bg-neutral-100 text-neutral-800'
                    }
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            );
          },
          filterFn: (row, id, value) => {
            const categories = row.getValue(id) as string[];
            return value.some((filterValue: string) =>
              categories.includes(filterValue)
            );
          },
        }),
        columnHelper.accessor('scheduleStatus', {
          header: 'Status',
          cell: ({ row }) => {
            const status = row.original.scheduleStatus;
            return (
              <Badge
                className={statusColors[status] || 'bg-gray-100 text-gray-800'}
              >
                {status}
              </Badge>
            );
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
        }),
        columnHelper.accessor('startDate', {
          header: 'Start Date',
          cell: ({ row }) => {
            const date = new Date(row.getValue('startDate'));
            return (
              <div className='space-y-1'>
                <div className='font-medium'>{date.toLocaleDateString()}</div>
                <div className='text-sm text-muted-foreground'>
                  {row.original.allDay
                    ? 'All day'
                    : date.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                </div>
              </div>
            );
          },
        }),
        columnHelper.accessor('leadOrganization', {
          header: 'Organization',
          cell: ({ row }) => {
            const org = row.original.leadOrganization;
            return <span className='capitalize'>{org}</span>;
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
        }),
        columnHelper.accessor('commsContact', {
          header: 'Contact',
          cell: ({ row }) => {
            const contact = row.original.commsContact;
            return (
              <div className='space-y-1'>
                <div className='font-medium'>
                  {contact.firstname} {contact.lastname}
                </div>
                <div className='text-sm text-muted-foreground'>
                  {contact.email}
                </div>
              </div>
            );
          },
        }),
        columnHelper.accessor('issue', {
          header: 'Issue',
          cell: ({ row }) => {
            const isIssue = row.original.issue;
            return isIssue ? (
              <div className='flex items-center gap-1 text-red-600'>
                <AlertCircle className='h-4 w-4' />
                <span className='text-sm font-medium'>High Priority</span>
              </div>
            ) : null;
          },
          filterFn: (row, id, value) => {
            if (value === 'all') return true;
            return row.getValue(id) === (value === 'true');
          },
        }),
      ] as ColumnDef<CommunicationEntry>[],
    []
  );
}
