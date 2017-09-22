/*
 * @Author: Allen
 * @Date:   2017-09-22 14:39:18
 * @Last Modified by:   Allen
 * @Last Modified time: 2017-09-22 15:47:28
 */

'use strict';




describe("A spy", function() {
  var foo, bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      }
    };

    spyOn(foo, 'setBar');

    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

  it("tracks that the spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
  });

  it("tracks that the spy was called x times", function() {
    expect(foo.setBar).toHaveBeenCalledTimes(2);
  });

  it("tracks all the arguments of its calls", function() {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

  it("stops all execution on a function", function() {
    expect(bar).toBeNull();
  });
});



describe("A aaa", function() {
    var foo, bar, fetchBar;
    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            },
            getBar: function(){
                console.log(bar)
                return bar
            }
        };
        spyOn(foo, 'getBar').and.callThrough();

        foo.setBar(123);
        fetchBar = foo.getBar();
    });

    // it("tracks that the spy was callec", function(){
    //     expect(foo.getBar).toHaveBeenCalled();
    // });

    // it("should not affect other function", function(){
    //     expect(bar).toEqual(123)
    // });

    it("when called returns the requested value", function(){
        expect(fetchBar).toEqual(123)
    })


});
