import type { EffectCallback } from 'react';
import { useEffect } from 'react';

export default function useMount(callback: EffectCallback): void {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(callback, []);
}
