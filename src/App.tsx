import styled from '@emotion/styled';

import ContentLoading from './ContentLoading.tsx';
import SearchBox from './SearchBox';

const Title = () => (
	<h1 style={{ margin: '1rem 0' }}>
		<a href="/" css={{ textDecoration: 'none', color: 'inherit' }}>
			recipease.com
		</a>
	</h1>
);

const Header = styled.header({
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

const Main = styled.main({
	flex: 1,
	display: 'flex',
	alignItems: 'stretch',
	gap: '2rem',
	padding: '1rem 2rem',
	overflow: 'hidden',
});

const SidePanel = styled.div({
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem',
	width: '30%',
	minWidth: '15rem',
	overflow: 'auto',
});

const Card = styled.div({
	border: '1px solid var(--backgroundColorSecondary)',
	borderRadius: '0.25rem',
});

const ContentPanel = styled.div({
	width: '70%',
});

const App = () => (
	<>
		<Header>
			<Title />
			<SearchBox label="Search site" onSubmit={console.log} />
		</Header>
		<Main>
			<SidePanel>
				<Card>
					<ContentLoading />
				</Card>
				<Card>
					<ContentLoading />
				</Card>
				<Card>
					<ContentLoading />
				</Card>
				<Card>
					<ContentLoading />
				</Card>
				<Card>
					<ContentLoading />
				</Card>
			</SidePanel>
			<ContentPanel>
				<p>Move along, nothing to see yet ...</p>
			</ContentPanel>
		</Main>
	</>
);

export default App;
