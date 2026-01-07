import { css } from '@emotion/react';
import {
	type FC,
	type ReactElement,
	useEffect,
	useEffectEvent,
	useId,
	useRef,
	useState,
} from 'react';

const tabListCss = css({
	display: 'flex',
	gap: '0.25em',
});

const tabCss = css({
	display: 'inline-block',
	marginBottom: '0.25rem',
	border: '0.125rem solid #999999',
	borderTopLeftRadius: '0.25rem',
	borderTopRightRadius: '0.25rem',
	padding: '0.5rem 1rem',
	outline: 'none',
	fontSize: '1rem',
	fontWeight: 'bold',
	backgroundColor: 'var(--backgroundColorSecondary)',
	'&[aria-selected="true"]': {
		marginBottom: '-0.125rem',
		borderTopWidth: '0.25rem',
		borderBottomColor: 'var(--backgroundColorMain)',
		paddingTop: '0.25rem',
		paddingBottom: '0.75rem',
		backgroundColor: 'transparent',
	},
});

const tabNameCss = css({
	display: 'inline-block',
	padding: '0.25rem',
	'button:hover &, button:focus-visible &, button:active &': {
		outlineWidth: '0.125rem',
		outlineStyle: 'solid',
		outlineColor: '#3366cc',
		borderRadius: '0.125rem',
	},
});

const tabPanelCss = css({
	minHeight: '10rem',
	maxHeight: '15rem',
	border: '2px solid #999999',
	overflow: 'auto',
});

type TabProps = {
	tabName: string;
	tabId: string;
	panelId: string;
	isFocused: boolean;
	isActive: boolean;
	setActive: (name: string) => void;
	setFocused: (name: string) => void;
};

const Tab: FC<TabProps> = ({
	tabName,
	tabId,
	panelId,
	isActive,
	isFocused,
	setActive,
	setFocused,
}) => {
	const tabRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (isFocused) tabRef.current?.focus();
	}, [isFocused]);

	return (
		<button
			ref={tabRef}
			id={tabId}
			type="button"
			role="tab"
			aria-controls={panelId}
			aria-selected={isActive}
			tabIndex={isActive ? undefined : -1}
			onClick={() => setActive(tabName)}
			onFocus={() => setFocused(tabName)}
			css={tabCss}
		>
			<span css={tabNameCss}>{tabName}</span>
		</button>
	);
};

type TabsProps = {
	tabs: Record<string, ReactElement>;
};

const Tabs: FC<TabsProps> = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0]);
	const [focusedTab, setFocusedTab] = useState<string>();
	const baseTabId = useId();
	const basePanelId = useId();

	const keyHandler = useEffectEvent((event: KeyboardEvent) => {
		if (!focusedTab) return;
		if (event.key === 'ArrowLeft') {
			const currentIndex = Object.keys(tabs).findIndex((name) => name === focusedTab);
			setFocusedTab(Object.keys(tabs).at(currentIndex - 1));
		} else if (event.key === 'ArrowRight') {
			const currentIndex = Object.keys(tabs).findIndex((name) => name === focusedTab);
			setFocusedTab(Object.keys(tabs).at(currentIndex + 1 - Object.keys(tabs).length));
		} else if (event.key === 'Enter' || event.key === ' ') {
			setActiveTab(focusedTab);
		} else if (event.key === 'Tab') {
			setFocusedTab(undefined);
		}
	});

	useEffect(() => {
		window.addEventListener('keydown', keyHandler);
		return () => window.removeEventListener('keydown', keyHandler);
	}, []);

	return (
		<div css={{ padding: '0.25rem' }}>
			<div role="tablist" aria-label="my demo tabs" css={tabListCss}>
				{Object.keys(tabs).map((tabName, idx) => {
					const isActiveTab = activeTab === tabName;
					const isFocusedTab = focusedTab === tabName;
					return (
						<Tab
							key={tabName}
							tabName={tabName}
							tabId={`${baseTabId}_${idx}`}
							panelId={`${basePanelId}_${idx}`}
							isFocused={isFocusedTab}
							isActive={isActiveTab}
							setActive={setActiveTab}
							setFocused={setFocusedTab}
						/>
					);
				})}
			</div>
			{Object.entries(tabs).map(([tabName, content], idx) => (
				<div
					key={tabName}
					id={`${basePanelId}_${idx}`}
					role="tabpanel"
					aria-labelledby={`${baseTabId}_${idx}`}
					css={tabPanelCss}
					style={{ display: tabName === activeTab ? 'block' : 'none' }}
					tabIndex={tabName === activeTab ? 0 : -1}
				>
					{content}
				</div>
			))}
		</div>
	);
};

export default Tabs;
