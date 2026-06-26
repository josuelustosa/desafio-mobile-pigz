/**
 * @file tables.types.ts
 * @description Tipos específicos da feature de mesas
 */

import type { Table, FilterType } from '../../store/types';

/**
 * Dados estruturados de uma mesa para exibição em card
 */
export interface TableCardData {
  id: string;
  number: number;
  clientName: string | null;
  status: Table['status'];
  orderCount: number;
  totalValue: number;
  timeSinceLastOrder: number | null;
  attendantName: string | null;
}

/**
 * Estado da tela de mapa de mesas
 */
export interface TableMapState {
  tables: TableCardData[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
}

/**
 * Filtros disponíveis para mesas
 */
export const FILTER_OPTIONS: Array<{ label: string; value: FilterType }> = [
  { label: 'Visão geral', value: 'all' },
  { label: 'Em atendimento', value: 'active' },
  { label: 'Aguardando Retorno', value: 'waiting' },
  { label: 'Ocupadas', value: 'occupied' },
  { label: 'Ociosas', value: 'idle' },
  { label: 'Disponíveis', value: 'available' },
];

/**
 * Mapeamento de status para display
 */
export const STATUS_DISPLAY: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  active: {
    label: 'Em atendimento',
    icon: '🟢',
    color: '#28A44A',
  },
  waiting: {
    label: 'Aguardando',
    icon: '🔴',
    color: '#E03030',
  },
  idle: {
    label: 'Ociosa',
    icon: '🟡',
    color: '#E6A817',
  },
  available: {
    label: 'Disponível',
    icon: '⚪',
    color: '#787872',
  },
};
