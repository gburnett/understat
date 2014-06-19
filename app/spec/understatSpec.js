describe("understat", function(){
    it("sum an array of numbers", function(){
	expect(_.sum([])).toEqual(0);
	expect(_.sum([1, 2, 3])).toEqual(6);
	expect(_.sum([1, -2, 3])).toEqual(2);
	expect(_.sum([1, 0, -3])).toEqual(-2);
	expect(_.sum([])).toEqual(0);
    });

    it("round to three decimal places", function(){
	expect(_.round(1.1111222)).toEqual(1.111);
	expect(_.round(1.111555)).toEqual(1.112);
	expect(_.round(1.110)).toEqual(1.11);
    });

    it("calculate the mean", function(){
	expect(_.mean([5, 26, 13, 12, 19, 21])).toEqual(16);
	expect(_.mean([1, 2, 3])).toEqual(2);
	expect(_.mean([1, 2, 3, 4])).toEqual(2.5);
	expect(_.mean([])).toEqual(null);
    });

    it("calculate the median", function(){
	expect(_.median([13, 21, 12, 4, 26, 19])).toEqual(16);
	expect(_.median([1, 2, 3])).toEqual(2);
	expect(_.median([1, 2, 3, 4])).toEqual(2.5);
	expect(_.median([])).toEqual(null);
    });

    it("calculate the mean deviation", function(){
	expect(_.meanDeviation([5, 26, 13, 12, 19, 21])).toEqual(6);
	expect(_.meanDeviation([3, 6, 6, 7, 8, 11, 15, 16])).toEqual(3.75);
    });

    it("calculate the sample standard deviation", function(){
	expect(_.chain([18, 20, 22, 24, 26])
	       .sampleStandardDeviation()
	       .round()
	       .value())
	    .toEqual(3.162);
	expect(_.chain([2, 4, 4, 4, 5, 5, 7, 9])
	       .sampleStandardDeviation()
	       .round()
	       .value())
	    .toEqual(2.138);
    });

    it("calculate the standard deviation", function(){
	expect(_.chain([18, 20, 22, 24, 26])
	       .standardDeviation()
	       .round()
	       .value())
	    .toEqual(2.828);
	expect(_.standardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toEqual(2);
	expect(_.chain([1, 2, 3])
	       .standardDeviation()
	       .round()
	       .value())
	    .toEqual(0.816);
    });

    it("rank a number in an array of numbers", function(){
	expect(_.rank([10, 15, 13, 22, 21, 9, 22, 14, 8, 14, 12, 17, 22, 22, 9, 14], 9)).toEqual(2.5);
	expect(_.rank([10, 15, 13, 22, 21, 9, 22, 14, 8, 14, 12, 17, 22, 22, 9, 14], 10)).toEqual(4);
	expect(_.rank([10, 15, 13, 22, 21, 9, 22, 14, 8, 14, 12, 17, 22, 22, 9, 14], 22)).toEqual(14.5);
    });
});