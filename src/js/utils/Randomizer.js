/**
 *
 *  Randomizer class using middle square weyl sequence
 */

module.exports = class Randomizer {
    constructor(opts) {
        this.x = 0;
        this.w = 0;
        this.s = opts && opts.seed || 0;
        this.maxPrecision = opts && opts.maxPrecision || 10;
    }

    getInt(max = 1, min = 0) {
        return this.msws(max, min);
    }

    getFloat(max = 1, min = 0) {
        let whole = (max === 1) ? 0 : this.getInt(max - 1, min);
        let part = this.getInt('1' + ('0'.repeat(this.maxPrecision)));
        let result = whole + '.' + part;

        return result;
    }

    random(max = 1, min = 0) {
        return this.getFloat(max, min);
    }

    msws(max = 1, min = 0) {
        let clamped = !!max;
        let done = false;
        let i = 0;

        while (!done) {
            i += 1;

            this.x *= this.x;
            this.x += (this.w += this.s);
            this.x = (this.x >> 16) | (this.x << 16);

            this.x = (this.x < 0) ? this.x * -1 : this.x;

            let outOfBounds = clamped && ((this.x > max) || (min && this.x < min));

            if(!clamped) {
                done = true;
            } else if(!outOfBounds) {
                done = true;
            }
        }

        return this.x;
    }
}