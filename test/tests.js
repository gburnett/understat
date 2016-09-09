var test = require('tape');
var _ = require('../index.js');

test("sum an array of numbers", function(t){
    t.plan(5);
    t.equal(_.sum([]), 0);
    t.equal(_.sum([1, 2, 3]), 6);
    t.equal(_.sum([1, -2, 3]), 2);
    t.equal(_.sum([1, 0, -3]), -2);
    t.equal(_.sum([]), 0);
});

test("round to a given number of decimal places", function(t){
    t.plan(11);
    t.equal(_.round(1.1111222), 1.1);
    t.equal(_.round(1.111555), 1.1);
    t.equal(_.round(1.110), 1.1);
    t.equal(_.round(1.1111222, 3), 1.111);
    t.equal(_.round(1.111555, 3), 1.112);
    t.equal(_.round(1.110, 3), 1.11);
    t.equal(_.round(1.1111222, 4), 1.1111);
    t.equal(_.round(1.111555, 4), 1.1116);
    t.equal(_.round(1.110, 4), 1.11);
    t.throws(function () { _.round(1.1111222, 0); }, new Error('The number of decimal places should be one or more'));
    t.throws(function () { _.round(1.1111222, -1); }, new Error('The number of decimal places should be one or more'));
});

test("calculate the mean", function(t){
    t.plan(4);
    t.equal(_.mean([5, 26, 13, 12, 19, 21]), 16);
    t.equal(_.mean([1, 2, 3]), 2);
    t.equal(_.mean([1, 2, 3, 4]), 2.5);
    t.equal(_.mean([]), null);
});

test("calculate the median", function(t){
    t.plan(4);
    t.equal(_.median([13, 21, 12, 4, 26, 19]), 16);
    t.equal(_.median([1, 2, 3]), 2);
    t.equal(_.median([1, 2, 3, 4]), 2.5);
    t.equal(_.median([]), null);
});

test("calculate the mean deviation", function(t){
    t.plan(2);
    t.equal(_.meanDeviation([5, 26, 13, 12, 19, 21]), 6);
    t.equal(_.meanDeviation([3, 6, 6, 7, 8, 11, 15, 16]), 3.75);
});

test("calculate the sample standard deviation", function(t){
    t.plan(2);
    t.equal(_.chain([18, 20, 22, 24, 26])
            .sampleStandardDeviation()
            .round(3)
            .value(), 3.162);
    t.equal(_.chain([2, 4, 4, 4, 5, 5, 7, 9])
            .sampleStandardDeviation()
            .round(3)
            .value(), 2.138);
});

test("calculate the standard deviation", function(t){
    t.plan(3);
    t.equal(_.chain([18, 20, 22, 24, 26])
            .standardDeviation()
            .round(3)
            .value(), 2.828);
    t.equal(_.standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]), 2);
    t.equal(_.chain([1, 2, 3])
            .standardDeviation()
            .round(3)
            .value(), 0.816);
});

test("rank a number in an array of numbers", function(t){
    t.plan(3);
    var numbers = [10, 15, 13, 22, 21, 9, 22, 14, 8, 14, 12, 17, 22, 22, 9, 14];
    t.equal(_.rank(numbers, 9), 2.5);
    t.equal(_.rank(numbers, 10), 4);
    t.equal(_.rank(numbers, 22), 14.5);
});
