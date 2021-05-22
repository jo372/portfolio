/**
 *  I did not create the original code for this. I can be found here: https://codepen.io/illia_chaban/pen/wVqMPN. 
 *  I simply converted it to typescript & wrote the documentation and made minor modifications.
 * 
 */
class TextTyper {
    private container : HTMLElement;
    private readonly waitCharacters : string = '.?!';
    private cursorBlinkerTimeoutId : number; 
    private minTypingTime : number;
    private randomTypingTime : number;
    private stopAnimation : boolean;
    private currPromiseChain: Promise<void>;
    
    constructor(el: HTMLElement, minTypingTime?: number, randomTypingTime?: number) {
        minTypingTime = minTypingTime || 30;
        randomTypingTime = randomTypingTime || 175;

        this.container = el;
        this.minTypingTime = minTypingTime;
        this.randomTypingTime = randomTypingTime;

        this.stopAnimation = false;
        this.currPromiseChain = Promise.resolve();
    }

    /**
     * Writes the text you want to write to the screen.
     * @param {string} text the text that you want to write to the screen
     * @returns the current TextTyper this is for method chaining.
     */
    type(text: string) : TextTyper {
        for( let char of text ) { 
        this.typeLetter(char);
        if (this.waitCharacters.includes(char)) this.wait(1000);
        }
        return this;
    }

    /**
     * The letter you want to write to the screen
     * @param {string} char the character you want to display on the screen.
     * @returns the current TextTyper this is for method chaining.
     */
    typeLetter(char: string) : TextTyper {
        /** pverriding the current chain with the newest letter. */
        this.chain( () => new Promise<void>(resolve => {
        /** if the animation has stopped, resolve the promise. */
        if (this.stopAnimation) return resolve();
        /** waiting for the letter to be typed to the screen, getting the random timeout time. Which simulates a person typing. */
        setTimeout( () => {
            this.container.textContent+= char;
            this.stopCursorBlinking();
            resolve();
        }, this.getRandomTimeout());
        }));
        return this;
    }

    /**
     * Get a random timeout which simulates a user typing.
     * @returns
     */
    getRandomTimeout() : number {
        // simulates real person's typing
        return Math.random() * this.randomTypingTime + this.minTypingTime; 
    }

    /**
     * adding the class tpying to the container, afterwards clearning the previous cursorBlinkerId and overriding it. Waiting and removing the typing cursor.
     */
    stopCursorBlinking() : void {
        this.container.classList.add('typing');
        clearTimeout( this.cursorBlinkerTimeoutId );
        this.cursorBlinkerTimeoutId = setTimeout( () => {
        this.container.classList.remove('typing');
        }, 200);
    }

    /**
     * @param num the number of characters you want to remove from the screen
     * @returns the current TextTyper this is for method chaining.
     */
    remove(num: number) : TextTyper {
        for( let i = 0; i < num; i++ ) {
        this.removeLetter();
        }
        return this;
    }

    /**
     * remove one single character from the screen.
     * @returns the current TextTyper this is for method chaining.
     */
    removeLetter() : TextTyper {
        this.chain( () => new Promise<void>( resolve => {
        if (this.stopAnimation) return resolve();

        setTimeout( () => {
            let currText = this.container.textContent;
            this.container.textContent = currText.slice( 0, currText.length - 1);
            this.stopCursorBlinking();
            resolve();
        }, this.getRandomTimeout() / 2.5);
        // removing characters is usually much faster than typing

        }))
        return this;
    }
    
    /**
     * adds methods to the promis chain
     * @param callback the method you want to add to the chain.
     * @returns the current TextTyper this is for method chaining.
     */
    chain( callback: () => void ) : TextTyper{
        this.currPromiseChain = this.currPromiseChain.then( callback );
        return this;
    }

    /**
     * a function which allow the text typer to wait.
     * @param {number} time the amount of time you want to wait in milliseconds.
     * @returns the current TextTyper this is for method chaining.
     */
    wait( time: number ) : TextTyper {
        this.chain( () => new Promise<void>( resolve => {
        if (this.stopAnimation) return resolve();
        setTimeout(resolve, time)
        }));
        return this;
    }
    /**
     * clears the current container
     * @returns the current TextTyper this is for method chaining.
     */
    clear() : TextTyper {
        this.chain( () => this.container.textContent = '');
        return this;
    }

    /**
     * Stops the current cursor animation.
     * @returns the current TextTyper this is for method chaining.
     */
    stop() : TextTyper {
        this.stopAnimation = true;
        this.chain( () => this.stopAnimation = false );
        return this;
    }

    /**
     * Stops the animation and clears the screen.
     * @returns the current TextTyper this is for method chaining.
     */
    clearNow() : TextTyper {
        this.stop().clear();
        return this;
    }  
}
  