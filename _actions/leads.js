import { useMutation } from '@tanstack/react-query';
import { createItem } from './api';

const COLLECTION = 'qcrm_leads';

export const useCreateLead = () => {
  return useMutation((data) => createItem(COLLECTION, data));
};
