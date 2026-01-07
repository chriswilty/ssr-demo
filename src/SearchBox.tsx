const SearchBox = () => (
	<div css={{ display: 'flex', alignItems: 'center', position: 'relative', color: 'inherit' }}>
		<input
			type="search"
			placeholder="Search"
			css={{
				backgroundColor: 'transparent',
				border: 'none',
				maxWidth: '20rem',
				padding: '0.5rem 2.75rem 0.5rem 0.5rem',
				fontSize: '1.5rem',
				textAlign: 'right',
				flex: 1,
				'&::placeholder': {
					color: 'inherit',
					opacity: '0.6',
				},
			}}
		/>
		<svg
			css={{ position: 'absolute', right: '0.5rem', height: '1.5rem', opacity: '0.6' }}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			aria-hidden={true}
		>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M11.5 7a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-.82 4.74a6 6 0 1 1 1.06-1.06l2.79 2.79a.75.75 0 1 1-1.06 1.06z"
				clipRule="evenodd"
			/>
		</svg>
	</div>
);

export default SearchBox;
