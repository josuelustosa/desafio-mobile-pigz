import type { FilterType, TablesApiResponse } from '../store/types';

import { apiClient } from './api.config';

const DEFAULT_TABLES_PAGE = 1;
const DEFAULT_TABLES_PER_PAGE = 20;

export interface GetTablesParams {
  page?: number;
  perPage?: number;
  filter?: FilterType;
  query?: string;
}

export const getTables = async (
  params: GetTablesParams = {},
): Promise<TablesApiResponse> => {
  const response = await apiClient.get<TablesApiResponse>('/tables', {
    params: {
      page: params.page ?? DEFAULT_TABLES_PAGE,
      perPage: params.perPage ?? DEFAULT_TABLES_PER_PAGE,
      filter: params.filter ?? 'all',
      query: params.query ?? '',
    },
  });

  return response.data;
};

export const tablesService = {
  getTables,
};
