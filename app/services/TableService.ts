'use client'
import api from '../api';

const getAll = () => {
  return api.get(`/table?limit=50&offset=50`);
};

const update = (id: string, data: any) => {
  return api.put(`/table/${id}`, data);
};

const TableService = {
  getAll,
  update
};

export default TableService;