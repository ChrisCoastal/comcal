import { CSSProperties } from 'react';
import { Column } from '@tanstack/react-table';

// Centralized styles to support sticky column pinning for TanStack Table.
// Generic over TData so callers don't need to import row types here.
export function getCommonPinningStyles<TData>(
  column: Column<TData>
): CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px rgba(0, 0, 0, 0.1) inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px rgba(0, 0, 0, 0.1) inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getStart('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    minWidth: column.getSize(),
    maxWidth: column.getSize(),
    zIndex: isPinned ? 2 : 0,
  };
}
