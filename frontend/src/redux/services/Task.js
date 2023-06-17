import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TodoAPI = createApi({
  reducerPath: "TodoAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodo: builder.query({
      query: () => "/todo",
      providesTags: ["todo"],
    }),
    getTodoById: builder.query({
      query: (id) => `/todo/edit/${id}`,
      providesTags: ["todo"],
    }),
    addTodo: builder.mutation({
      query: (formData) => ({
        url: "/todo/new",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["todo"],
    }),
    editTodo: builder.mutation({
      query: ({ id, body }) => ({
        url: `/todo/edit/${id}`,
        method: "PUT",
        headers: { "content-type": "application/json" },
        body,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/todo/${id}/delete`,
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useGetTodoQuery,
  useGetTodoByIdQuery,
} = TodoAPI;
