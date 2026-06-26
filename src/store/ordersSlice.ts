/**
 * @file ordersSlice.ts
 * @description Redux slice para gerenciamento de pedidos.
 *
 * Gerencia o estado de pedidos de uma mesa, incluindo criação,
 * atualização e remoção. As operações são otimistas localmente
 * e confirmadas via service.
 */

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { Order, OrdersState, RequestStatus } from './types';

type OrdersThunkConfig = {
  rejectValue: string;
};

export interface CreateOrderParams {
  tableId: string;
  items: Array<{ name: string; quantity: number; unitPrice: number }>;
  notes?: string;
}

export interface UpdateOrderParams {
  orderId: string;
  status?: 'open' | 'closed' | 'cancelled';
  items?: Array<{ name: string; quantity: number; unitPrice: number }>;
  notes?: string;
}

// ---------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------

export const createOrder = createAsyncThunk<
  Order,
  CreateOrderParams,
  OrdersThunkConfig
>('orders/createOrder', async (params, { rejectWithValue }) => {
  try {
    const totalAmount = params.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );

    const newOrder: Order = {
      id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      number: Math.floor(Math.random() * 900) + 100,
      totalAmount,
      status: 'open',
      openedAt: new Date().toISOString(),
      lastOrderAt: new Date().toISOString(),
    };

    return newOrder;
  } catch {
    return rejectWithValue('Erro ao criar pedido.');
  }
});

export const updateOrderStatus = createAsyncThunk<
  { orderId: string; status: 'open' | 'closed' | 'cancelled' },
  UpdateOrderParams,
  OrdersThunkConfig
>('orders/updateOrderStatus', async (params, { rejectWithValue }) => {
  try {
    if (!params.status) {
      return rejectWithValue('Status não informado.');
    }

    return { orderId: params.orderId, status: params.status };
  } catch {
    return rejectWithValue('Erro ao atualizar pedido.');
  }
});

export const deleteOrder = createAsyncThunk<string, string, OrdersThunkConfig>(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      return orderId;
    } catch {
      return rejectWithValue('Erro ao remover pedido.');
    }
  },
);

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const initialState: OrdersState = {
  items: [],
  selectedOrderId: null,
  status: 'idle',
  error: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSelectedOrder(state, action: PayloadAction<string | null>) {
      state.selectedOrderId = action.payload;
    },
    setOrdersStatus(state, action: PayloadAction<RequestStatus>) {
      state.status = action.payload;
    },
    clearOrders() {
      return initialState;
    },
    loadOrdersForTable(state, action: PayloadAction<Order[]>) {
      state.items = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // createOrder
      .addCase(createOrder.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Erro desconhecido.';
      })

      // updateOrderStatus
      .addCase(updateOrderStatus.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const order = state.items.find(o => o.id === action.payload.orderId);
        if (order) {
          order.status = action.payload.status;
        }
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Erro desconhecido.';
      })

      // deleteOrder
      .addCase(deleteOrder.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter(o => o.id !== action.payload);
        if (state.selectedOrderId === action.payload) {
          state.selectedOrderId = null;
        }
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Erro desconhecido.';
      });
  },
});

export const {
  setSelectedOrder,
  setOrdersStatus,
  clearOrders,
  loadOrdersForTable,
} = ordersSlice.actions;

// ---------------------------------------------------------------------------
// Seletores
// ---------------------------------------------------------------------------

export const selectAllOrders = (state: { orders: OrdersState }) =>
  state.orders.items;

export const selectOrdersLoading = (state: { orders: OrdersState }) =>
  state.orders.status === 'loading';

export const selectOrdersError = (state: { orders: OrdersState }) =>
  state.orders.error;

export const selectSelectedOrderId = (state: { orders: OrdersState }) =>
  state.orders.selectedOrderId;

export const selectOrderById =
  (id: string) => (state: { orders: OrdersState }) =>
    state.orders.items.find(order => order.id === id);

export const selectOpenOrders = (state: { orders: OrdersState }) =>
  state.orders.items.filter(order => order.status === 'open');

export const selectOrdersTotalValue = (state: { orders: OrdersState }) =>
  state.orders.items
    .filter(order => order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.totalAmount, 0);

export default ordersSlice.reducer;
