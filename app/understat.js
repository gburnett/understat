/* jshint esnext: true */

let _ = require('underscore');

_.mixin({
    sum: function (numbers){
        return _.reduce(numbers, (m, n) => m + n, 0);
    },
    mean: function (numbers){
        return (numbers.length === 0) ? null : ((_.sum(numbers))/numbers.length) ;
    },
    round: function (number, places = 1) {
        if (places < 1) {
            throw new Error('The number of decimal places should be one or more');
        }
        let modifier = Math.pow(10, places);
        return Math.round(number * modifier)/modifier;
    },
    median: function (numbers){
        if (numbers.length === 0) {
            return null;
        }
        let n = numbers.length/2;
        if((numbers.length % 2) === 0){
            return _.chain(numbers)
                .sortBy((number) => number)
                .slice(n - 1, n + 1)
                .sum()
                .value()/2;
        }else{
            return _.chain(numbers)
                .sortBy((number) => number)
                .slice(Math.floor(n),Math.ceil(n))
                .sum()
                .value();
        }
    },
    meanDeviation: function (numbers){
        let totalDeviation = _.reduce(numbers, function(m, n){
            return Math.abs(this - n) + m;
        }, 0, _.mean(numbers));
        return (totalDeviation / numbers.length);
    },
    sampleStandardDeviation: function (numbers){
        let sumOfSquaredDeviations = _.chain(numbers)
                .map(function(number){
                    return Math.pow(number - this, 2);
                },_.mean(numbers))
                .sum()
                .value();
        return Math.sqrt(sumOfSquaredDeviations/(numbers.length - 1));
    },
    standardDeviation: function (numbers){
        let meanOfSquaredDeviations = _.chain(numbers)
                .map(function(number){
                    return Math.pow(number - this, 2);
                },_.mean(numbers))
                .mean()
                .value();
        return Math.sqrt(meanOfSquaredDeviations);
    },
    rank: function (numbers, value){
        let range = [];
        range.push(_.chain(numbers)
                   .sortBy((n) => n)
                   .indexOf(value)
                   .value()+1);
        range.push(_.chain(numbers)
                   .sortBy((n) => n)
                   .lastIndexOf(value)
                   .value()+1);
        return _.mean(range);
    }
});
