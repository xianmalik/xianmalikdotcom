export type Theme = 'green' | 'amber';

class ThemeStore {
	current: Theme = $state('green');

	toggle() {
		this.current = this.current === 'green' ? 'amber' : 'green';
	}
}

export const theme = new ThemeStore();
