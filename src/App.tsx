import { css } from '@emotion/react';

import CardLoading from './CardLoading.tsx';
import { demoMenuItems, NavMenu } from './nav-menu';
import SearchBox from './SearchBox';
import SplitPanel from './SplitPanel.tsx';

const Title = () => (
	<h1 css={{ margin: '1rem 0' }}>
		<a href="/" css={{ textDecoration: 'none', color: 'inherit' }}>
			recipease.com
		</a>
	</h1>
);

const headerCss = css({
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	justifyContent: 'space-between',
	padding: '0 2rem',
	backgroundColor: '#101010',
	'@media (prefers-color-scheme: light)': {
		backgroundColor: '#efefef',
	},
});

const mainCss = css({
	flex: 1,
	display: 'flex',
	alignItems: 'stretch',
	gap: '2rem',
	padding: '1rem 2rem',
	overflow: 'hidden',
});

const sidebarCss = css({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem',
	width: '30%',
	minWidth: '15rem',
	overflow: 'auto',
});

const cardCss = css({
	border: '1px solid var(--backgroundColorSecondary)',
	borderRadius: '0.25rem',
});

const contentPanelCss = css({
	width: '70%',
});

const App = () => (
	<>
		<header css={headerCss}>
			<Title />
			<NavMenu menuItems={demoMenuItems} />
			<SearchBox />
		</header>
		<main css={mainCss}>
			<div css={sidebarCss}>
				<div css={cardCss}>
					<CardLoading />
				</div>
				<div css={cardCss}>
					<CardLoading />
				</div>
				<div css={cardCss}>
					<CardLoading />
				</div>
				<div css={cardCss}>
					<CardLoading />
				</div>
				<div css={cardCss}>
					<CardLoading />
				</div>
			</div>
			<div css={contentPanelCss}>
				<SplitPanel
					one={
						<div css={{ backgroundColor: '#141414', flex: 1, overflow: 'auto' }}>
							one
							<br /> one
							<br /> one
						</div>
					}
					two={
						<div css={{ backgroundColor: '#141414', flex: 1, overflow: 'auto' }}>
							two
							<br /> two
							<br /> two
						</div>
					}
				/>
			</div>
		</main>
	</>
);

export default App;
