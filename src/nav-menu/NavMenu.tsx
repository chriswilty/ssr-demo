import styled from '@emotion/styled';
import type { CSSProperties, FC, KeyboardEvent, RefObject } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import ChevronRight from './ChevronRight.tsx';
import ChevronDown from './ChevronDown.tsx';
import ChevronUp from './ChevronUp.tsx';
import type { MenuItems } from './demoMenuItems.ts';

const StyledList = styled.ul(
	({
		expanded,
		fixed,
		itemCount,
		menuPosition,
		navHasFocus,
		orientation,
	}: Pick<MenuProps, 'fixed' | 'menuPosition' | 'navHasFocus' | 'orientation'> & {
		expanded: boolean;
		itemCount: number;
	}) => ({
		display: expanded ? 'grid' : 'none',
		gap: '1rem',
		zIndex: 100,
		backgroundColor: 'var(--backgroundColorMain)',
		...(fixed
			? {
					border: `0.125rem solid ${navHasFocus ? 'var(--colorMain)' : 'transparent'}`,
				}
			: {
					border: '0.0625rem solid var(--backgroundColorSecondary)',
					position: 'absolute' as CSSProperties['position'],
					...(menuPosition === 'below'
						? { top: 'calc(100% + 0.25rem)', left: 0 }
						: { top: '-0.125rem', left: 'calc(100% + 0.25rem)' }),
				}),
		...(orientation === 'horizontal'
			? {
					gridTemplateColumns: `repeat(${itemCount}, 1fr auto)`,
					padding: '0.5rem',
				}
			: {
					gridTemplateColumns: '1fr auto',
					padding: '0.125rem 0.25rem',
				}),
	})
);

const StyledItem = styled.li({
	display: 'grid',
	gridTemplateColumns: 'subgrid',
	gridColumn: 'auto / span 2',
	position: 'relative',
	listStyle: 'none',
	cursor: 'pointer',
});

const StyledAnchor = styled.a(({ expanded }: { expanded?: boolean }) => ({
	display: 'grid',
	gridTemplateColumns: 'subgrid',
	gridColumn: 'inherit',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '0.25rem 0.5rem',
	textDecoration: 'none',
	whiteSpace: 'nowrap',
	backgroundColor: expanded ? 'var(--backgroundColorSecondary)' : 'transparent',
	color: 'inherit',
	outlineOffset: '0.125rem',
	'&:hover, &:focus': {
		backgroundColor: 'var(--backgroundColorSecondary)',
		outline: '0.125rem solid var(--colorMain)',
	},
}));

type LinkProps = {
	label: string;
	href: string;
	focusRef?: RefObject<HTMLAnchorElement | null>;
	onKeyDown: (event: KeyboardEvent) => void;
	onPress: () => void;
};

const Link: FC<LinkProps> = ({ label, href, focusRef, onKeyDown, onPress }) => {
	const isFocused = !!focusRef;

	const handleLinkPress = () => {
		//console.log(`link pressed: ${label}`);
		onPress();
	};

	return (
		<StyledAnchor
			href={href}
			ref={focusRef}
			role="menuitem"
			tabIndex={isFocused ? undefined : -1}
			onClick={handleLinkPress}
			onKeyDown={onKeyDown}
		>
			{label}
		</StyledAnchor>
	);
};

type MenuProps = {
	// `true` for always visible menu, else menu appearance is triggered by user
	fixed?: boolean;
	// Ref for the anchor element, to enable focus control
	itemRef?: RefObject<HTMLAnchorElement | null> | undefined;
	// Menu items to display
	items: MenuItems;
	// Primary label of this menu
	label: string;
	// Optional ref for the UL element, useful for attaching event listeners on the top-level menu
	listRef?: RefObject<HTMLUListElement | null>;
	// Where menu should be positioned when open
	menuPosition: 'below' | 'right';
	// Whether the menu has focus (in any child element)
	navHasFocus: boolean;
	// How menu items should be displayed
	orientation: 'horizontal' | 'vertical';
	onKeyDown?: (event: KeyboardEvent) => void;
	onLinkPress: () => void;
	onMenuPress?: (label: string) => void;
};

const Menu: FC<MenuProps> = ({
	fixed = false,
	itemRef,
	items,
	label,
	listRef,
	menuPosition,
	navHasFocus,
	orientation,
	onKeyDown,
	onLinkPress,
	onMenuPress,
}) => {
	const focusedChildRef = useRef<HTMLAnchorElement>(null);
	const [previouslyFocused, setPreviouslyFocused] = useState(!!itemRef);
	const [expanded, setExpanded] = useState(fixed);
	const [focusedItem, setFocusedItem] = useState<string | undefined>(
		fixed ? items[0].label : undefined
	);

	if (expanded && !fixed && !navHasFocus) setExpanded(false);

	const isFocused = !!itemRef;
	if (isFocused !== previouslyFocused) {
		if (!isFocused) {
			// Clear child selection when focus lost
			//console.log(`Focus lost: ${label}`);
			setFocusedItem(undefined);
			if (!fixed) setExpanded(false);
		} else {
			//console.log(`Focus gained: ${label}`);
		}
		setPreviouslyFocused(isFocused);
	}

	useLayoutEffect(() => {
		if (navHasFocus) {
			if (focusedItem) {
				//console.log(`menu.useLayoutEffect(${label}): focusing CHILD item`);
				focusedChildRef.current?.focus();
			} else if (itemRef?.current) {
				//console.log(`menu.useLayoutEffect(${label}): focusing THIS item`);
				itemRef.current.focus();
			}
		}
	}, [itemRef, focusedItem, label, navHasFocus]);

	const handleLinkPressed = () => {
		if (!fixed) setFocusedItem(undefined);
		onLinkPress();
	};

	const handleMenuItemPressed = (label: string) => {
		setFocusedItem(label);
	};

	const handleMenuClick = () => {
		setExpanded((isExpanded) => !isExpanded);
		onMenuPress?.(label);
	};

	const focusPreviousMenuItem = () => {
		const currentItemIndex = items.findIndex((item) => item.label === focusedItem);
		const prevItem = items.at(currentItemIndex - 1)!;
		setFocusedItem(prevItem.label);
	};

	const focusNextMenuItem = () => {
		const currentItemIndex = items.findIndex((item) => item.label === focusedItem);
		const nextItem = items.at(currentItemIndex + 1 - items.length)!;
		setFocusedItem(nextItem.label);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		//console.log(`menu.keyDown (${event.key})`);
		if (
			!expanded &&
			((event.key === 'ArrowRight' && menuPosition === 'right') ||
				(event.key === 'ArrowDown' && menuPosition === 'below') ||
				event.key === 'Enter')
		) {
			//console.log(`setting focusedItem to ${items[0].label}`);
			setExpanded(true);
			setFocusedItem(items[0].label);
			event.preventDefault();
		} else if (
			expanded &&
			!fixed &&
			((event.key === 'ArrowLeft' && menuPosition === 'right') || event.key === 'Escape')
		) {
			setExpanded(false);
			setFocusedItem(undefined);
		} else if (
			expanded &&
			((event.key === 'ArrowUp' && orientation == 'vertical') ||
				(event.key === 'ArrowLeft' && orientation === 'horizontal'))
		) {
			focusPreviousMenuItem();
		} else if (
			expanded &&
			((event.key === 'ArrowDown' && orientation === 'vertical') ||
				(event.key === 'ArrowRight' && orientation === 'horizontal'))
		) {
			focusNextMenuItem();
		} else {
			// Allow to propagate if event not consumed by this menu
			onKeyDown?.(event);
		}
	};

	return (
		<>
			{!fixed && (
				<StyledAnchor
					aria-expanded={expanded}
					aria-haspopup={true}
					expanded={expanded}
					href={`#${label.toLowerCase().replaceAll(' ', '-')}`}
					ref={itemRef}
					role="menuitem"
					tabIndex={isFocused && !expanded ? undefined : -1}
					onClick={handleMenuClick}
					onKeyDown={handleKeyDown}
				>
					{label}
					{
						/* prettier-ignore */
						menuPosition === 'right'
						? (expanded ? <ChevronDown /> : <ChevronRight />)
						: (expanded ? <ChevronUp /> : <ChevronDown />)
					}
				</StyledAnchor>
			)}
			<StyledList
				aria-label={label}
				expanded={expanded}
				fixed={fixed}
				itemCount={items.length}
				menuPosition={menuPosition}
				navHasFocus={navHasFocus}
				orientation={orientation}
				ref={listRef}
				role={fixed ? 'menubar' : 'menu'}
			>
				{items.map((item) => (
					<StyledItem key={item.label} role="none">
						{'href' in item ? (
							<Link
								focusRef={item.label === focusedItem ? focusedChildRef : undefined}
								onKeyDown={handleKeyDown}
								onPress={handleLinkPressed}
								{...item}
							/>
						) : (
							<Menu
								fixed={false}
								itemRef={item.label === focusedItem ? focusedChildRef : undefined}
								items={item.menuItems}
								label={item.label}
								menuPosition={orientation === 'horizontal' ? 'below' : 'right'}
								navHasFocus={navHasFocus}
								orientation="vertical"
								onKeyDown={handleKeyDown}
								onLinkPress={handleLinkPressed}
								onMenuPress={handleMenuItemPressed}
							/>
						)}
					</StyledItem>
				))}
			</StyledList>
		</>
	);
};

const NavMenu: FC<{ menuItems: MenuItems }> = ({ menuItems }) => {
	const menubarRef = useRef<HTMLUListElement>(null);
	const [navHasFocus, setNavHasFocus] = useState(false);

	useEffect(() => {
		const setMenuGainedFocus = () => setNavHasFocus(true);
		const setMenuLostFocus = (event: FocusEvent) => {
			if (!menubarRef.current?.contains(event.relatedTarget as Element)) {
				setNavHasFocus(false);
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

	const handleLinkPressed = () => {
		setNavHasFocus(false);
	};

	// TODO Responsive design to collapse into hamburger menu?
	return (
		<nav css={{ position: 'relative', alignSelf: 'flex-start' }} aria-label="Site Menu">
			<Menu
				fixed
				items={menuItems}
				label="Site Menu"
				listRef={menubarRef}
				menuPosition="below"
				navHasFocus={navHasFocus}
				orientation="horizontal"
				onLinkPress={handleLinkPressed}
			/>
		</nav>
	);
};

export default NavMenu;
