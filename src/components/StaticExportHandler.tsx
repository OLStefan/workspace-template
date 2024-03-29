'use client';

import useMount from '@/hooks/useMount';
import type { IAnyType, Instance, SnapshotIn } from 'mobx-state-tree';
import type { ReactNode } from 'react';
import { createContext, useState } from 'react';
import type { ReadonlyDeep } from 'type-fest';

export interface StaticExportProviderHandlerProps<TModel extends IAnyType> {
	initialValue: SnapshotIn<TModel> | null;
	loadFunction: (
		executedOnClient: boolean,
	) => Promise<SnapshotIn<TModel> | null>;
	children: ReactNode;
	model: TModel;
}
export function StaticExportProviderHandler<TModel extends IAnyType>({
	initialValue,
	loadFunction,
	children,
	model,
}: ReadonlyDeep<StaticExportProviderHandlerProps<TModel>>): ReactNode {
	const [context] = useState(() =>
		createContext<Instance<TModel | null>>(null),
	);
	const value = useLoadedValue({ initialValue, loadFunction });

	if (value === null) {
		return null;
	}

	const instance = model.create(value) as Instance<TModel>;

	return <context.Provider value={instance}>{children}</context.Provider>;
}

function useLoadedValue<TModel extends IAnyType>({
	initialValue,
	loadFunction,
}: Pick<
	ReadonlyDeep<StaticExportProviderHandlerProps<TModel>>,
	'initialValue' | 'loadFunction'
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
