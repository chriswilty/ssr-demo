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
			{ label: 'Link One', href: '#menu1-link1' },
			{
				label: 'Menu Two',
				menuItems: [
					{ label: 'Link One', href: '#menu1-menu2-link1' },
					{ label: 'Link Two', href: '#menu1-menu2-link2' },
					{ label: 'Link Three', href: '#menu1-menu2-link3' },
				],
			},
			{ label: 'Link Three', href: '#menu1-link3' },
			{
				label: 'Menu Four',
				menuItems: [
					{ label: 'Link One', href: '#menu1-menu4-link1' },
					{ label: 'Link Two', href: '#menu1-menu4-link2' },
				],
			},
		],
	},
	{
		label: 'Menu Two',
		menuItems: [
			{ label: 'Link One', href: '#menu2-link1' },
			{
				label: 'Menu Two',
				menuItems: [
					{ label: 'Link One', href: '#menu2-menu2-link1' },
					{ label: 'Link Two', href: '#menu2-menu2-link2' },
					{ label: 'Link Three', href: '#menu2-menu2-link3' },
					{ label: 'Link Four', href: '#menu2-menu2-link4' },
					{ label: 'Link Five', href: '#menu2-menu2-link5' },
					{ label: 'Link Six', href: '#menu2-menu2-link6' },
				],
			},
			{ label: 'Link Three', href: '#menu2-link3' },
		],
	},
];
export default demoMenuItems;
