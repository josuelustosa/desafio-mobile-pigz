/**
 * @file tables.utils.ts
 * @description Utilitários para a feature de mesas
 */

import type { Table } from '../../store/types';
import type { TableCardData } from './tables.types';

/**
 * Converte um Table do Redux em TableCardData para exibição
 */
export const mapTableToCardData = (table: Table): TableCardData => ({
  id: table.id,
  number: table.number,
  clientName: table.clientName,
  status: table.status,
  orderCount: table.orders.length,
  totalValue: table.orders.reduce((sum, order) => sum + order.totalAmount, 0),
  timeSinceLastOrder: table.minutesSinceLastOrder,
  attendantName: table.attendantName,
});

/**
 * Calcula a cor de fundo do card baseado no status
 */
export const getTableCardBackgroundColor = (
  status: Table['status'],
  colors: any,
): string => {
  const statusColors = colors.tableStatus;
  return (
    statusColors[status as keyof typeof statusColors]?.background ||
    colors.surface.default
  );
};

/**
 * Formata o tempo desde o último pedido para exibição
 */
export const formatTimeSinceLastOrder = (minutes: number | null): string => {
  if (!minutes || minutes <= 0) return '';
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins > 0 ? mins + 'min' : ''}`.trim();
};

/**
 * Formata valor monetário em Real
 */
export const formatCurrency = (value: number): string => {
  return `R$${value.toFixed(2)}`;
};

/**
 * Verifica se a mesa atende aos critérios de filtro
 */
export const matchesFilter = (table: Table, filter: string): boolean => {
  if (filter === 'all') return true;
  if (filter === 'active') return table.status === 'active';
  if (filter === 'waiting') return table.status === 'waiting';
  if (filter === 'occupied') {
    return table.status === 'active' || table.status === 'waiting' || table.status === 'idle';
  }
  if (filter === 'idle') return table.status === 'idle';
  if (filter === 'available') return table.status === 'available';
  return false;
};

/**
 * Formata nome do cliente com fallback
 */
export const formatClientName = (clientName: string | null): string => {
  return clientName && clientName.trim() ? clientName : 'Sem cliente';
};
