import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMe, login } from "../lib/api/auth";
import { queryKeys } from "../lib/queryKeys";
import type { LoginForm } from "../types/auth";
import { useAuth } from "./useAuth";

export function useMe() {
  const { token } = useAuth();
  return useQuery({ queryKey: queryKeys.auth.me, queryFn: fetchMe, enabled: token !== null });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const { signIn } = useAuth();
  return useMutation({
    mutationFn: (form: LoginForm) => login(form),
    onSuccess: ({ access_token, user, shop }) => {
      queryClient.setQueryData(queryKeys.auth.me, { user, shop });
      signIn(access_token);
    },
  });
}
