import { useMutation, useQuery } from '@tanstack/react-query';
import { createItem, getItems } from './api';

const COLLECTION = 'qcrm_leads';

export const useCreateLead = () => {
  return useMutation({
    mutationFn: (data) => createItem(COLLECTION, data),
  });
};

export const useGetLeads = () => {
  return useQuery({
    queryKey: [COLLECTION],
    queryFn: () => getItems(COLLECTION),
  });
};
