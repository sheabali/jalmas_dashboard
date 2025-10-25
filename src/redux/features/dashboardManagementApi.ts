import { baseApi } from "@/redux/api/baseApi";

export const dashboardManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "/dashboard/",
        method: "GET",
      }),
    }),
    getAllUsers: builder.query({
      query: ({
        page,
        limit,
        search,
      }: {
        page: number;
        limit: number;
        search: string;
      }) => ({
        url: `/users/${`?page=${page}&limit=${limit}&searchTerm=${encodeURIComponent(
          search
        )}`}`,
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}/`,
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),
    activeOrDeactiveUser: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/users/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN"],
    }),
    getAllSubscriptions: builder.query({
      query: () => ({
        url: "/plan",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),
    createSubscription: builder.mutation({
      query: (data) => ({
        url: "/plan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ADMIN"],
    }),
    updateSubscription: builder.mutation({
      query: ({ id, data }) => ({
        url: `/plan/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ADMIN"],
    }),

    getUser: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
    }),
    changePasswordAdmin: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: data,
      }),
    }),

    analyticsFeedback: builder.query({
      query: ({
        search,
        page,
        limit,
      }: {
        search: string;
        page: number;
        limit: number;
      }) => ({
        url: `/analytics/feedback/${`?searchTerm=${encodeURIComponent(
          search
        )}&page=${page}&limit=${limit}`}`,
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useActiveOrDeactiveUserMutation,
  useGetAllSubscriptionsQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useGetUserQuery,
  useUpdateUserProfileMutation,
  useChangePasswordAdminMutation,
  useAnalyticsFeedbackQuery,
} = dashboardManagementApi;
