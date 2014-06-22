(function(root){

    var _ = root._ || require('underscore');

    _.mixin({
        sum: function (numbers){
            return _.reduce(numbers, function(m, n){ return m + n; }, 0);
        },
        mean: function (numbers){
            return (numbers.length === 0) ? null : ((_.sum(numbers))/numbers.length) ;
        },
        round: function (number) {
            return Math.round(number * 1000)/1000;
        },
        median: function (numbers){
            if (numbers.length === 0) return null;
            var n = numbers.length/2;
            if((numbers.length % 2) == 0){
                return _.chain(numbers)
                    .sortBy(function(number) { return number; })
                    .slice(n - 1, n + 1)
                    .sum()
                    .value()/2;
            }else{
                return _.chain(numbers)
                    .sortBy(function(number) { return number; })
                    .slice(Math.floor(n),Math.ceil(n))
                    .sum()
                    .value();
            }
        },
        meanDeviation: function (numbers){
            var totalDeviation = _.reduce(numbers, function(m, n){
                return Math.abs(this - n) + m;
            }, 0, _.mean(numbers));
            return (totalDeviation / numbers.length);
        },
        sampleStandardDeviation: function (numbers){
            var sumOfSquaredDeviations = _.chain(numbers)
                    .map(function(number){
                        return Math.pow(number - this, 2);
                    },_.mean(numbers))
                    .sum()
                    .value();
            return Math.sqrt(sumOfSquaredDeviations/(numbers.length - 1));
        },
        standardDeviation: function (numbers){
            var meanOfSquaredDeviations = _.chain(numbers)
                    .map(function(number){
                        return Math.pow(number - this, 2);
                    },_.mean(numbers))
                    .mean()
                    .value();
            return Math.sqrt(meanOfSquaredDeviations);
        },
        rank: function (numbers, value){
            var range = [];
            range.push(_.chain(numbers)
                       .sortBy(function(n){return n;})
                       .indexOf(value)
                       .value()+1);
            range.push(_.chain(numbers)
                       .sortBy(function(n){return n;})
                       .lastIndexOf(value)
                       .value()+1);
            return _.mean(range);
        }
    });

})(this);
