import { css } from '@emotion/react';
import {
	type FC,
	type KeyboardEvent,
	type MouseEvent,
	type RefObject,
	useLayoutEffect,
} from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ChevronRight from './ChevronRight.tsx';
import ChevronDown from './ChevronDown.tsx';
import ChevronUp from './ChevronUp.tsx';
import type { MenuItems } from './demoMenuItems.ts';

const menuCss = css({
	position: 'absolute',
	top: 0,
	left: 'calc(100% + 0.5rem)',
	zIndex: 100,
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	rowGap: '0.5rem',
	columnGap: '1rem',
	border: '1px solid var(--backgroundColorSecondary)',
	padding: '0.125rem 0.25rem',
	backgroundColor: 'var(--backgroundColorMain)',
});
const itemCss = css({
	display: 'grid',
	gridTemplateColumns: 'subgrid',
	gridColumn: 'auto / span 2',
	position: 'relative',
	listStyle: 'none',
	cursor: 'pointer',
});
const anchorCss = css({
	display: 'grid',
	gridTemplateColumns: 'subgrid',
	gridColumn: 'inherit',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '0.25rem 0.5rem',
	textDecoration: 'none',
	whiteSpace: 'nowrap',
	color: 'inherit',
	outlineOffset: '0.125rem',
	'&:hover, &:focus': {
		backgroundColor: 'var(--backgroundColorSecondary)',
		outline: '0.125rem solid var(--colorMain)',
	},
});

type LinkProps = {
	label: string;
	href: string;
	focusRef?: RefObject<HTMLAnchorElement | null>;
	onKeyDown: (event: KeyboardEvent) => void;
	onPress: () => void;
};

const Link: FC<LinkProps> = ({ label, href, focusRef, onKeyDown, onPress }) => {
	const isFocused = !!focusRef;

	return (
		<li role="none" css={itemCss}>
			<a
				ref={focusRef}
				role="menuitem"
				href={href}
				tabIndex={isFocused ? undefined : -1}
				onClick={onPress}
				onKeyDown={onKeyDown}
				css={anchorCss}
			>
				{label}
			</a>
		</li>
	);
};

type MenuProps = {
	focusRef?: RefObject<HTMLAnchorElement | null>;
	isExpanded: boolean;
	items: MenuItems;
	label: string;
	position?: 'right' | 'bottom';
	onFocus?: (label: string) => void;
	onKeyDown: (event: KeyboardEvent) => void;
	onPress: (label: string, after?: () => void) => void;
};

const Menu: FC<MenuProps> = ({
	focusRef,
	isExpanded,
	items,
	label,
	position = 'right',
	onPress,
	onFocus,
	onKeyDown,
}) => {
	const childFocusRef = useRef<HTMLAnchorElement>(null);
	const [previouslyFocused, setPreviouslyFocused] = useState(!!focusRef);
	const [expandedMenu, setExpandedMenu] = useState<string>();
	const [focusedItem, setFocusedItem] = useState<string | undefined>(items[0].label);

	const menuitemCss = useMemo(
		() => css(itemCss, position === 'bottom' && { columnGap: '0.5rem' }),
		[position]
	);

	const subMenuCss = useMemo(
		() => css(menuCss, position === 'bottom' && { top: 'calc(100% + 0.5rem)', left: 'unset' }),
		[position]
	);

	const isFocused = !!focusRef;

	if (isFocused !== previouslyFocused) {
		if (!isFocused) {
			// Clear child selection when focus lost
			setFocusedItem(undefined);
			setExpandedMenu(undefined);
		}
		setPreviouslyFocused(isFocused);
	}

	const handleFocus = useCallback(() => onFocus?.(label), [label, onFocus]);

	const handlePress = useCallback(
		(event: MouseEvent<HTMLAnchorElement>) => {
			console.log(`Menu.handlePress (${label})`);
			event.preventDefault();
			onPress(label);
		},
		[label, onPress]
	);

	useLayoutEffect(() => {
		console.log(`menu(${label}) focused=${focusedItem}`);
		if (focusedItem) {
			console.log('menu.useLayoutEffect: focusing child menuitem');
			childFocusRef.current?.focus();
		}
	}, [focusedItem, label]);

	const handleChildLinkPress = useCallback(() => setExpandedMenu(undefined), []);

	const handleChildMenuPress = useCallback((label: string, after?: () => void) => {
		console.log(`Menu.handleChildPress (${label})`);
		setExpandedMenu((current) => (label === current ? undefined : label));
		after?.();
	}, []);

	const focusPreviousMenuItem = useCallback(() => {
		console.log('menu.focusPrevious');
		const currentItemIndex = items.findIndex((item) => item.label === focusedItem);
		const prevItem = items.at(currentItemIndex - 1)!;
		setFocusedItem(prevItem.label);
	}, [focusedItem, items]);

	const focusNextMenuItem = useCallback(() => {
		console.log('menu.focusNext');
		const currentItemIndex = items.findIndex((item) => item.label === focusedItem);
		const nextItem = items.at(currentItemIndex + 1 - items.length)!;
		setFocusedItem(nextItem.label);
	}, [focusedItem, items]);

	const handleKeyDown = (event: KeyboardEvent) => {
		console.log(`menu.keyDown (${event.key})`);
		if (
			!isExpanded &&
			((event.key === 'ArrowRight' && position === 'right') ||
				(event.key === 'ArrowDown' && position === 'bottom'))
		) {
			onPress(label, () =>
				setFocusedItem(() => {
					console.log(`setting focusedItem to ${items[0].label}`);
					return items[0].label;
				})
			);
		} else if (isExpanded && event.key === 'ArrowUp') {
			focusPreviousMenuItem();
		} else if (isExpanded && event.key === 'ArrowDown') {
			focusNextMenuItem();
		} else {
			// Allow to propagate if event not consumed by this menu
			onKeyDown(event);
		}
	};

	return (
		<li role="none" css={menuitemCss}>
			<a
				ref={focusRef}
				role="menuitem"
				aria-haspopup={true}
				aria-expanded={isExpanded}
				tabIndex={isFocused ? undefined : -1}
				href={`#${label.toLowerCase().replaceAll(' ', '-')}`}
				onClick={handlePress}
				onFocus={handleFocus}
				onKeyDown={handleKeyDown}
				css={anchorCss}
			>
				{label}
				{
					/* prettier-ignore */
					position === 'right'
						? (isExpanded ? <ChevronDown /> : <ChevronRight />)
						: (isExpanded ? <ChevronUp /> : <ChevronDown />)
				}
			</a>
			<ul
				role="menu"
				aria-label={label}
				css={subMenuCss}
				style={{ display: isExpanded ? undefined : 'none' }}
			>
				{items.map((item) =>
					'href' in item ? (
						<Link
							key={item.label}
							focusRef={item.label === focusedItem ? childFocusRef : undefined}
							onKeyDown={handleKeyDown}
							onPress={handleChildLinkPress}
							{...item}
						/>
					) : (
						<Menu
							key={item.label}
							focusRef={item.label === focusedItem ? childFocusRef : undefined}
							isExpanded={item.label === expandedMenu}
							items={item.menuItems}
							label={item.label}
							onKeyDown={handleKeyDown}
							onPress={handleChildMenuPress}
						/>
					)
				)}
			</ul>
		</li>
	);
};

const NavMenu: FC<{ menuItems: MenuItems }> = ({ menuItems }) => {
	const menubarRef = useRef<HTMLUListElement>(null);
	const childFocusRef = useRef<HTMLAnchorElement>(null);
	const [expandedMenu, setExpandedMenu] = useState<string>();
	const [focusedItem, setFocusedItem] = useState<string>(menuItems[0].label);
	const [navHasFocus, setNavHasFocus] = useState(false);

	useLayoutEffect(() => {
		if (focusedItem && navHasFocus) {
			console.log('navMenu.useLayoutEffect: focusing child menuitem');
			childFocusRef.current?.focus();
		}
	}, [focusedItem, navHasFocus]);

	useEffect(() => {
		console.log('useEffect: focus event listeners');
		const setMenuLostFocus = (event: FocusEvent) => {
			if (!menubarRef.current?.contains(event.relatedTarget as Element)) {
				setNavHasFocus(false);
				setExpandedMenu(undefined);
			}
		};
		const setMenuGainedFocus = (event: FocusEvent) => {
			setNavHasFocus(true);
			if (!menubarRef.current?.contains(event.relatedTarget as Element)) {
				setExpandedMenu(undefined);
			}
		};

		const menubar = menubarRef.current!;
		menubar.addEventListener('focusin', setMenuGainedFocus);
		menubar.addEventListener('focusout', setMenuLostFocus);
		return () => {
			menubar.removeEventListener('focusin', setMenuGainedFocus);
			menubar.removeEventListener('focusout', setMenuLostFocus);
		};
	}, []);

	const focusPreviousMenuItem = useCallback(() => {
		console.log('navMenu.focusPrevious');
		const currentItemIndex = menuItems.findIndex((item) => item.label === focusedItem);
		const prevItem = menuItems.at(currentItemIndex - 1)!;
		setFocusedItem(prevItem.label);
		if (expandedMenu) {
			setExpandedMenu('menuItems' in prevItem ? prevItem.label : undefined);
		}
	}, [focusedItem, expandedMenu, menuItems]);

	const focusNextMenuItem = useCallback(() => {
		console.log('navMenu.focusNext');
		const currentItemIndex = menuItems.findIndex((item) => item.label === focusedItem);
		const nextItem = menuItems.at(currentItemIndex + 1 - menuItems.length)!;
		setFocusedItem(nextItem.label);
		if (expandedMenu) {
			setExpandedMenu('menuItems' in nextItem ? nextItem.label : undefined);
		}
	}, [focusedItem, expandedMenu, menuItems]);

	const handleLinkPress = useCallback(() => setExpandedMenu(undefined), []);

	const handleMenuPress = useCallback((label: string, after?: () => void) => {
		console.log(`navMenu.handleMenuPress (${label})`);
		setExpandedMenu((current) => (label === current ? undefined : label));
		after?.();
	}, []);

	const handleFocus = useCallback((label: string) => setFocusedItem(label), []);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowRight') focusNextMenuItem();
		else if (event.key === 'ArrowLeft') focusPreviousMenuItem();
	};

	// TODO Responsive design to collapse to hamburger menu
	return (
		<nav aria-label="Site Menu">
			<ul
				ref={menubarRef}
				role="menubar"
				aria-label="Site Menu"
				css={{
					display: 'grid',
					gridTemplateColumns: `repeat(${menuItems.length}, 1fr auto)`,
					alignItems: 'center',
					gap: '1rem',
					padding: navHasFocus ? '0.5rem' : '0.625rem',
					border: navHasFocus ? '0.125rem solid var(--colorMain)' : 'none',
				}}
			>
				{menuItems.map((menuItem) =>
					'href' in menuItem ? (
						<Link
							key={menuItem.label}
							focusRef={menuItem.label === focusedItem ? childFocusRef : undefined}
							onKeyDown={handleKeyDown}
							onPress={handleLinkPress}
							{...menuItem}
						/>
					) : (
						<Menu
							key={menuItem.label}
							focusRef={menuItem.label === focusedItem ? childFocusRef : undefined}
							isExpanded={menuItem.label === expandedMenu}
							items={menuItem.menuItems}
							label={menuItem.label}
							position="bottom"
							onFocus={handleFocus}
							onKeyDown={handleKeyDown}
							onPress={handleMenuPress}
						/>
					)
				)}
			</ul>
		</nav>
	);
};

export default NavMenu;
