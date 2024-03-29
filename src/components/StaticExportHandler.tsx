'use client';

import useMount from '@/hooks/useMount';
import { IAnyType, Instance, SnapshotIn } from 'mobx-state-tree';
import { Context, ReactNode, useState } from 'react';

export interface StaticExportProviderHandlerProps<TModel extends IAnyType> {
	context: Context<Instance<TModel>>;
	initialValue: SnapshotIn<TModel> | null;
	loadFunction: (
		executedOnClient: boolean,
	) => Promise<SnapshotIn<TModel> | null>;
	children: ReactNode;
	model: TModel;
}
export function StaticExportProviderHandler<TModel extends IAnyType>({
	context,
	initialValue,
	loadFunction,
	children,
	model,
}: StaticExportProviderHandlerProps<TModel>) {
	const value = useLoadedValue({ initialValue, loadFunction });

	if (value === null) {
		return null;
	}

	const instance = model.create(value);

	return <context.Provider value={instance}>{children}</context.Provider>;
}

function useLoadedValue<TModel extends IAnyType>({
	initialValue,
	loadFunction,
}: Pick<
	StaticExportProviderHandlerProps<TModel>,
	'loadFunction' | 'initialValue'
>): SnapshotIn<TModel> | null {
	const [value, setValue] = useState(initialValue);

	useMount(() => {
		if (initialValue === null) {
			loadFunction(true)
				.then((v) => {
					setValue(v);
				})
				.catch((error) => void error);
		}
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return value;
}
