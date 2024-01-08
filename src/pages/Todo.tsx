import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { getTodos, postTodos } from "../api/todos";

const Todo: React.FC = () => {
	const [value, setValue] = useState(1);

	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: ["todos", value],
		queryFn: (query) => getTodos(value, query),
	});

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
			<ul>
				{query.data &&
					query.data?.length &&
					query.data?.map((todo) => <li key={todo.value}>{todo.label}</li>)}
			</ul>

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
