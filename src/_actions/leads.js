import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createItem, getItems, updateItem } from './api';

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

export const useUpdateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => updateItem(COLLECTION, id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [COLLECTION] }),
  });
};
