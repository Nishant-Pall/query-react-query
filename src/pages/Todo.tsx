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
		// These are exectue first
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
		onMutate: (variables) => {
			return { id: 1 };
		},
		onError: (error, variables, context) => {
			console.log(`roll back with id ${context.id}`);
		},
		onSettled: () => {
			console.log("settled no matter what");
		},
	});

	if (query.isFetching) return <div>Loading....</div>;

	if (query.isError) return <div>Error: {query.error.message}</div>;

	const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		mutation.mutate(
			{ value: String(Date.now()), label: "Do Laundry" },
			// These are executed second
			{
				onSuccess: () => {},
			}
		);
	};

	return (
		<div>
			<ul>
				{query.data &&
					query.data?.length &&
					query.data?.map((todo) => <li key={todo.value}>{todo.label}</li>)}
			</ul>

			<button onClick={onClick}>Add Todo</button>
		</div>
	);
};

export default Todo;
