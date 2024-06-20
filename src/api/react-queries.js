import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

//get users
export function useGetUsers() {
  return useInfiniteQuery({
    queryKey: ["getUsers"],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get(
          `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${pageParam}&count=6`
        )
        .then((res) => res.data),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.links.next_url ? lastPage.page + 1 : undefined;
      console.log(nextPage);
      return nextPage;
    },
  });
}

//get positions
export function useGetPositions() {
  return useQuery({
    queryKey: ["getPositions"],
    queryFn: () =>
      axios
        .get("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
        .then((res) => res.data),
  });
}

//get token
const fetchToken = async () => {
  const response = await fetch(
    "https://frontend-test-assignment-api.abz.agency/api/v1/token"
  );
  const data = await response.json();
  return data.token;
};

//upload user
export const useUploadUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      const token = await fetchToken();

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("position_id", userData.position_id);
      formData.append("photo", userData.photo);

      const response = await axios.post(
        "https://frontend-test-assignment-api.abz.agency/api/v1/users",
        formData,
        {
          headers: {
            Token: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getUsers");
    },
  });
};
