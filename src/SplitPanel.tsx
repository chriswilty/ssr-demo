import {
	type FC,
	type KeyboardEvent,
	type ReactNode,
	useCallback,
	useEffect,
	useEffectEvent,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

type SplitPanelProps = {
	one: ReactNode;
	two: ReactNode;
};

const SplitPanel: FC<SplitPanelProps> = ({ one, two }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [dragging, setDragging] = useState(false);
	const [position, setPosition] = useState(0);

	const onMouseDown = useCallback(() => setDragging(true), []);

	const onKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === 'ArrowUp') {
			const jump = event.shiftKey ? 50 : 10;
			setPosition((pos) => Math.max(0, pos - jump));
		} else if (event.key === 'ArrowDown') {
			const bounds = containerRef.current?.getBoundingClientRect();
			const jump = event.shiftKey ? 50 : 10;
			if (bounds) setPosition((pos) => Math.min(bounds.height, pos + jump));
		}
	}, []);

	const setInitialPosition = useEffectEvent(setPosition);
	useLayoutEffect(() => {
		const bounds = containerRef.current?.getBoundingClientRect();
		if (bounds) {
			setInitialPosition(0.5 * bounds.height);
		}
	}, []);

	useEffect(() => {
		const onMouseUp = () => setDragging(false);
		const onMouseMove = (event: MouseEvent) => {
			if (dragging) {
				const bounds = containerRef.current?.getBoundingClientRect();
				if (bounds) {
					// Constrain y to container bounds
					const y = Math.min(Math.max(event.clientY, bounds.y), bounds.y + bounds.height);
					setPosition(y - bounds.y);
				}
			}
		};

		if (dragging) {
			window.addEventListener('mousemove', onMouseMove);
			window.addEventListener('mouseup', onMouseUp);
		}
		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
		};
	}, [dragging]);

	return (
		<div
			ref={containerRef}
			css={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'stretch',
				justifyContent: 'stretch',
				height: '100%',
				overflow: 'hidden',
				cursor: dragging ? 'row-resize' : 'default',
			}}
		>
			<div
				css={{
					display: 'flex',
					width: '100%',
					height: position,
					paddingBottom: '0.5rem',
					overflow: 'hidden',
				}}
			>
				{one}
			</div>
			<button
				type="button"
				onMouseDown={onMouseDown}
				onKeyDown={onKeyDown}
				css={{
					height: '0.5rem',
					border: 'none',
					color: 'transparent',
					fontSize: 0,
					cursor: 'row-resize',
				}}
			>
				drag or arrow up/down to resize panels
			</button>
			<div
				css={{
					display: 'flex',
					width: '100%',
					paddingTop: '0.5rem',
					flex: 1,
					overflow: 'hidden',
				}}
			>
				{two}
			</div>
		</div>
	);
};

export default SplitPanel;
