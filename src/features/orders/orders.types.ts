/**
 * @file orders.types.ts
 * @description Tipos específicos da feature de pedidos
 */

import type { Order } from '../../store/types';

/**
 * Dados estruturados de um pedido para exibição em card
 */
export interface OrderCardData {
  id: string;
  number: number;
  status: Order['status'];
  totalAmount: number;
  itemCount: number;
  openedAt: string;
  lastUpdatedAt: string | null;
  formattedTime: string;
}

/**
 * Dados para formulário de novo pedido
 */
export interface OrderFormData {
  items: OrderItem[];
  notes?: string;
  customerName?: string;
}

/**
 * Item individual em um pedido
 */
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  notes?: string;
}

/**
 * Status disponíveis para pedidos
 */
export type OrderStatus = 'open' | 'closed' | 'cancelled';

/**
 * Opções de status com labels semânticos
 */
export const ORDER_STATUS_OPTIONS: Array<{
  label: string;
  value: OrderStatus;
  icon: string;
}> = [
  { label: 'Aberto', value: 'open', icon: '🟢' },
  { label: 'Finalizado', value: 'closed', icon: '✅' },
  { label: 'Cancelado', value: 'cancelled', icon: '❌' },
];

/**
 * Mapeamento de status para display
 */
export const ORDER_STATUS_DISPLAY: Record<
  OrderStatus,
  { label: string; icon: string; color: string }
> = {
  open: {
    label: 'Aberto',
    icon: '🟢',
    color: '#28A44A',
  },
  closed: {
    label: 'Finalizado',
    icon: '✅',
    color: '#666666',
  },
  cancelled: {
    label: 'Cancelado',
    icon: '❌',
    color: '#E03030',
  },
};

/**
 * Estado da lista de pedidos
 */
export interface OrderListState {
  orders: OrderCardData[];
  selectedOrderId: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Resposta da API para criar/atualizar pedido
 */
export interface OrderApiResponse {
  id: string;
  tableId?: string;
  number: number;
  status: OrderStatus;
  totalAmount: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
  notes?: string;
  openedAt: string;
  closedAt?: string | null;
  lastOrderAt?: string | null;
}
