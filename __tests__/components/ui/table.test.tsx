import { render, screen } from '@testing-library/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

describe('Table Components', () => {
  describe('Table', () => {
    it('renders with default props', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(table).toHaveClass('w-full caption-bottom text-sm');
    });
  });

  describe('TableHeader', () => {
    it('renders with default props', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

      const header = screen.getByRole('columnheader');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
      );
    });
  });

  describe('TableBody', () => {
    it('renders with default props', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const body = screen.getByRole('rowgroup');
      expect(body).toBeInTheDocument();
      expect(body).toHaveClass('[&_tr:last-child]:border-0');
    });
  });

  describe('TableRow', () => {
    it('renders with default props', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const row = screen.getByRole('row');
      expect(row).toBeInTheDocument();
      expect(row).toHaveClass('border-b transition-colors hover:bg-muted/50');
    });
  });

  describe('TableCell', () => {
    it('renders with default props', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const cell = screen.getByRole('cell');
      expect(cell).toBeInTheDocument();
      expect(cell).toHaveClass(
        'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
      );
    });
  });

  describe('Complete Table Structure', () => {
    it('renders a complete table with headers and data', () => {
      const mockData = [
        { id: 1, name: 'John', email: 'john@example.com' },
        { id: 2, name: 'Jane', email: 'jane@example.com' },
      ];

      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );

      expect(
        screen.getByRole('columnheader', { name: 'Name' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('columnheader', { name: 'Email' })
      ).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'John' })).toBeInTheDocument();
      expect(
        screen.getByRole('cell', { name: 'john@example.com' })
      ).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: 'Jane' })).toBeInTheDocument();
      expect(
        screen.getByRole('cell', { name: 'jane@example.com' })
      ).toBeInTheDocument();
    });
  });
});
