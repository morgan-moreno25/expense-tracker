import { DeepPartial, UnpackNestedValue, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export function useZodForm<T>(schema: z.ZodRawShape, defaultValues: T) {
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
		defaultValues: defaultValues as UnpackNestedValue<DeepPartial<T>>,
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
}
