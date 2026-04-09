export type MenuItems = (MenuItem | LinkItem)[];

type MenuItem = {
	label: string;
	menuItems: MenuItems;
};

type LinkItem = {
	label: string;
	href: string;
};

const demoMenuItems: MenuItems = [
	{
		label: 'Menu One',
		menuItems: [
			{ label: 'Menu One Link One', href: '#menu1-link1' },
			{
				label: 'Menu One Menu Two',
				menuItems: [
					{ label: 'Menu One Menu Two Link One', href: '#menu1-menu2-link1' },
					{ label: 'Menu One Menu Two Link Two', href: '#menu1-menu2-link2' },
					{ label: 'Menu One Menu Two Link Three', href: '#menu1-menu2-link3' },
				],
			},
			{ label: 'Menu One Link Three', href: '#menu1-link3' },
			{
				label: 'Menu One Menu Four',
				menuItems: [
					{ label: 'Menu One Menu Four Link One', href: '#menu1-menu4-link1' },
					{ label: 'Menu One Menu Four Link Two', href: '#menu1-menu4-link2' },
				],
			},
		],
	},
	{
		label: 'Menu Two',
		menuItems: [
			{ label: 'Menu Two Link One', href: '#menu2-link1' },
			{
				label: 'Menu Two Menu Two',
				menuItems: [
					{ label: 'Menu Two Menu Two Link One', href: '#menu2-menu2-link1' },
					{ label: 'Menu Two Menu Two Link Two', href: '#menu2-menu2-link2' },
					{ label: 'Menu Two Menu Two Link Three', href: '#menu2-menu2-link3' },
					{
						label: 'Menu Two Menu Two Menu Four',
						menuItems: [
							{ label: 'Menu Two Menu Two Menu Four LinkOne', href: '#menu2-menu2-menu4-link1' },
							{ label: 'Menu Two Menu Two Menu Four LinkTwo', href: '#menu2-menu2-menu4-link2' },
							{ label: 'Menu Two Menu Two Menu Four LinkThree', href: '#menu2-menu2-menu4-link3' },
						],
					},
					{ label: 'Menu Two Menu Two Link Five', href: '#menu2-menu2-link5' },
					{ label: 'Menu Two Menu Two Link Six', href: '#menu2-menu2-link6' },
				],
			},
			{ label: 'Menu Two Link Three', href: '#menu2-link3' },
		],
	},
];
export default demoMenuItems;
