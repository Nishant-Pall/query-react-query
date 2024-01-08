import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getTodos, postTodos } from "../api/todos";

const Todo: React.FC = () => {
	const queryClient = useQueryClient();

	const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });

	const mutation = useMutation({
		mutationFn: postTodos,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	if (query.isFetching) return <div>Loading....</div>;

	if (query.isError) return <div>Error: {query.error.message}</div>;

	return (
		<div>
			<ul>{query.data?.length && query.data?.map((todo) => <li key={todo.value}>{todo.label}</li>)}</ul>

			<button
				onClick={() => {
					mutation.mutate({ value: String(Date.now()), label: "Do Laundry" });
				}}
			>
				Add Todo
			</button>
		</div>
	);
};

export default Todo;
