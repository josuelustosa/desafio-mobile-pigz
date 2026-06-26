/**
 * @file orders.utils.ts
 * @description Utilitários para a feature de pedidos
 */

import type { Order } from '../../store/types';
import type { OrderCardData } from './orders.types';

/**
 * Converte um Order do Redux em OrderCardData para exibição
 */
export const mapOrderToCardData = (order: Order): OrderCardData => {
  const openedDate = new Date(order.openedAt);
  const now = new Date();
  const diffMs = now.getTime() - openedDate.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  return {
    id: order.id,
    number: order.number,
    status: order.status,
    totalAmount: order.totalAmount,
    itemCount: 0, // Will be calculated from items array if available
    openedAt: order.openedAt,
    lastUpdatedAt: order.lastOrderAt,
    formattedTime: formatTimeSinceOpened(diffMinutes),
  };
};

/**
 * Formata tempo desde abertura do pedido
 */
export const formatTimeSinceOpened = (minutes: number): string => {
  if (minutes < 1) return 'Agora';
  if (minutes < 60) return `${minutes}min atrás`;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours < 24) {
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h atrás`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  return remainingHours > 0
    ? `${days}d ${remainingHours}h atrás`
    : `${days}d atrás`;
};

/**
 * Formata valor monetário em Real
 */
export const formatCurrency = (value: number): string => {
  return `R$${value.toFixed(2)}`;
};

/**
 * Calcula subtotal de um item (quantidade × preço unitário)
 */
export const calculateItemSubtotal = (
  quantity: number,
  unitPrice: number,
): number => {
  return quantity * unitPrice;
};

/**
 * Calcula total de um pedido baseado em items
 */
export const calculateOrderTotal = (
  items: Array<{ quantity: number; unitPrice: number }>,
): number => {
  return items.reduce((total, item) => {
    return total + calculateItemSubtotal(item.quantity, item.unitPrice);
  }, 0);
};

/**
 * Formata status do pedido para exibição
 */
export const formatOrderStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    open: 'Aberto',
    closed: 'Finalizado',
    cancelled: 'Cancelado',
  };

  return statusMap[status] || status;
};

/**
 * Verifica se um pedido pode ser editado (apenas pedidos abertos)
 */
export const isOrderEditable = (status: string): boolean => {
  return status === 'open';
};

/**
 * Valida se há pelo menos um item no pedido
 */
export const isOrderValid = (items: Array<{ quantity: number }>): boolean => {
  return items.length > 0 && items.some(item => item.quantity > 0);
};
