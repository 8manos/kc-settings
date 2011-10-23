function kcsbSlug( str ) {
	strNu = str.replace(/^\-+/, '');
	strNu = strNu.replace(/^_+/, '');
	strNu = strNu.replace(/[^A-Za-z0-9\-_]/g, '');

	if ( strNu.match(/^\-+/) || strNu.match(/^_+/) )
		strNu = kcsbSlug( strNu );

	return strNu;
}


// Credit: http://stackoverflow.com/questions/784012/javascript-equivalent-of-phps-in-array
function inArray(needle, haystack) {
	var length = haystack.length;
	for (var i = 0; i < length; i++) {
		if (haystack[i] == needle) return true;
	}
	return false;
}


(function($) {

	$.fn.kcsbShowDeps = function( sel ) {
		return this.each(function() {
			var $el = $(this);
			if ( $el.is(sel) ) {
				if ( $el.is(':hidden') ) {
					$el.fadeIn().find(':input').each(function() {
						$(this).removeAttr('disabled');
					});
				}
			}
			else {
				$el.hide().find(':input').each(function() {
					$(this).attr('disabled', true);
				});
			}
		});
	};


	$.fn.kcsbIDep = function() {
		return this.each(function() {
			var $this			= $(this),
					iVal			= $this.val(),
					suffix		= $this.attr('name').match(/\[(\w+)\]$/)[1],
					$targets	= $this.parent().siblings('.idep_'+suffix);
			if ( $this.is('.global') ) {
				var $more = $('.global_idep_'+suffix);
				$targets	= $targets.add( $more );
			}

			if ( !$targets.length )
				return;

			$this.data('targets', $targets);
			$targets.kcsbShowDeps( '.'+iVal );

			$this.change(function() {
				var $input = $(this);
				$input.data('targets').kcsbShowDeps( '.'+$input.val() );
			});

		});
	};


	$.fn.kcsbReorder = function( mode ) {
		var regex	= new RegExp(mode+'\\]\\[(\\d+)');

		return this.each(function() {
			var $this 	= $(this),
					$items	= $this.children(),
					i				= -1;

			$items.each(function() {
				i++;
				$(this).find(':input').each(function() {
					this.name = this.name.replace(regex, function(str, p1) {
						return mode + '][' + i;
					});
				});
			});
		});
	};


	$.fn.kcsbActions = function() {
		return this.each(function() {
			var $this 	= $(this),
					$rows	= $this.find('.row');

			$rows.each(function() {
				var $row	 		= $(this),
						$actions	= $row.children('.actions');
						$add			= $actions.find('.add'),
						$del			= $actions.find('.del');
						$up				= $actions.find('.move.up');
						$down			= $actions.find('.move.down');

				if ( $row.is(':first-child') ) {
					$add.hide();
					$up.hide();
				}

				if ( $row.is(':last-child') ) {
					$add.show();
					$up.show();
					$down.hide();
				}
				else {
					$add.hide();
					$down.show();
				}

				if ( $row.is(':only-child') ) {
					$add.show();
					$del.hide();
					$up.hide();
					$down.hide();
				}
				else {
					$del.show();
				}
			});
		});
	};


	$.fn.kcsbGoto = function() {
		return this.each(function() {
			var $target = $(this);

			$target.fadeIn(function() {
				$('html, body').stop().animate({
					scrollTop: ( $target.offset().top - 20 )
				}, 800);
			});
		});
	};


	$.fn.kcsbUnique = function() {
		return this.each(function() {
			var $this	= $(this),
					olVal	= $this.val();

			$this.data('olVal', olVal)
				.blur(function() {
					var $input	= $(this),
							olVal		= $this.data('olVal'),
							nuVal		= $input.val();

					if ( nuVal != olVal && inArray(nuVal, kcsbIDs[$input.data('ids')]) )
						$input.val('');
				});
		});
	};


	$.fn.kcsbCheck = function() {
		var $input = $(this);

		if ( $input.val() == '' ) {
			$input.focus().css('borderColor', '#ff0000');
			return false;
		} else {
			$input.removeAttr('style');
		}
	};

})(jQuery);


jQuery(document).ready(function($) {
	var $builder	= $('#kcsb'),
			$kcsbForm = $('form.kcsb'),
			clrRed		= '#ff0000';

	// Scroll to form
	if ( !$builder.is('.hidden') )
		$builder.kcsbGoto();

	$('.row').parent().kcsbActions();

	$('.idep:input').kcsbIDep();

	$('input.kcsb-slug').live('blur', function() {
		var $this 	= $(this),
				strVal	= $this.val();

		$this.val( kcsbSlug(strVal) );
	});

	$('input.kcsb-ids').kcsbUnique();

	$('input.required, input.clone-id').live('blur', function() {
		$(this).kcsbCheck();
	});


	// Show form
	$('#new-kcsb').live('click', function() {
		$builder.kcsbGoto();
		return false;
	});


	// Remove
	$('.row a.del').live('click', function(e) {
		var $this		= $(this),
				mode		= $this.attr('rel'),
				$item		= $this.closest('.row'),
				isLast	= $item.is(':last-child');
				$wrap		= $item.parent();

		if ( !$item.siblings('.row') )
			return false;

		$item.fadeOut('fast', function() {
			$(this).remove();
			// Reorder
			if ( !isLast ) {
				$wrap.kcsbReorder( mode );
			}
			// Action buttons
			$wrap.kcsbActions();
		});

		return false;
	});


	// Add
	$('.row a.add').live('click', function(e) {
		var $this			= $(this),
				$item			= $this.closest('.row'),
				mode			= $this.attr('rel'),
				regex			= new RegExp(mode+'\\]\\[(\\d+)', 'g'),
				$nu				= $item.clone(false);

		$nu.find('.kc-rows').each(function() {
			var $kids		= $(this).children('.row');

			if ( $kids.length > 1 ) {
				$kids.not(':first').remove();
			}
		});

		$nu.find(':input').each(function() {
			var $this = $(this);
			if ( this.type == 'text' ) {
				$this.removeAttr('style')
					.val('');
			}
			else if ( this.type == 'checkbox' || this.type == 'radio' ) {
				if ( $this.attr('checked') === 'checked' )
					this.checked = true;
				else
					this.checked = false;
			}

			if ( $this.is('.kcsb-ids') )
				$this.kcsbUnique();

			this.name = this.name.replace(regex, function(str, p1) {
				return mode + '][' + ( parseInt(p1,10) + 1 );
			});

		});

		$item.after( $nu )
			.parent().kcsbActions();

		$('.idep:input').kcsbIDep();

		return false;
	});


	// Move up/down
	$('.row a.move').live('click', function(e) {
		var $this 		= $(this),
				isUp			= $this.is('.up'),
				$item			= $this.closest('.row'),
				mode			= $this.attr('rel');

		if ( isUp ) {
			var $bro	= $item.prev(),
					$nu 	= $bro.before( $item.detach() );
		}
		else {
			var $bro	= $item.next(),
					$nu		= $bro.after( $item.detach() );
		}

		$nu.parent().kcsbReorder( mode ).kcsbActions();
		return false;
	});


	$('a.kcsb-cancel').live('click', function() {
		$('#kcsb').fadeOut(function() {
			$('body').kcsbGoto();
		});
		return false;
	});


	$('a.clone-open').live('click', function() {
		$(this).parent().children().hide().filter('div.kcsb-clone').fadeIn();
		return false;
	});


	$('a.clone-do').click(function() {
		var $this		= $(this),
				$input	= $(this).siblings('input');

		if ( $input.kcsbCheck() === false )
			return false;

		$this.attr( 'href', $this.attr('href')+'&new='+$input.val() );
	});


	$('input.clone-id').bind('keypress', function(e) {
		var key = e.keyCode || e.which;
		if ( key === 13 ) {
			var $this = $(this);
			e.preventDefault();
			$this.blur()
				.siblings('a.clone-do').data('new', $this.val()).trigger('click');
		}
	});


	$('.kcsb-tools a.close').live('click', function() {
		var $this = $(this),
				$parent = $this.parent();
		$this.siblings('input').val('');
		$parent.fadeOut(function() {
			$(this).siblings().show();
		});

		return false;
	});


	$kcsbForm.submit(function(e) {
		var isOK = true;

		$(this).find('input.required').not(':disabled').each(function() {
			if ( $(this).kcsbCheck() === false ) {
				isOK = false;
				return false;
			}
		});

		if ( !isOK )
			return false;
	});

});