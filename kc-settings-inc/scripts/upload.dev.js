var win = window.dialogArguments || opener || parent || top;

jQuery(document).ready(function($) {
  var $form1  = $('#library-form, #gallery-form'),
	    $form2  = $('#file-form')
	    $mItems = $('#media-items');

  // If we're in the Gallery or Library tab
	if ( $form1.length ) {
		var texts      = win.kcSettings.upload.text,
		    current    = win.kcSettings.upload.target.data('currentFiles'),
		    $btWrapper = $('<div class="kcs-wrap"><h4>'+texts.head+'</h4></div>'),
		    $checks    = $();

		if ( !$mItems.children().length ) {
			// No attachment files yet?
			$btWrapper.append( '<p>'+texts.empty+'</p>' );
		}
		else {
			var $btCheckAll = $('<a class="button">'+texts.checkAll+'</a>'),
			    $btClear    = $('<a class="button">'+texts.clear+'</a>'),
			    $btInvert   = $('<a class="button">'+texts.invert+'</a>'),
			    $btAdd      = $('<a class="button">'+texts.addFiles+'</a>');

			// Add checkboxes on each attachment row
			$('.new', $mItems).each(function(e) {
				var $el     = $(this).parent(),
				    pID     = $el.attr('id').split("-")[2],
				    checked = ( $.inArray(pID, current) > -1 ) ? ' checked="checked"' : '',
				    $check  = $('<input type="checkbox" value="'+pID+'" '+checked+'class="kcs-files" style="margin-right:.5em"/>');

				// Add new checkbox to the collection
				$checks = $checks.add( $check );

				$el.children('.new')
					.prepend($check)
					.wrapInner('<label />');
			});

			// Assign 'check all' button click event
			$btCheckAll.click(function(e) {
				e.preventDefault();
				$checks.prop('checked', true);
			});

			// Assign clear button click event
			$btClear.click(function(e) {
				e.preventDefault();
				$checks.prop('checked', false);
			});

			// Assign invert button click event
			$btInvert.click(function(e) {
				e.preventDefault();
				$checks.each(function() {
					$(this).prop('checked', !this.checked);
				});
			});

			// Assign add button click event
			$btAdd.click(function(e) {
				e.preventDefault();

				var $items = $checks.filter(':checked'),
				    count  = $items.length;

				if ( !count )
					return false;

				var files = {};
				$items.each(function() {
					var pID = this.value,
					    key = key = 'file_'+pID,
					    $el = $(this);

					files['file_'+pID] = {
						id : pID,
						title: $el.siblings('.title').text(),
						img: $el.closest('.media-item').find('.pinkynail').attr('src')
					}
				});

				win.kcFileMultiple( files );
				win.tb_remove();
			});

			$btWrapper.append( $btCheckAll, $btClear, $btInvert, $btAdd );
		}

		// Finally, add the buttons
		$form1.append( $btWrapper );
  }

	else if ( $form2.length ) {
		$form2.after('<div class="kcs-file-info"><h3>'+win.kcSettings.upload.text.head+'</h3><p>'+win.kcSettings.upload.text.info+'</p><div>');
	}

});