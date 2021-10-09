import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type DefaultValues = {
	[key: string]: any;
};

export const useZodForm = (schema: z.ZodRawShape, defaultValues?: DefaultValues) => {
	const formSchema = z.object(schema);

	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors },
		getValues,
		setValue,
		setError,
	} = useForm({
		defaultValues,
		resolver: zodResolver(formSchema),
	});

	return {
		register,
		trigger,
		handleSubmit,
		errors,
		getValues,
		setValue,
		setError,
	};
};
