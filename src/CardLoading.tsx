const CardLoading = () => (
	<svg
		aria-hidden={true}
		css={{
			width: '100%',
			height: 'auto',
			fill: '#202020',
			animation: 'pulse 2s ease-in-out infinite',
			'@keyframes pulse': {
				'0%': { fill: '#303030' },
				'50%': { fill: '#202020' },
				'100%': { fill: '#303030' },
			},
			'@media (prefers-color-scheme: light)': {
				fill: '#dfdfdf',
				animation: 'pulse 2s ease-in-out infinite',
				'@keyframes pulse': {
					'0%': { fill: '#d0d0d0' },
					'50%': { fill: '#e0e0e0' },
					'100%': { fill: '#d0d0d0' },
				},
			},
		}}
	>
		<rect x="2.5%" y="5%" rx="0.25rem" ry="0.25rem" width="45%" height="90%" />
		<rect x="50%" y="5%" rx="0.25rem" ry="0.25rem" width="47.5%" height="25%" />
		<rect x="50%" y="45%" rx="0.25rem" ry="0.25rem" width="47.5%" height="20%" />
		<rect x="50%" y="75%" rx="0.25rem" ry="0.25rem" width="47.5%" height="20%" />
	</svg>
);

export default CardLoading;
