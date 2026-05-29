import { css } from '@emotion/react';

import CardLoading from './CardLoading.tsx';
import SearchBox from './SearchBox';

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
			<SearchBox label="Search site" onSubmit={console.log} />
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
				<p>Move along, nothing to see yet ...</p>
			</div>
		</main>
	</>
);

export default App;
