jquery.whereas
============

"Too bad you can't use window.setTimout and have it implement the jQuery Deferred interface." 

We're all upset about that. So...

"Wait. What? Now you can?!?"

Right. Now you can. I searched the internet and couldn't find an existing one, to my surprise. I wrote it for you though.

It's almost as simple as my sample code in <a href="http://wilsonhut.wordpress.com/2013/05/30/the-simplest-explanation-of-jquery-deferred/" title="The simplest explanation of jQuery Deferred" target="_blank">this post explaining the basics of Deferred</a> with the addition of an actual setTimeout... Make a $.Deferred. Call the provided func in a setTimeout, using the provided delay and parameters. After the call to the provided func, call <em>.resolve</em>, and in a catch block, call <em>.reject</em>.

"How do you use it?"

<strong>Use it just like setTimeout</strong>
setTimeout:
<pre>
setTimeout(function(){
    console.log("I'm in the future. " + new Date());
}, 2000);
</pre>

My new $.defer method:
<pre>
$.defer(function(){
    console.log("I'm in the future. " + new Date());
}, 2000);
</pre>

It's the same. You can even pass parameters, just like setTimout. (I didn't bother implementing the overload that takes a string and <em>eval'</em>s it, because who cares)


"So what's the big deal?"

<ul>
<li>It works the same way as your beloved setTimeout, only with the $.defer, you can chain callbacks on the end...
<pre>
$.defer(function(){
    console.log("I'm in the future. " + new Date());
}, 2000)
.done(function(){
    console.log("All done");
});
</pre>
and you get all the benefits of the rest of the callbacks - done/fail/then/always, etc.</li>
  <li>You can use it anywhere that expects a promise - for example, you can use it as a participant in jQuery's <em><a href="http://api.jquery.com/jQuery.when/" target="_blank">$.when()</a>!</em></li>
	<li>Since there are callbacks, you have a way to get the return value of the function that you called.
<pre>
$.defer(function(){
    return "no you didn't";
}, 2000)
.done(function(x){
    console.log(x); // x is "no you didn't" 
});
</pre>
</li>
	<li>It's cancel-able. (with optional bool parameter to reject/not reject)
<pre>
$.defer(function(){
   console.log("Doing work...");
}, 2000)
.progress(function(d){
    console.log("Sorry to have to cancel this.");
    d.cancel();
})
.done(function(){
    console.log("Won't get here.");
})
.fail(function(){
    console.log("This will happen");
});</pre></li>
<li>
You can use it without the function parameter to return a promise that will resolve in [delay] milliseconds
<pre>
return $.defer(100);
</pre>

The delay is optional too. The default delay of 0 (zero) will be used.
<pre>
return $.defer(function(){alert("ASYNC!");});
</pre>
or
<pre>
return $.defer();
</pre>

</li>
</ul>
