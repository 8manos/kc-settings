jQuery(document).ready(function($) {
	var $doc    = $(this),
	    $body   = $('body');

	var args = {
		sortable : {
			axis: 'y',
			start: function(ev, ui) {
				ui.placeholder.height( ui.item.height() );
			},
			stop: function(ev, ui) {
				ui.item.parent().kcReorder( ui.item.data('mode'), true );
			}
		},
		datepicker : {
			date : {
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				showButtonPanel: true
			},
			text: {
				isRTL: win.isRTL,
				timeText: win.kcSettings.texts.time,
				hourText: win.kcSettings.texts.hour,
				minuteText: win.kcSettings.texts.minute,
				currentText: win.kcSettings.texts.today,
				closeText: win.kcSettings.texts.done,
				nextText: win.kcSettings.texts.next,
				prevText: win.kcSettings.texts.prev,
				dayNames: win.kcSettings.texts.dayNames.full,
				dayNamesMin: win.kcSettings.texts.dayNames.min,
				dayNamesShort: win.kcSettings.texts.dayNames.shrt,
				monthNames: win.kcSettings.texts.monthNames.full,
				monthNamesShort: win.kcSettings.texts.monthNames.shrt,
				weekHeader: win.kcSettings.texts.weekNames.shrt,
				timeOnlyTitle: win.kcSettings.texts.chooseTime
			}
		}
	};

	/* Theme/plugin settings page with metaboxes */
	$('#kc-settings-form').kcMetaboxDeps();

	$('#kc-menu_navmeta').prependTo( $('#post-body') )
		.show();

	// Form row cloner
	$.kcRowCloner();
	$.kcRowCloner.addCallback( 'add', function( obj ) {
		obj.block.sortable( 'refresh' );
		$('.hasDatepicker', obj.nuItem).each(function() {
			$(this)
				.removeData('datepicker')
				.removeClass('hasDatepicker')
				.datepicker( args.datepicker[$(this).attr('type')] );
		})
		$('.hasColorpicker', obj.nuItem).each(function() {
			var $el = $(this),
			    $cpWrap = $el.closest('div.wp-picker-container');

			$el.insertBefore( $cpWrap );
			$cpWrap.remove();
			$el.wpColorPicker();
		});

		var $media_selector = $('.kc-media-list', obj.nuItem);
		if ( $media_selector.length > 0 ) {

			//get highest id of the current multiinput
			var highest_id = 0;
			$( '.kc-media-list', obj.block ).each(function() {
				var split_id = $(this).attr('id').split('-');
				var id = parseInt(split_id[1]);
				if ( id > highest_id ) {
					highest_id = id;
				}
			});

			//could be more than one media
			$media_selector.each(function() {
				var $el = $(this);

				var media_id = $el.attr('id');//this is the same id of the original
				var split_media_id = media_id.split('-');
				split_media_id[1] = highest_id + 1;
				var new_media_id = split_media_id.join('-');

				//assign new id to the selector and the button
				$el.attr('id', new_media_id);
				$el.parent().find('.kc-media-select').attr('data-fieldid', new_media_id);

				//add to the mediafields object
				kcSettings.mediaFields[new_media_id] = kcSettings.mediaFields[media_id];
			});
		}
	});

	// Sort
	$('ul.kc-rows').sortable( args.sortable );
	// Tabs
	$('.kcs-tabs').kcTabs();
	// Enh.
	$('select.chosen').kcChosen();

	// Polyfills
	$('input.kcs-color').kcPFiColor();
	$('input.kcs-date').kcPFiDate( args.datepicker.date );

	// Add term form
	var $addTagForm = $('#addtag');
	if ( $addTagForm.length ) {
		var $kcsFields = $();
		$('div.kcs-field').each(function() {
			$kcsFields = $kcsFields.add( $(this).clone() );
		});

		if ( $kcsFields.length ) {
			$addTagForm.ajaxComplete( function( e, xhr, settings ) {
				if ( settings.data.indexOf('action=add-tag') < 0 )
					return;

				$('div.kcs-field').each(function(idx) {
					$(this).replaceWith( $kcsFields.eq(idx).clone() );
				});


				$('input.kcs-color', $addTagForm).kcPFiColor();
				$('input.kcs-date', $addTagForm).kcPFiDate( args.datepicker.date );

				$('.kcs-tabs', $addTagForm).kcTabs();
				$('select.chosen', $addTagForm).kcChosen();

				$addTagForm.trigger('kcsRefreshed');
			});
		}
	}

	var $kcMetaBoxes = $('#kc-settings-form div.metabox-holder');
	if ( $kcMetaBoxes.length ) {
		postboxes.add_postbox_toggles(pagenow);
		var kcMetaBoxesMark = function() {
			var visible = $('div.postbox:visible').length, side = $('#post-body #side-sortables');

			$kcMetaBoxes.find('.meta-box-sortables:visible').each(function(n, el){
				var t = $(this);

				if ( visible == 1 || t.children('.postbox:visible').length )
					t.removeClass('empty-container');
				else
					t.addClass('empty-container');
			});
		};

		kcMetaBoxesMark();
		$kcMetaBoxes.find('.meta-box-sortables').sortable( 'option', 'receive', function( event, ui ) {
			if ( 'dashboard_browser_nag' == ui.item[0].id )
				$(ui.sender).sortable('cancel');

			kcMetaBoxesMark();
		});
	}
});
