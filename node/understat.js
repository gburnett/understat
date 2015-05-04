/* jshint esnext: true */

'use strict';

var _ = require('underscore');

_.mixin({
    sum: function sum(numbers) {
        return _.reduce(numbers, function (m, n) {
            return m + n;
        }, 0);
    },
    mean: function mean(numbers) {
        return numbers.length === 0 ? null : _.sum(numbers) / numbers.length;
    },
    round: function round(number) {
        var places = arguments[1] === undefined ? 1 : arguments[1];

        if (places < 1) {
            throw new Error('The number of decimal places should be one or more');
        }
        var modifier = Math.pow(10, places);
        return Math.round(number * modifier) / modifier;
    },
    median: function median(numbers) {
        if (numbers.length === 0) {
            return null;
        }
        var n = numbers.length / 2;
        if (numbers.length % 2 === 0) {
            return _.chain(numbers).sortBy(function (number) {
                return number;
            }).slice(n - 1, n + 1).sum().value() / 2;
        } else {
            return _.chain(numbers).sortBy(function (number) {
                return number;
            }).slice(Math.floor(n), Math.ceil(n)).sum().value();
        }
    },
    meanDeviation: function meanDeviation(numbers) {
        var totalDeviation = _.reduce(numbers, function (m, n) {
            return Math.abs(this - n) + m;
        }, 0, _.mean(numbers));
        return totalDeviation / numbers.length;
    },
    sampleStandardDeviation: function sampleStandardDeviation(numbers) {
        var sumOfSquaredDeviations = _.chain(numbers).map(function (number) {
            return Math.pow(number - this, 2);
        }, _.mean(numbers)).sum().value();
        return Math.sqrt(sumOfSquaredDeviations / (numbers.length - 1));
    },
    standardDeviation: function standardDeviation(numbers) {
        var meanOfSquaredDeviations = _.chain(numbers).map(function (number) {
            return Math.pow(number - this, 2);
        }, _.mean(numbers)).mean().value();
        return Math.sqrt(meanOfSquaredDeviations);
    },
    rank: function rank(numbers, value) {
        var range = [];
        range.push(_.chain(numbers).sortBy(function (n) {
            return n;
        }).indexOf(value).value() + 1);
        range.push(_.chain(numbers).sortBy(function (n) {
            return n;
        }).lastIndexOf(value).value() + 1);
        return _.mean(range);
    }
});

module.exports = _;