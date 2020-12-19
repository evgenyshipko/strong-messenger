import { assert } from 'chai'
import { describe, it } from 'mocha'

import { sum } from '../../utils/templator/Test'

describe('sum', function() {
    it('складываем два числа', function() {
        assert.equal(sum(1, 2), 3)
    })
})
