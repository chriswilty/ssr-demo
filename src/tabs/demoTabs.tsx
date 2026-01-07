import type { ReactElement } from 'react';

const demoTabs: Record<string, ReactElement> = {
	'First Tab': (
		<p css={{ paddingInline: '1rem' }}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
	),
	'Second Tab': (
		<>
			<p css={{ paddingInline: '1rem' }}>
				Lorem ipsum dolor sit amet consectetur adipiscing elit. Tempus leo eu aenean sed diam urna
				tempor. Ut hendrerit semper vel class aptent taciti sociosqu. Montes nascetur ridiculus mus
				donec rhoncus eros lobortis. Vestibulum fusce dictum risus blandit quis suspendisse aliquet.
				Ligula congue sollicitudin erat viverra ac tincidunt nam. Nullam volutpat porttitor
				ullamcorper rutrum gravida cras eleifend. Accumsan maecenas potenti ultricies habitant morbi
				senectus netus. Adipiscing elit quisque faucibus ex sapien vitae pellentesque. Urna tempor
				pulvinar vivamus fringilla lacus nec metus. Taciti sociosqu ad litora torquent per conubia
				nostra. Eros lobortis nulla molestie mattis scelerisque maximus eget.
			</p>
			<p css={{ paddingInline: '1rem' }}>
				Suspendisse aliquet nisi sodales consequat magna ante condimentum. Tincidunt nam porta
				elementum a enim euismod quam. Cras eleifend turpis fames primis vulputate ornare sagittis.
				Senectus netus suscipit auctor curabitur facilisi cubilia curae. Vitae pellentesque sem
				placerat in id cursus mi. Nec metus bibendum egestas iaculis massa nisl malesuada. Conubia
				nostra inceptos himenaeos orci varius natoque penatibus. Maximus eget fermentum odio
				phasellus non purus est. Ante condimentum neque at luctus nibh finibus facilisis. Euismod
				quam justo lectus commodo augue arcu dignissim. Ornare sagittis vehicula praesent dui felis
				venenatis ultrices. Cubilia curae hac habitasse platea dictumst lorem ipsum.
			</p>
		</>
	),
	'Third Tab': (
		<p css={{ paddingInline: '1rem' }}>
			Semper vel class aptent taciti sociosqu ad litora. Conubia nostra inceptos himenaeos orci
			varius natoque penatibus. Dis parturient montes nascetur ridiculus mus donec rhoncus. Nulla
			molestie mattis scelerisque maximus eget fermentum odio. Purus est efficitur laoreet mauris
			pharetra vestibulum fusce.
		</p>
	),
	'Fourth Tab': (
		<p css={{ paddingInline: '1rem' }}>
			Lorem ipsum dolor sit amet consectetur adipiscing elit. Pretium tellus duis convallis tempus
			leo eu aenean. Iaculis massa nisl malesuada lacinia integer nunc posuere. Conubia nostra
			inceptos himenaeos orci varius natoque penatibus. Nulla molestie mattis scelerisque maximus
			eget fermentum odio. Blandit quis suspendisse aliquet nisi sodales consequat magna. Ligula
			congue sollicitudin erat viverra ac tincidunt nam. Velit aliquam imperdiet mollis nullam
			volutpat porttitor ullamcorper. Dui felis venenatis ultrices proin libero feugiat tristique.
			Cubilia curae hac habitasse platea dictumst lorem ipsum.
		</p>
	),
};

export default demoTabs;
