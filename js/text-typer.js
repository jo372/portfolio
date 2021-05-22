/**
 *  I did not create the original code for this. I can be found here: https://codepen.io/illia_chaban/pen/wVqMPN. I simply converted it to typescript.
 *
 */
class TextTyper {
    constructor(el, minTypingTime, randomTypingTime) {
        this.waitCharacters = '.?!';
        minTypingTime = minTypingTime || 30;
        randomTypingTime = randomTypingTime || 175;
        this.container = el;
        this.minTypingTime = minTypingTime;
        this.randomTypingTime = randomTypingTime;
        this.stopAnimation = false;
        this.currPromiseChain = Promise.resolve();
    }
    type(text) {
        for (let char of text) {
            this.typeLetter(char);
            if (this.waitCharacters.includes(char))
                this.wait(1000);
        }
        return this;
    }
    typeLetter(char) {
        this.chain(() => new Promise(resolve => {
            if (this.stopAnimation)
                return resolve();
            setTimeout(() => {
                console.log(char);
                this.container.textContent += char;
                this.stopCursorBlinking();
                resolve();
            }, this.getRandomTimeout());
        }));
        return this;
    }
    getRandomTimeout() {
        // simulates real person's typing
        return Math.random() * this.randomTypingTime + this.minTypingTime;
    }
    stopCursorBlinking() {
        this.container.classList.add('typing');
        clearTimeout(this.cursorBlinkerTimeoutId);
        this.cursorBlinkerTimeoutId = setTimeout(() => {
            this.container.classList.remove('typing');
        }, 200);
    }
    remove(num) {
        for (let i = 0; i < num; i++) {
            this.removeLetter();
        }
        return this;
    }
    removeLetter() {
        this.chain(() => new Promise(resolve => {
            if (this.stopAnimation)
                return resolve();
            setTimeout(() => {
                let currText = this.container.textContent;
                this.container.textContent = currText.slice(0, currText.length - 1);
                this.stopCursorBlinking();
                resolve();
            }, this.getRandomTimeout() / 2.5);
            // removing characters is usually much faster than typing
        }));
        return this;
    }
    chain(callback) {
        this.currPromiseChain = this.currPromiseChain.then(callback);
        return this;
    }
    wait(time) {
        this.chain(() => new Promise(resolve => {
            if (this.stopAnimation)
                return resolve();
            setTimeout(resolve, time);
        }));
        return this;
    }
    clear() {
        this.chain(() => this.container.textContent = '');
        return this;
    }
    stop() {
        this.stopAnimation = true;
        this.chain(() => this.stopAnimation = false);
        return this;
    }
    clearNow() {
        this.stop().clear();
        return this;
    }
}
