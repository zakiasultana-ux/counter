export class Counter {
    constructor(selector, initialCount = 0, label = '') {
        this.count = initialCount;
        this.initialCount = initialCount;
        this.selector = selector;
        this.label = label;
        this.mount();
    }
    mount() {
        const container = document.querySelector(this.selector);
        if (!container) {
            console.warn(`Counter: no element found for "${this.selector}"`);
            return;
        }

        if (this.label) {
            this.titleEl = document.createElement('h2');
            this.titleEl.className = 'counter__title';
            this.titleEl.textContent = this.label;
            container.appendChild(this.titleEl);
        }

        this._insertBadge(container);

        const ring = document.createElement('div');
        ring.className = 'counter__ring';
        this.display = document.createElement('span');
        this.display.className = 'counter__value';
        ring.appendChild(this.display);
        container.appendChild(ring);

        const controls = document.createElement('div');
        controls.className = 'counter__controls';

        this.btnDecrement = this._makeBtn('−', 'counter__btn counter__btn--dec', 'Decrement');
        this.btnReset = this._makeBtn('↺', 'counter__btn counter__btn--reset', 'Reset');
        this.btnIncrement = this._makeBtn('+', 'counter__btn counter__btn--inc', 'Increment');

        controls.append(this.btnDecrement, this.btnReset, this.btnIncrement);
        container.appendChild(controls);

        this.btnIncrement.addEventListener('click', () => this.increment());
        this.btnDecrement.addEventListener('click', () => this.decrement());
        this.btnReset.addEventListener('click', () => this.reset());

        this.update();
    }

    _makeBtn(text, className, ariaLabel) {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.className = className;
        btn.setAttribute('aria-label', ariaLabel);
        return btn;
    }

    _insertBadge(container) { }

    increment() {
        this.count++;
        this.update();
    }

    decrement() {
        if (this.count <= 0) return;
        this.count--;
        this.update();
    }

    reset() {
        console.log('Reset Activated!!!');
        this.count = this.initialCount;
        this.update();
    }

    getValue() {
        return this.count;
    }

    update() {
        this.display.textContent = this.count;

        this.display.classList.remove('pop');
        void this.display.offsetWidth;
        this.display.classList.add('pop');

        const atZero = this.count === 0;
        this.btnDecrement.classList.toggle('counter__btn--inactive', atZero);
        this.btnReset.classList.toggle('counter__btn--inactive', atZero);

        const container = document.querySelector(this.selector);
        if (container) container.classList.toggle('is-zero', atZero);
    }
}

export class StepCounter extends Counter {

    constructor(selector, initialCount = 0, step = 1, label = '') {
        super(selector, initialCount, label);
        this.step = step;

        if (this._badge) this._badge.textContent = `step: ${this.step}`;
    }

    _insertBadge(container) {
        this._badge = document.createElement('span');
        this._badge.className = 'counter__step-badge';
        this._badge.textContent = 'step: …';
        container.appendChild(this._badge);
    }

    increment() {
        this.count += this.step;
        this.update();
    }

    decrement() {
        if (this.count <= 0) return;
        this.count = Math.max(0, this.count - this.step);
        this.update();
    }
}