module('basic tests');

test('noscript tag content', function() {

	$(document).ready(function() {

		$('#qunit-fixture1 noscript').each(function() {
			ok(this.textContent, 'textContent does not exist for noscript tag')
			ok($.trim(this.textContent) === '<span>test markup</span>', 'textContent not correct for noscript tag ');
		});
	});
});

module('plug-in tests');

$(document).ready(function() {

	test('noscript tag replacement', function() {

		ok($.fn.domify, 'domify plug-in not found.');
		$('#qunit-fixture1 noscript').domify();

		ok($('#qunit-fixture1 span').length, 'fixture 1 added to dom');
	});

	test('noscript tag 2 callback', function() {

		var flag;

		$('#qunit-fixture2 noscript').domify(function() {
			flag = true;
			$(this).wrap('<p></p>');
			return $(this).parent();
		});

		ok(flag, 'callback called');
		ok($('#qunit-fixture2 p > span').length, 'fixture 2  added to dom with wrap');
	});

	test('noscript tag 3 callback', function() {

		var flag;

		$('#qunit-fixture3 noscript').domify(function() {
			$(this).text('updated');
		});

		ok($('#qunit-fixture3 span').text() === 'updated', 'fixture 3  added to dom with text update');
	});

	test('noscript multiple tags', function() {

		$('#qunit-fixture4 noscript').domify();

		ok($('#qunit-fixture4 span').length === 3, 'select multiple noscript tags');
	});
});

