import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Message {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8080/api/' 
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], void>({
      query: () => 'messages',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation<Message, { content: string }>({
      query: (body) => ({
        url: 'messages',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Messages'],
    }),
    updateMessage: builder.mutation<Message, { id: number; content: string }>({
      query: ({ id, ...body }) => ({
        url: `messages/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Messages'],
    }),
    deleteMessage: builder.mutation<void, number>({
      query: (id) => ({
        url: `messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;